import Message from "../models/Message.js";

// Get chat between 2 users
export const getMessages = async (req, res) => {
  try {
    const { sender, receiver } = req.params;
    const messages = await Message.find({
      $or: [{ sender, receiver }, { sender: receiver, receiver: sender }],
    }).sort("createdAt");
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

// Send text message
export const sendMessage = async (req, res) => {
  try {
    const msg = new Message(req.body);
    await msg.save();
    res.json(msg);
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" });
  }
};

// Send audio message
export const sendAudioMessage = async (req, res) => {
  try {
    const msg = new Message({
      sender: req.body.sender,
      receiver: req.body.receiver,
      audioUrl: `/uploads/${req.file.filename}`,
    });
    await msg.save();
    res.json(msg);
  } catch (error) {
    res.status(500).json({ error: "Failed to send audio message" });
  }


  
};
