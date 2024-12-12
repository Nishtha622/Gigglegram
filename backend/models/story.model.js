// import mongoose from 'mongoose';

// const storySchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   imageUrl: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//     expires: '24h', // Automatically delete stories after 24 hours
//   },
// });

// const Story = mongoose.model('Story', storySchema);

// export default Story;



import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mediaUrl: {
    type: String,
    required: true,
  },
  mediaType: {
    type: String,
    enum: ["image", "video"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "24h", // Automatically delete stories after 24 hours
  },
});

const Story = mongoose.model("Story", storySchema);

export default Story;
