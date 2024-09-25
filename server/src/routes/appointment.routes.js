import express from 'express';
import {
    addAppointment,
    getAppointmentsByUserId,
    getAppointmentsByDoctorId,
    getAppointmentsByClinicId,
    getAppointmentById,
    updateAppointmentStatus,
    deleteAppointment,
    getUpcomingAppointments
} from '../controllers/appointment.controller.js';

const router = express.Router();

// Route to add a new appointment
router.post('/', addAppointment);

// Route to get all appointments for a specific user by userId
router.get('/user/:userId', getAppointmentsByUserId);

// Route to get all appointments for a specific doctor by doctorId
router.get('/doctor/:doctorId', getAppointmentsByDoctorId);

// Route to get all appointments for a specific clinic by clinicId
router.get('/clinic/:clinicId', getAppointmentsByClinicId);

// Route to get an appointment by appointmentId
router.get('/:appointmentId', getAppointmentById);

// Route to update appointment status (like isAttended or paymentStatus)
router.put('/:appointmentId', updateAppointmentStatus);

// Route to delete an appointment
router.delete('/:appointmentId', deleteAppointment);
router.get('/getUpcomingAppointments/:userId' , getUpcomingAppointments)

export default router;
