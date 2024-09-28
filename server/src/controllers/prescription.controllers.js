
import { Prescription } from "../models/prescription.model.js";
import { User } from "../models/user.model.js";
import  {Clinic}  from '../models/clinic.model.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import Appointment from "../models/appointment.model.js";
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';

// create new prescription
export const createPrescription = asyncHandler(async (req, res) => {
    const { clinicId, patientId, medicationName, dosage, frequency, duration, specialInstructions } = req.body;

    const clinic = await Clinic.findById(clinicId);
    const patient = await User.findById(patientId);

    if (!clinic) {
        return res.status(404).json({ message: "Clinic not found" });
    }

    if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
    }

    let reportAttachment = '';
    if (req.file) {
        const uploadResult = await uploadToCloudinary(req.file.path);
        reportAttachment = uploadResult.secure_url;
    }

    const newPrescription = new Prescription({
        clinicId,
        patientId,
        medication: {
            name: medicationName,
            dosage,
            frequency,
            duration,
        },
        specialInstructions,
        report: reportAttachment ? [reportAttachment] : [], 
    });

    // Save the prescription
    await newPrescription.save();

    res.status(201).json({
        message: "Prescription created successfully",
        prescription: newPrescription,
    });
});


// Get all Prescriptions
export const getAllPrescriptions  = asyncHandler(async(req, res) => {
   
    const prescriptions = await Prescription.find({})
        .populate("clinicId")
        .populate("patientId");

    if (!prescriptions) {
        return res.status(404).json({ message: "Something went wrong. Prescriptions not found" });
    }

    res.status(200).json({
        message: "Prescription retrieved successfully",
        prescriptions,
    });
});


export const getAllPrescribedPatients  = asyncHandler(async(req, res) => {
   
    const allpatients = await User.find({})
    const patients = await Prescription.find({clinicId: req.params.clinicId})
        .populate("clinicId")
        .populate("patientId");

    if (!patients) {
        return res.status(404).json({ message: "Something went wrong" });
    }

    res.status(200).json({
        message: "patients retrieved successfully",
        patients,
    });
});


// Get a single prescription by ID
export const getPrescriptionById  = asyncHandler(async(req, res) => {
    const { id } = req.params;

    const prescription = await Prescription.findById(id)
        .populate("clinicId")
        .populate("patientId");

    if (!prescription) {
        return res.status(404).json({ message: "Prescription not found" });
    }

    res.status(200).json({
        message: "Prescription retrieved successfully",
        prescription,
    });
});

// Delete a single prescription by ID
export const deletePrescriptionById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const prescription = await Prescription.findByIdAndDelete(id);

    if (!prescription) {
        return res.status(404).json({ message: "Prescription not found" });
    }

    res.status(200).json({
        message: "Prescription deleted successfully",
    });
});

export const getAllPatientsAppointmentsByDoctorId = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const appointments = await Appointment.find({doctorId: _id}).populate('userId');
    if (!appointments) {
        return res.status(404).json({ message: "No appointments found" });
    }

    res.status(200).json({
        message: "Successfully fetched all patients appointments",
        appointments
    });
});