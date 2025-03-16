import mongoose, { Schema } from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    street: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    floor: {
      type: Number,
      required: true,
      min: 0,
    },
    preferences: {
      type: [String],
      default: [],
    },
    amenities: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
    photos: {
      type: [String],
      default: [],
    },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Посилання на колекцію користувачів
      required: true,
    },
  },
  { timestamps: true }
);

const Listing =
  mongoose.models.Listing || mongoose.model('Listing', listingSchema);

export default Listing;
