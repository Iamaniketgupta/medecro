import Appointment from "../models/appointment.model.js";
import Slot from "../models/slot.model.js";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { Doctor } from "../models/doctor.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
// Add a new appointment
export const addAppointment = async (req, res) => {
  try {
    const { clinicId, userId, doctorId, slotId, payment } = req.body;

    // Validate request body
    if (!clinicId || !userId || !doctorId || !slotId || !payment) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findById(userId);
    if(!user){
        throw new ApiError(400, "User not found");
    }

    const doctor = await Doctor.findById(doctorId);
    if(!doctor){
        throw new ApiError(400, "Doctor not found");
    }

    // Check if the slot exists and is available
    const slot = await Slot.findById(slotId);
    if (!slot) {
      return res.status(404).json({ message: "Slot not found." });
    }

    const newAppointment = new Appointment({
      clinicId,
      userId,
      doctorId,
      slotId,
      payment,
      paymentStatus: "Completed",
    });

    // Save the appointment in a transaction
    await newAppointment.save();

    if (newAppointment) {
      const otp = generateOTP(4);
      const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: `Hello! ${user?.fullName}, It's a verification email`,
        html: `
            <h1>Appointment Verification</h1>
            <p>Dear ${user?.fullName},</p>
            <p>Thank you for booking your appointment with us! To ensure a smooth process and secure your payment, please use the One-Time Password (OTP) provided below:</p>
            <h2 style="font-weight: bold;">Your OTP code is: <strong>${otp}</strong></h2>
            <p>Present this OTP to your doctor during your appointment. This code is essential for confirming your identity and facilitating the payment process.</p>
            
            <h3>Appointment Details:</h3>
            <ul>
                <li><strong>Date:</strong> ${slot.date}</li>
                <li><strong>Time:</strong> ${slot.timeSlot}</li>
            </ul>
    
            <p>Please note the following important information:</p>
            <ul>
                <li>If you provide this OTP to the doctor, the payment will be processed successfully.</li>
                <li>In the event of a cancellation of your appointment for any reason, your payment will be refunded after a specific period.</li>
                <li>Please ensure to use this OTP before your appointment to avoid any delays.</li>
            </ul>
            
            <p>We appreciate your cooperation and look forward to serving you!</p>
            <p>Best regards,<br/>Dr. ${doctor?.name}</p>
        `,
    };
    
    const mailOptionsForDoctor = {
        from: process.env.EMAIL,
        to: doctor.email, // Replace with the doctor's email variable
        subject: `New Appointment Notification: ${user?.fullName} has booked an appointment`,
        html: `
            <h1>Appointment Notification</h1>
            <p>Dear Dr. ${doctor?.name},</p>
            <p>We are pleased to inform you that a patient has booked an appointment with you.</p>
            <h2>Appointment Details:</h2>
            <ul>
                <li><strong>Patient Name:</strong> ${user?.fullName}</li>
                <li><strong>Date:</strong> ${slot.date}</li>
                <li><strong>Time Slot:</strong> ${slot.timeSlot}</li>
            </ul>
            <p>Please make sure to prepare for the appointment and provide the best care for your patient.</p>
            <p>Thank you for your dedication!</p>
            <p>Best regards,<br/>Dr. ${doctor?.name}</p>
        `,
    };
    
    
    
      try {
        await transporter.sendMail(mailOptions);
        
        await transporter.sendMail(mailOptionsForDoctor);

        
      } catch (error) {
        throw new ApiError(500, `Error while sending OTP: ${error.message}`);
      }
    }

    res
      .status(201)
      .json({
        message: "Appointment added successfully!",
        appointment: newAppointment,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add appointment", error: error.message });
  }
};

// Get appointments by user ID
export const getAppointmentsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format." });
    }

    const appointments = await Appointment.find({ userId })
      .populate("clinicId")
      .populate("doctorId")
      .populate("slotId");

    if (appointments.length === 0) {
      return res
        .status(404)
        .json({ message: "No appointments found for this user." });
    }

    res.status(200).json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch appointments", error: error.message });
  }
};

// Get appointments by doctor ID
export const getAppointmentsByDoctorId = async (req, res) => {
  try {
    const { doctorId } = req.params;

    // Validate doctorId
    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
      return res.status(400).json({ message: "Invalid doctor ID format." });
    }

    const appointments = await Appointment.find({ doctorId })
      .populate("clinicId")
      .populate("userId")
      .populate("slotId");

    if (appointments.length === 0) {
      return res
        .status(404)
        .json({ message: "No appointments found for this doctor." });
    }

    res.status(200).json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch appointments", error: error.message });
  }
};

// Get appointments by clinic ID
export const getAppointmentsByClinicId = async (req, res) => {
  try {
    const { clinicId } = req.params;

    // Validate clinicId
    if (!mongoose.Types.ObjectId.isValid(clinicId)) {
      return res.status(400).json({ message: "Invalid clinic ID format." });
    }

    const appointments = await Appointment.find({ clinicId })
      .populate("doctorId")
      .populate("userId")
      .populate("slotId"); // Optimization

    if (appointments.length === 0) {
      return res
        .status(404)
        .json({ message: "No appointments found for this clinic." });
    }

    res.status(200).json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch appointments", error: error.message });
  }
};

// Get appointment by ID
export const getAppointmentById = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    // Validate appointmentId
    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res
        .status(400)
        .json({ message: "Invalid appointment ID format." });
    }

    const appointment = await Appointment.findById(appointmentId)
      .populate("clinicId", "name address")
      .populate("doctorId", "name specialization")
      .populate("userId", "name email")
      .populate("slotId", "timeSlot date");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    res.status(200).json(appointment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch appointment", error: error.message });
  }
};

// Update appointment status (e.g., isAttended or paymentStatus)
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    // Validate appointmentId
    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res
        .status(400)
        .json({ message: "Invalid appointment ID format." });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      req.body,
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    res
      .status(200)
      .json({
        message: "Appointment updated successfully!",
        appointment: updatedAppointment,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update appointment", error: error.message });
  }
};

// Delete an appointment
export const deleteAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    // Validate appointmentId
    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res
        .status(400)
        .json({ message: "Invalid appointment ID format." });
    }

    const deletedAppointment = await Appointment.findByIdAndDelete(
      appointmentId
    );

    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    res.status(200).json({ message: "Appointment deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete appointment", error: error.message });
  }
};


export const getUpcomingAppointments = async(req,res)=>{

  try{
    const {userId} = req.params;
    
    const user = await User.findById(userId);
    if(!user){
      return res.status(400).json({message: "User not found"});
    }
    
    const appointments = await Appointment.find({userId, isAttended: false})
    .populate("doctorId")
    .populate("slotId")
    .populate("clinicId")
    .populate("userId");


    res.status(200).json(appointments);
  }catch(error){
    res.status(500).json({message: "Failed to fetch upcoming appointments", error: error.message});
  }
}

export const getUpcomingAppointmentsByDoctorId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if the userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Fetch the user by userId
    const user = await Doctor.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the current date and time
    const now = new Date();

    // Find upcoming appointments where the slot date is in the future
    const appointments = await Appointment.find({ doctorId:userId, isAttended: false })
      .populate({
        path: "slotId", // Populate slotId to filter by date
        match: { date: { $gte: now } }, // Filter slots that have a future date
        select: "date timeSlot", // Only select relevant fields for slots
      })
      .populate("doctorId") // Populate doctor details (only select relevant fields)
      .populate("clinicId") // Populate clinic details (only select relevant fields)
      .populate("userId"); // Populate user details (only select relevant fields)
    
    // Filter out appointments that have null slotId (because match can exclude documents)
    const filteredAppointments = appointments.filter(app => app.slotId !== null);

    // Send the filtered appointments data
    res.status(200).json(filteredAppointments);

  } catch (error) {
    // Log the error and send a response
    res.status(500).json({ message: "Failed to fetch upcoming appointments", error: error.message });
  }
};

export const getRecentlyPassedAppointmentsByDoctorId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if the userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid doctor ID" });
    }

    // Fetch the doctor by userId
    const doctor = await Doctor.findById(userId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Get the current date and time
    const now = new Date();

    // Subtract 1 hour from the current time
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    // Find appointments where the slot's date is today and the timeslot passed within the last hour
    const appointments = await Appointment.find({
      doctorId: userId,
      isAttended: false, // The appointment is not attended yet
    })
      .populate({
        path: "slotId",
        match: {
          date: { $lte: now }, // Find appointments for today or earlier
        },
        select: "date timeSlot",
      })
      .populate("doctorId")
      .populate("clinicId")
      .populate("userId");

    // Helper function to parse the timeSlot string and combine it with the date
    const parseTimeSlot = (date, timeSlot) => {
      const [time, modifier] = timeSlot.split(" "); // Split "9:46 PM" into ["9:46", "PM"]
      let [hours, minutes] = time.split(":").map(Number); // Split "9:46" into hours and minutes

      // Adjust hours based on AM/PM
      if (modifier === "PM" && hours !== 12) {
        hours += 12; // Convert PM hours to 24-hour format
      } else if (modifier === "AM" && hours === 12) {
        hours = 0; // Handle midnight (12 AM)
      }

      // Create a new Date object for the appointment time
      const appointmentTime = new Date(date);
      appointmentTime.setHours(hours, minutes, 0, 0); // Set the parsed hours and minutes

      return appointmentTime;
    };

    // Filter appointments where the timeSlot has passed within the last hour
    const filteredAppointments = appointments.filter((appointment) => {
      if (!appointment.slotId) return false; // Ignore if slotId is null

      // Combine the date and timeSlot fields into a single datetime object
      const appointmentTime = parseTimeSlot(appointment.slotId.date, appointment.slotId.timeSlot);

      // Check if the appointment time is between one hour ago and now
      return appointmentTime > oneHourAgo && appointmentTime <= now;
    });

    // Send the filtered appointments data
    res.status(200).json(filteredAppointments);
  } catch (error) {
    // Log the error and send a response
    res.status(500).json({ message: "Failed to fetch recently passed appointments", error: error.message });
  }
};
