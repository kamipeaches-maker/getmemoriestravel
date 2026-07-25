import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    subject: String,
    content: {
      type: String,
      required: true
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking'
    },
    jobPosting: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobPosting'
    },
    isRead: {
      type: Boolean,
      default: false
    },
    readAt: Date,
    attachments: [String]
  },
  { timestamps: true }
);

export default mongoose.model('Message', messageSchema);
