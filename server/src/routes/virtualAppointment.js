import express from "express";
import {
  addVirtualAppointment,
  getVirtualAppointmentsByUserId,
  getVirtualAppointmentsByDoctorId,
  getVirtualAppointmentById,
  updateVirtualAppointmentStatus,
  deleteVirtualAppointment,
} from "../controllers/virtualAppointment.controller.js";

const router = express.Router();

// Add a new virtual appointment
router.post("/", addVirtualAppointment);

// Get all virtual appointments for a specific user
router.get("/user/:userId", getVirtualAppointmentsByUserId);

// Get all virtual appointments for a specific doctor
router.get("/doctor/:doctorId", getVirtualAppointmentsByDoctorId);

// Get a virtual appointment by ID
router.get("/:appointmentId", getVirtualAppointmentById);

// Update virtual appointment status
router.put("/:appointmentId", updateVirtualAppointmentStatus);

// Delete a virtual appointment
router.delete("/:appointmentId", deleteVirtualAppointment);

export default router;
