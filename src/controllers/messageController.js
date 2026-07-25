import Message from '../models/Message.js';

const sendMessage = async (req, res) => {
  try {
    const { recipientId, subject, content, bookingId } = req.body;
    
    const message = new Message({
      sender: req.user.id,
      recipient: recipientId,
      subject,
      content,
      booking: bookingId
    });
    
    await message.save();
    
    res.status(201).json({
      message: 'Message sent',
      data: message
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id },
        { recipient: req.user.id }
      ]
    })
      .populate('sender', 'firstName lastName')
      .populate('recipient', 'firstName lastName')
      .sort({ createdAt: -1 });
    
    res.json({ messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getConversation = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, recipient: userId },
        { sender: userId, recipient: req.user.id }
      ]
    })
      .populate('sender', 'firstName lastName')
      .populate('recipient', 'firstName lastName')
      .sort({ createdAt: 1 });
    
    res.json({ messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.messageId,
      { isRead: true, readAt: new Date() },
      { new: true }
    );
    
    res.json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { sendMessage, getMessages, getConversation, markAsRead };
