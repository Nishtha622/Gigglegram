import mongoose, { Schema, model } from 'mongoose';

const messageSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true, maxlength: 500, trim: true }, 
    timestamp: { type: Date, default: Date.now },
    read: { type: Boolean, default: false }, 
    deleted: { type: Boolean, default: false }, 
  },
  {
    timestamps: true, 
    versionKey: false, // Remove the __v field
  }
);

messageSchema.index({ sender: 1, receiver: 1, timestamp: -1 });

const Message = model('Message', messageSchema);

export default Message;