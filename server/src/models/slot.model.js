// models/Slot.js
import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
    clinicId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Clinic' // Assuming you have a Clinic model
    },
    date: {
        type: Date,
        required: true
    },
    timeSlot: {
        type: String,
        required: true,
        enum: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'], // Example time slots
    },
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Slot = mongoose.model('Slot', slotSchema);
export default Slot;
