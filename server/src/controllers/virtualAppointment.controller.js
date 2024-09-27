import VirtualAppointment from "../models/virtualAppointment.js";
import VirtualSlot from "../models/virtualSlot.model.js";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { Doctor } from "../models/doctor.model.js";

// Function to generate OTP
function generateOTP(length) {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  return otp;
}

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Replace with your email
    pass: process.env.PASSWORD, // Replace with your email password
  },
  tls: {
    rejectUnauthorized: false, // Disable strict SSL verification
  },
});

// Add a new virtual appointment
export const addVirtualAppointment = async (req, res) => {
  try {
    const { userId, doctorId, slotId, payment  , roomId} = req.body;

    // Validate request body
    if (!userId || !doctorId || !slotId || !payment || !roomId) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(400, "User not found");
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      throw new ApiError(400, "Doctor not found");
    }

    // Check if the slot exists and is available
    const slot = await VirtualSlot.findById(slotId);
    if (!slot) {
      return res.status(404).json({ message: "Slot not found." });
    }

    const newVirtualAppointment = new VirtualAppointment({
      userId,
      doctorId,
      slotId,
      payment,
      paymentStatus: "Completed",
      roomId
    });

    // Save the appointment
    await newVirtualAppointment.save();

    if (newVirtualAppointment) {
      const otp = generateOTP(4);
      const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: `Hello! ${user.fullName}, It's a verification email`,
        html: `
          <h1>Virtual Appointment Verification</h1>
          <p>Dear ${user.fullName},</p>
          <p>Thank you for booking your virtual appointment with us! Please use the One-Time Password (OTP) provided below:</p>
          <h2 style="font-weight: bold;">Your OTP code is: <strong>${otp}</strong></h2>
          <p>Present this OTP during your virtual appointment to confirm your identity.</p>
          
          <h3>Appointment Details:</h3>
          <ul>
              <li><strong>Date:</strong> ${slot.date}</li>
              <li><strong>Time:</strong> ${slot.timeSlot}</li>
          </ul>
          
          <p>We appreciate your cooperation and look forward to serving you!</p>
          <p>Best regards,<br/>Dr. ${doctor.name}</p>
        `,
      };

      const mailOptionsForDoctor = {
        from: process.env.EMAIL,
        to: doctor.email,
        subject: `New Virtual Appointment Notification: ${user.fullName} has booked a virtual appointment`,
        html: `
          <h1>Virtual Appointment Notification</h1>
          <p>Dear Dr. ${doctor.name},</p>
          <p>A patient has booked a virtual appointment with you.</p>
          <h2>Appointment Details:</h2>
          <ul>
              <li><strong>Patient Name:</strong> ${user.fullName}</li>
              <li><strong>Date:</strong> ${slot.date}</li>
              <li><strong>Time Slot:</strong> ${slot.timeSlot}</li>
          </ul>
          <p>Please prepare for the appointment.</p>
          <p>Best regards,<br/>Dr. ${doctor.name}</p>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        await transporter.sendMail(mailOptionsForDoctor);
      } catch (error) {
        throw new ApiError(500, `Error while sending OTP: ${error.message}`);
      }
    }

    res.status(201).json({
      message: "Virtual appointment added successfully!",
      appointment: newVirtualAppointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to add virtual appointment", error: error.message });
  }
};

// Get virtual appointments by user ID
export const getVirtualAppointmentsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format." });
    }

    const appointments = await VirtualAppointment.find({ userId })
      .populate("doctorId")
      .populate("slotId");

    if (appointments.length === 0) {
      return res.status(404).json({ message: "No virtual appointments found for this user." });
    }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch virtual appointments", error: error.message });
  }
};

// Get virtual appointments by doctor ID
export const getVirtualAppointmentsByDoctorId = async (req, res) => {
  try {
    const { doctorId } = req.params;

    // Validate doctorId
    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
      return res.status(400).json({ message: "Invalid doctor ID format." });
    }

    const appointments = await VirtualAppointment.find({ doctorId })
      .populate("userId")
      .populate("slotId");

    if (appointments.length === 0) {
      return res.status(404).json({ message: "No virtual appointments found for this doctor." });
    }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch virtual appointments", error: error.message });
  }
};

// Get virtual appointment by ID
export const getVirtualAppointmentById = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    // Validate appointmentId
    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({ message: "Invalid appointment ID format." });
    }

    const appointment = await VirtualAppointment.findById(appointmentId)
      .populate("doctorId", "name specialization")
      .populate("userId", "name email")
      .populate("slotId", "timeSlot date");

    if (!appointment) {
      return res.status(404).json({ message: "Virtual appointment not found." });
    }

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch virtual appointment", error: error.message });
  }
};

// Update virtual appointment status (e.g., isAttended or paymentStatus)
export const updateVirtualAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    // Validate appointmentId
    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({ message: "Invalid appointment ID format." });
    }

    const updatedAppointment = await VirtualAppointment.findByIdAndUpdate(
      appointmentId,
      req.body,
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Virtual appointment not found." });
    }

    res.status(200).json({
      message: "Virtual appointment updated successfully!",
      appointment: updatedAppointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update virtual appointment", error: error.message });
  }
};

// Delete a virtual appointment
export const deleteVirtualAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    // Validate appointmentId
    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({ message: "Invalid appointment ID format." });
    }

    const deletedAppointment = await VirtualAppointment.findByIdAndDelete(appointmentId);

    if (!deletedAppointment) {
      return res.status(404).json({ message: "Virtual appointment not found." });
    }

    res.status(200).json({ message: "Virtual appointment deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete virtual appointment", error: error.message });
  }
};

export const getUpcomingAppointments = async(req,res)=>{

  try{
    const {userId} = req.params;
    
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({message: "User not found"});
    }
    
    const appointments = await VirtualAppointment.find({userId, isAttended: false})
    .populate("doctorId")
    .populate("slotId")

    res.status(200).json(appointments);
  }catch(error){
    res.status(500).json({message: "Failed to fetch upcoming appointments", error: error.message});
  }
}