import mongoose from 'mongoose';

const portfolioItemSchema = new mongoose.Schema(
  {
    contractor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: String,
    description: String,
    imageUrl: String,
    videoUrl: String,
    category: {
      type: String,
      enum: ['wedding', 'travel', 'adventure', 'event', 'other'],
      default: 'other'
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model('PortfolioItem', portfolioItemSchema);
