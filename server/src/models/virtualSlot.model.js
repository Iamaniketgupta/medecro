// models/Slot.js
import mongoose from 'mongoose';

const virtualSlotSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Doctor' // Reference to the Doctor model
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

const VirtualSlot = mongoose.model('VirtualSlot', virtualSlotSchema);
export default VirtualSlot;
