
import mongoose from "mongoose";
const clinicSchema = new mongoose.Schema({
    clinicName: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    zipCode: {
        type: String,
        required: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        trim: true,
    },
    emailAddress: {
        type: String,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    locationCoordinates: {
        type: [Number], // Array of two numbers: [latitude, longitude]
        validate: {
            validator: function(arr) {
                return arr.length === 2;
            },
            message: 'Location coordinates must contain both latitude and longitude',
        },
    },
    clinicImages: {
        type: [String], // Array of image URLs
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
    }
}, {
    timestamps: true,
});

export const Clinic = mongoose.model('Clinic', clinicSchema);

