import mongoose, { Schema } from 'mongoose';

// Clinic Schema
const clinicSchema = new Schema(
  {
    name: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
    },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    schedules: [
      {
        type:Schema.Types.ObjectId,
        ref:'Schedule',
        default:[]
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
        default:[]
      },
    ],
    images:[
        {type:String}
    ]
  },
  {
    timestamps: true,
  }
);

// Exporting Clinic Model
export const Clinic = mongoose.model('Clinic', clinicSchema);
