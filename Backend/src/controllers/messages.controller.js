const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

exports.list = async (req, res, next) => {
  const conv = await Conversation.findById(req.params.conversationId);
  if (!conv || !conv.participants.map(p => p.toString()).includes(req.user._id.toString())) {
    return next(Object.assign(new Error('Not found'), { status: 404 }));
  }
  const list = await Message.find({ conversation: conv._id }).sort({ createdAt: 1 });
  res.json({ success: true, data: list });
};

exports.create = async (req, res, next) => {
  const conv = await Conversation.findById(req.params.conversationId);
  if (!conv || !conv.participants.map(p => p.toString()).includes(req.user._id.toString())) {
    return next(Object.assign(new Error('Not found'), { status: 404 }));
  }
  const msg = await Message.create({ conversation: conv._id, sender: req.user._id, body: req.body.body, status: 'sent' });
  conv.lastMessage = req.body.body;
  await conv.save();
  res.json({ success: true, data: msg });
};
