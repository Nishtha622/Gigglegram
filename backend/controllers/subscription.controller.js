import Subscription from '../models/subscription.model.js';
import User from '../models/user.model.js';
import mongoose from 'mongoose';

export const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find().sort({ createdAt: -1 });
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subscriptions' });
  }
};

export const subscribeToPlan = async (req, res) => {
  const { userId, subscriptionId } = req.body;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const subscription = await Subscription.findById(subscriptionId).session(session);
    if (!subscription) {
      throw new Error('Subscription plan not found');
    }

    const user = await User.findById(userId).session(session);
    if (!user) {
      throw new Error('User not found');
    }

    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + subscription.duration);

    user.subscriptions.push({ subscriptionId, expiryDate });
    await user.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: 'Subscribed successfully', subscription });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: error.message || 'Failed to subscribe' });
  }
};

export const getUserSubscriptions = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('subscriptions.subscriptionId');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.subscriptions || user.subscriptions.length === 0) {
      return res.status(200).json({ message: 'No subscriptions found' });
    }

    res.status(200).json(user.subscriptions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user subscriptions' });
  }
};
