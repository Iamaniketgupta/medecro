import mongoose, { Schema } from "mongoose";

// Create the Prescription schema
const prescriptionSchema = new Schema({
    clinicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clinic',
        required: true
    },

    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    medication: {
        name: {
            type: String,
            required: true
        },
        dosage: {
            type: String,
            required: false
        },
        frequency: {
            type: String,
            required: true
        },
        duration: {
            type: String,
            required: false
        }
    },
    specialInstructions: {
        type: String,
        required: false
    },
    report: {
        type: [String], 
        required: false
    },
   
});

export const Prescription = mongoose.model("Prescription", prescriptionSchema);
