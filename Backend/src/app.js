const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimiter = require('./middleware/rateLimit');
const errorHandler = require('./middleware/errorHandler');
const { httpLogger } = require('./middleware/logger');

const app = express();

// Stripe webhook needs raw body on /payments/webhook only
const rawBodySaver = (req, res, buf) => { req.rawBody = buf; };

app.use((req, res, next) => {
  if (req.originalUrl === '/payments/webhook') {
    express.raw({ type: 'application/json', verify: rawBodySaver })(req, res, next);
  } else {
    express.json({ limit: '2mb' })(req, res, next);
  }
});

const allowed = (process.env.CORS_ORIGINS || '').split(',').filter(Boolean);
app.use(cors({ origin: allowed.length ? allowed : '*', credentials: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(httpLogger);
app.use(rateLimiter);

// Routes
app.use('/auth', require('./routes/auth.routes'));
app.use('/users', require('./routes/users.routes'));
app.use('/jobs', require('./routes/jobs.routes'));
app.use('/applications', require('./routes/applications.routes'));
app.use('/conversations', require('./routes/conversations.routes'));
app.use('/messages', require('./routes/messages.routes'));
app.use('/payments', require('./routes/payments.routes'));
app.use('/admin', require('./routes/admin.routes'));
app.use('/uploads', require('./routes/uploads.routes'));
app.use('/sms', require('./routes/sms.routes'));
app.use('/suggestions', require('./routes/suggestions.routes'));

app.get('/', (req, res) => res.json({ success: true, message: 'Rural Jobs API' }));

app.use(errorHandler);

module.exports = app;
