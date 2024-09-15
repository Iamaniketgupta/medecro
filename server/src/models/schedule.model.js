import mongoose, { Schema } from 'mongoose';

// Schedule Schema
const scheduleSchema = new Schema(
  {
    day: { type: String, required: true }, // e.g., "Monday"
    openTime: { type: String, required: true }, // e.g., "09:00 AM"
    closeTime: { type: String, required: true }, // e.g., "05:00 PM"
  },
  {
    timestamps: true,
  }
);

// Exporting Schedule Model
export const Schedule = mongoose.model('Schedule', scheduleSchema);
