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
        
    },
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Slot = mongoose.model('Slot', slotSchema);
export default Slot;
