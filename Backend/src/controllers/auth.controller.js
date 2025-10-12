const User = require('../models/User');
const { issueTokens } = require('../utils/jwt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
  try {
    const existing = await User.findOne({ email: req.body.email });
    if (existing) return next(Object.assign(new Error('Email already used'), { status: 400 }));
    const user = new User({ email: req.body.email, role: req.body.role });
    await user.setPassword(req.body.password);
    await user.save();
    const { accessToken, refreshToken } = issueTokens(user);
    user.refreshTokens.push({ token: refreshToken });
    await user.save();
    res.json({ success: true, data: { user, tokens: { accessToken, refreshToken } } });
  } catch (e) { next(e); }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await user.validatePassword(req.body.password))) {
      return next(Object.assign(new Error('Invalid credentials'), { status: 401 }));
    }
    const { accessToken, refreshToken } = issueTokens(user);
    user.refreshTokens.push({ token: refreshToken });
    await user.save();
    res.json({ success: true, data: { user, tokens: { accessToken, refreshToken } } });
  } catch (e) { next(e); }
};

exports.refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(payload.sub);
    if (!user) return next(Object.assign(new Error('Invalid token'), { status: 401 }));
    const exists = user.refreshTokens.find(rt => rt.token === refreshToken);
    if (!exists) return next(Object.assign(new Error('Token revoked'), { status: 401 }));
    const { accessToken, refreshToken: newRT } = issueTokens(user);
    user.refreshTokens = user.refreshTokens.filter(rt => rt.token !== refreshToken).concat({ token: newRT });
    await user.save();
    res.json({ success: true, data: { tokens: { accessToken, refreshToken: newRT } } });
  } catch (e) { e.status = 401; next(e); }
};

exports.logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken && req.user) {
      await User.findByIdAndUpdate(req.user._id, { $pull: { refreshTokens: { token: refreshToken } } });
    }
    res.json({ success: true });
  } catch (e) { next(e); }
};
