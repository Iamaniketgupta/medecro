import mongoose, { Schema } from 'mongoose';

// Clinic Schema
const clinicSchema = new Schema(
  {
    name: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },
      country: { type: String, required: true },
    },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    schedules: [
      {
        day: { type: String, required: true }, // e.g., "Monday"
        openTime: { type: String, required: true }, // e.g., "09:00 AM"
        closeTime: { type: String, required: true }, // e.g., "05:00 PM"
      },
    ],
    licenseNumber: { type: String, required: true, unique: true },
    mobileNo: { type: String, required: true },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    ratings: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, min: 1, max: 5 }, // Rating between 1 and 5
        comment: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Exporting Clinic Model
export const Clinic = mongoose.model('Clinic', clinicSchema);
