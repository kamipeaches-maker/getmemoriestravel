import mongoose from 'mongoose';
import User from './User.js';

const customerSchema = new mongoose.Schema(
  {
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    companyName: String,
    numberOfTravelers: {
      type: Number,
      default: 1
    },
    travelPreferences: {
      interests: [String],
      budget: Number,
      preferredSeasons: [String]
    },
    submissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submission'
      }
    ],
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
      }
    ],
    travelPlans: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TravelPlan'
      }
    ],
    averageRating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    }
  },
  { timestamps: true }
);

export default User.discriminator('customer', customerSchema);
