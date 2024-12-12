import mongoose from 'mongoose';

const validateMessage = (req, res, next) => {
  const { sender, receiver, content } = req.body;

  if (!sender?.trim() || !receiver?.trim() || !content?.trim()) {
    return res.status(400).json({ error: 'Sender, receiver, and content are required' });
  }

  if (!mongoose.Types.ObjectId.isValid(sender) || !mongoose.Types.ObjectId.isValid(receiver)) {
    return res.status(400).json({ error: 'Invalid sender or receiver ID' });
  }

  if (content.length > 500) {
    return res.status(400).json({ error: 'Message content exceeds the maximum length of 500 characters' });
  }

  next();
};

export default validateMessage;
