import mongoose from "mongoose";

const VIPAccessRequestSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const VIPAccessRequest = mongoose.model("VIPAccessRequest", VIPAccessRequestSchema);

export default VIPAccessRequest;