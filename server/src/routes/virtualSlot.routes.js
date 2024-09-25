// routes/virtualSlotRoutes.js
import express from 'express';
import {
    addVirtualSlot,
    getVirtualSlotsByDoctorId, // Updated import
    getVirtualSlotById,
    updateVirtualSlot,
    deleteVirtualSlot
} from '../controllers/virtualSlot.controller.js';

const router = express.Router();

// Route to add a new virtual slot
router.post('/', addVirtualSlot);

// Route to get all virtual slots for a doctor
router.get('/getVirtualSlotsByDoctorId/:doctorId', getVirtualSlotsByDoctorId); // Updated route handler

// Route to get a single virtual slot by ID
router.get('/slot/:slotId', getVirtualSlotById);

// Route to update a virtual slot
router.put('/slot/:slotId', updateVirtualSlot);

// Route to delete a virtual slot
router.delete('/slot/:slotId', deleteVirtualSlot);

export default router;
