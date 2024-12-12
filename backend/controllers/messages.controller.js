import Message from '../models/messages.model.js';
import mongoose from 'mongoose';

// Controller function to get all messages
export const getMessages = async (req, res) => {
  const { sender, receiver, page = 1, limit = 10 } = req.query;

  try {
    const filter = {};

    // If both sender and receiver are provided, fetch messages between them.
    if (sender && receiver) {
      filter.$or = [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ];
    } else if (sender) {
      filter.sender = sender;
    } else if (receiver) {
      filter.receiver = receiver;
    }

    // Pagination & Sorting
    const messages = await Message.find(filter)
      .sort({ timestamp: -1 }) // Sort messages by timestamp descending
      .skip((page - 1) * limit) // Skip based on the current page
      .limit(Number(limit)) // Limit the number of messages

    // If no messages found, return an appropriate message.
    if (!messages || messages.length === 0) {
      return res.status(404).json({ error: 'No messages found' });
    }

    res.status(200).json({ success: true, messages, pagination: { page, limit, total: messages.length } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch messages', details: error.message });
  }
};

export const sendMessage = async (req, res) => {
  const { sender, receiver, content } = req.body;

  console.log('Received message data:', { sender, receiver, content }); // Log incoming request

  // Validate required fields
  if (!sender?.trim() || !receiver?.trim() || !content?.trim()) {
    return res.status(400).json({ error: 'Sender, receiver, and content are required' });
  }

  // Validate ObjectIds for sender and receiver
  if (!mongoose.Types.ObjectId.isValid(sender) || !mongoose.Types.ObjectId.isValid(receiver)) {
    return res.status(400).json({ error: 'Invalid sender or receiver ID' });
  }

  // Validate content length: limit to 500 characters
  if (content.length > 500) {
    return res.status(400).json({ error: 'Message content exceeds the maximum length of 500 characters' });
  }

  try {
    const newMessage = new Message({
      sender,
      receiver,
      content,
      timestamp: Date.now(), // Ensure a timestamp is set if not handled by schema
    });

    const savedMessage = await newMessage.save();
    res.status(201).json({ success: true, message: savedMessage });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message', details: error.message });
  }
};