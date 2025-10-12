const { Server } = require('socket.io');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

function initChat(server) {
  const io = new Server(server, { cors: { origin: (process.env.CORS_ORIGINS || '*').split(',') } });

  io.on('connection', (socket) => {
    const { userId } = socket.handshake.query || {};
    if (userId) socket.join(`user:${userId}`);

    socket.on('joinConversation', (conversationId) => {
      socket.join(`conv:${conversationId}`);
    });

    socket.on('sendMessage', async ({ conversationId, senderId, body }) => {
      const msg = await Message.create({ conversation: conversationId, sender: senderId, body });
      await Conversation.findByIdAndUpdate(conversationId, { lastMessage: body });
      io.to(`conv:${conversationId}`).emit('message', {
        _id: msg._id, conversation: conversationId, sender: senderId, body, createdAt: msg.createdAt
      });
      io.emit('notify', { conversationId, body });
    });
  });
}

module.exports = { initChat };
