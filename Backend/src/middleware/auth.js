const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) throw Object.assign(new Error('Unauthorized'), { status: 401 });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub);
    if (!user || !user.active) throw Object.assign(new Error('Unauthorized'), { status: 401 });
    req.user = user;
    next();
  } catch (e) {
    e.status = e.status || 401;
    next(e);
  }
};

const requireRole = (...roles) => (req, res, next) => {
  if (!req.user) return next(Object.assign(new Error('Unauthorized'), { status: 401 }));
  if (!roles.includes(req.user.role)) {
    return next(Object.assign(new Error('Forbidden'), { status: 403 }));
  }
  next();
};

module.exports = { auth, requireRole };
