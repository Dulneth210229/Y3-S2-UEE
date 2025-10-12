const Conversation = require('../models/Conversation');

exports.create = async (req, res, next) => {
  try {
    const { userId } = req.body;
    if (userId === req.user._id.toString()) return next(Object.assign(new Error('Invalid'), { status: 400 }));
    let conv = await Conversation.findOne({ participants: { $all: [req.user._id, userId] } });
    if (!conv) conv = await Conversation.create({ participants: [req.user._id, userId] });
    res.json({ success: true, data: conv });
  } catch (e) { next(e); }
};

exports.list = async (req, res, next) => {
  const list = await Conversation.find({ participants: req.user._id }).sort({ updatedAt: -1 });
  res.json({ success: true, data: list });
};
