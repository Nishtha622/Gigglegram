import Subscription from '../models/subscription.model.js';

const seedSubscriptions = async () => {
  try {
    const subscriptions = [
      {
        name: 'Basic',
        price: '₹399/month',
        features: ['Ad-free experience', 'Access to basic features'],
      },
      {
        name: 'Premium',
        price: '₹699/month',
        features: ['Priority support', 'Premium content'],
      },
      {
        name: 'VIP',
        price: '₹1499/month',
        features: ['Exclusive offers', 'VIP badge', 'Priority content'],
      },
    ];

    const existingSubscriptions = await Subscription.find();
    if (existingSubscriptions.length === 0) {
      await Subscription.insertMany(subscriptions);
      console.log('Subscription plans seeded successfully:', subscriptions);
    } else {
      console.log('Subscriptions already exist. Skipping seeding.');
    }
  } catch (error) {
    console.error('Error seeding subscription plans:', error.message);
  }
};

export default seedSubscriptions;
