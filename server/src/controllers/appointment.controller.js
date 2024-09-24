import Appointment from '../models/appointment.model.js';
import Slot from '../models/slot.model.js';
import mongoose from 'mongoose';

// Add a new appointment
export const addAppointment = async (req, res) => {
    
    try {
        const { clinicId, userId, doctorId, slotId, payment } = req.body;

        // Validate request body
        if (!clinicId || !userId || !doctorId || !slotId || !payment ) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Check if the slot exists and is available
        const slot = await Slot.findById(slotId);
        if (!slot) {
            return res.status(404).json({ message: 'Slot not found.' });
        }

        const newAppointment = new Appointment({
            clinicId,
            userId,
            doctorId,
            slotId,
            payment,
            paymentStatus:"Completed"
        });

        // Save the appointment in a transaction
        await newAppointment.save();
        

        res.status(201).json({ message: 'Appointment added successfully!', appointment: newAppointment });
    } catch (error) {
        
        res.status(500).json({ message: 'Failed to add appointment', error: error.message });
    }
};

// Get appointments by user ID
export const getAppointmentsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID format.' });
        }

        const appointments = await Appointment.find({ userId })
            .populate('clinicId')
            .populate('doctorId')
            .populate('slotId');

        if (appointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found for this user.' });
        }

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch appointments', error: error.message });
    }
};

// Get appointments by doctor ID
export const getAppointmentsByDoctorId = async (req, res) => {
    try {
        const { doctorId } = req.params;

        // Validate doctorId
        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({ message: 'Invalid doctor ID format.' });
        }

        const appointments = await Appointment.find({ doctorId })
            .populate('clinicId')
            .populate('userId')
            .populate('slotId');

        if (appointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found for this doctor.' });
        }

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch appointments', error: error.message });
    }
};

// Get appointments by clinic ID
export const getAppointmentsByClinicId = async (req, res) => {
    try {
        const { clinicId } = req.params;

        // Validate clinicId
        if (!mongoose.Types.ObjectId.isValid(clinicId)) {
            return res.status(400).json({ message: 'Invalid clinic ID format.' });
        }

        const appointments = await Appointment.find({ clinicId })
            .populate('doctorId')
            .populate('userId')
            .populate('slotId'); // Optimization

        if (appointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found for this clinic.' });
        }

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch appointments', error: error.message });
    }
};




// Get appointment by ID
export const getAppointmentById = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        // Validate appointmentId
        if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
            return res.status(400).json({ message: 'Invalid appointment ID format.' });
        }

        const appointment = await Appointment.findById(appointmentId)
            .populate('clinicId', 'name address')
            .populate('doctorId', 'name specialization')
            .populate('userId', 'name email')
            .populate('slotId', 'timeSlot date');

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }

        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch appointment', error: error.message });
    }
};

// Update appointment status (e.g., isAttended or paymentStatus)
export const updateAppointmentStatus = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        // Validate appointmentId
        if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
            return res.status(400).json({ message: 'Invalid appointment ID format.' });
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(appointmentId, req.body, { new: true });

        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }

        res.status(200).json({ message: 'Appointment updated successfully!', appointment: updatedAppointment });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update appointment', error: error.message });
    }
};

// Delete an appointment
export const deleteAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        // Validate appointmentId
        if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
            return res.status(400).json({ message: 'Invalid appointment ID format.' });
        }

        const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);

        if (!deletedAppointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }

        res.status(200).json({ message: 'Appointment deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete appointment', error: error.message });
    }
};
