// controllers/slotController.js
import Slot from '../models/slot.model.js'; // Adjust the path as necessary

// Add a new slot
export const addSlot = async (req, res) => {
    try {
        const { clinicId, date, timeSlot } = req.body;
        const newSlot = new Slot({ clinicId, date, timeSlot });
        await newSlot.save();
        res.status(201).json({ message: 'Slot added successfully!', slot: newSlot });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add slot', error: error.message });
    }
};

// Get all slots for a clinic
export const getSlotsByClinicId = async (req, res) => {
    try {
        const { clinicId } = req.params;
        const slots = await Slot.find({ clinicId }).populate('clinicId'); // Populate clinic details if needed
        res.status(200).json(slots);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch slots', error: error.message });
    }
};

// Get a single slot by ID
export const getSlotById = async (req, res) => {
    try {
        const { slotId } = req.params;
        const slot = await Slot.findById(slotId).populate('clinicId', 'name');
        if (!slot) {
            return res.status(404).json({ message: 'Slot not found' });
        }
        res.status(200).json(slot);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch slot', error: error.message });
    }
};

// Update a slot
export const updateSlot = async (req, res) => {
    try {
        const { slotId } = req.params;
        const updatedSlot = await Slot.findByIdAndUpdate(slotId, req.body, { new: true });
        if (!updatedSlot) {
            return res.status(404).json({ message: 'Slot not found' });
        }
        res.status(200).json({ message: 'Slot updated successfully!', slot: updatedSlot });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update slot', error: error.message });
    }
};

// Delete a slot
export const deleteSlot = async (req, res) => {
    try {
        const { slotId } = req.params;
        const deletedSlot = await Slot.findByIdAndDelete(slotId);
        if (!deletedSlot) {
            return res.status(404).json({ message: 'Slot not found' });
        }
        res.status(200).json({ message: 'Slot deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete slot', error: error.message });
    }
};
