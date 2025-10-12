const User = require('../models/User');
const { deriveBadges } = require('../services/badgeService');

exports.getMe = async (req, res, next) => {
  res.json({ success: true, data: req.user });
};

exports.updateMe = async (req, res, next) => {
  try {
    req.user.profile = { ...(req.user.profile || {}), ...req.body };
    req.user.badges = deriveBadges(req.user);
    await req.user.save();
    res.json({ success: true, data: req.user });
  } catch (e) { next(e); }
};

exports.updatePhoto = async (req, res, next) => {
  try {
    req.user.profile = { ...(req.user.profile || {}), photo: req.body.url };
    await req.user.save();
    res.json({ success: true, data: { photo: req.body.url } });
  } catch (e) { next(e); }
};
