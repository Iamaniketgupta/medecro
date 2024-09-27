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


export const getUpcomingAppointmentsByDoctorId = async (req, res) => {
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

    // Find upcoming appointments where the slot date is in the future
    const appointments = await VirtualAppointment.find({ doctorId: userId, isAttended: false })
      .populate({
        path: "slotId", // Populate slotId to filter by date
        match: { date: { $gte: now } }, // Filter slots that have a future date
        select: "date timeSlot", // Only select relevant fields
      })
      .populate("doctorId")
      .populate("userId");
       // Populate doctor details
    
    // Filter out appointments that have null slotId (because match can exclude documents)
    const filteredAppointments = appointments.filter(app => app.slotId !== null);

    // Send the filtered appointments data
    res.status(200).json(filteredAppointments);

  } catch (error) {
    // Log the error and send a response
    res.status(500).json({ message: "Failed to fetch upcoming appointments", error: error.message });
  }
};
export const getRecentlyPassedAppointments = async (req, res) => {
  try {
    // Get the current date and time
    const now = new Date();

    // Subtract 1 hour from the current time to get the lower bound of the time window
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    // Find appointments where the slot's date is today and the timeslot passed within the last hour
    const appointments = await VirtualAppointment.find({
      isAttended: false, // The appointment is not attended yet
    })
      .populate({
        path: "slotId",
        match: {
          date: { $lte: now }, // Only consider slots on or before today
        },
        select: "date timeSlot",
      })
      .populate("doctorId")
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

    // Filter the appointments to check if the timeslot has passed but is within the last 60 minutes
    const filteredAppointments = appointments.filter((appointment) => {
      if (!appointment.slotId) return false; // Ignore if slotId is null due to filtering

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
