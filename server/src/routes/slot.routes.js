// routes/slotRoutes.js
import express from 'express';
import {
    addSlot,
    getSlotsByClinicId,
    getSlotById,
    updateSlot,
    deleteSlot
} from '../controllers/slot.controller.js'; // Adjust the path as necessary

const router = express.Router();

// Route to add a new slot
router.post('/add', addSlot);

// Route to get all slots for a specific clinic
router.get('/clinic/:clinicId', getSlotsByClinicId);

// Route to get a single slot by its ID
router.get('/:slotId', getSlotById);

// Route to update a slot
router.put('/update/:slotId', updateSlot);

// Route to delete a slot
router.delete('/delete/:slotId', deleteSlot);

export default router;
