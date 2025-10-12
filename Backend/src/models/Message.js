const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  body: { type: String, required: true },
  readAt: Date,
  status: { type: String, enum: ['pending', 'sent', 'failed'], default: 'sent' }
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);
