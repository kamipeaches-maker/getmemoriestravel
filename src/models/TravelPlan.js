import mongoose from 'mongoose';

const travelPlanSchema = new mongoose.Schema(
  {
    submission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Submission',
      required: true
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: String,
    itinerary: [
      {
        day: Number,
        date: Date,
        activities: [String],
        meals: {
          breakfast: String,
          lunch: String,
          dinner: String
        },
        accommodation: String,
        location: String,
        notes: String,
        mediaOpportunities: [String]
      }
    ],
    totalCost: {
      type: Number,
      required: true
    },
    includesPhotographer: Boolean,
    includesVideographer: Boolean,
    highlightedExperiences: [String],
    mediaDeliverables: {
      photoCount: Number,
      videoLength: String,
      editedGallery: Boolean,
      highlightReel: Boolean
    },
    status: {
      type: String,
      enum: ['draft', 'finalized', 'confirmed', 'completed'],
      default: 'draft'
    }
  },
  { timestamps: true }
);

export default mongoose.model('TravelPlan', travelPlanSchema);
