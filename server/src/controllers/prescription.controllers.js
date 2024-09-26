
import { Prescription } from "../models/prescription.model.js";
import { User } from "../models/user.model.js";
import  {Clinic}  from '../models/clinic.model.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import Appointment from "../models/appointment.model.js";

// create new prescription
export const createPrescription  = asyncHandler(async(req, res) => {
    const { clinicId, patientId,  medicationName,dosage, frequency, duration, specialInstructions, report } = req.body;

    const clinic = await Clinic.findById(clinicId);
    const patient = await User.findById(patientId);  

    if (!clinic) {
        return res.status(404).json({ message: "Doctor not found" });
    }

    if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
    }

    let reportAttachments = [];
    if (req.files && req.files.length > 0) {
        const imageUploadPromises = req.files.map(file => uploadToCloudinary(file.path));
        const uploadResults = await Promise.all(imageUploadPromises);
        reportAttachments = uploadResults.map(result => result.secure_url);
    }

    const newPrescription = new Prescription({
        clinicId,
        patientId,
        patientName,
        age,
        gender,
        medication:{
            name: medicationName,
            dosage,
            frequency,
            duration
        },
        specialInstructions,
        report: reportAttachments,
    });

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

    const appointments = await Appointment.find({doctorId: _id});

    if (!appointments) {
        return res.status(404).json({ message: "No appointments found" });
    }

    res.status(200).json({
        message: "Successfully fetched all patients appointments",
        appointments
    });
});