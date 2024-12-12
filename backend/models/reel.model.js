import mongoose from "mongoose";

const reelSchema = new mongoose.Schema({
  videoUrl: {
    type: String,
    required: [true, 'Video URL is required'],
    validate: {
      validator: function (v) {
        return /^https?:\/\/.+\..+$/.test(v); // Basic URL validation
      },
      message: 'Invalid video URL format',
    },
  },
  caption: {
    type: String,
    maxlength: 300, // Optional, max length for captions
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment', // Reference to the Comment model
    },
  ],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Reel = mongoose.model('Reel', reelSchema);

export default Reel;
