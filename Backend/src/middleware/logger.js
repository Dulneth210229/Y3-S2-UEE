const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  transports: [new winston.transports.Console({ format: winston.format.simple() })]
});

const httpLogger = (req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
};

module.exports = { logger, httpLogger };
