import mongoose from 'mongoose';

const virtualAppointmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },
    slotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VirtualSlot',
        required: true,
    },
    isAttended: {
        type: Boolean,
        default: false,
    },
    payment: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending',
    },
}, { timestamps: true });

const VirtualAppointment = mongoose.model('VirtualAppointment', virtualAppointmentSchema);

export default VirtualAppointment;
