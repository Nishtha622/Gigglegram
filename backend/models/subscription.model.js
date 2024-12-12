import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    price: { type: String, required: true, min: 1 },
    features: { type: [String], default: [] },
    duration: { type: Number, required: true, default: 1 }, // in months
    currency: { type: String, required: true, default: 'INR' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Static method to find active subscriptions
subscriptionSchema.statics.findActive = function () {
  return this.find({ isActive: true });
};

// Instance method to toggle active status
subscriptionSchema.methods.toggleStatus = function () {
  this.isActive = !this.isActive;
  return this.save();
};

// Avoid re-declaring the model during hot-reloading
const Subscription = mongoose.models.Subscription || mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
