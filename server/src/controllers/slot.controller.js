// controllers/slotController.js
import Slot from '../models/slot.model.js'; // Adjust the path as necessary

// Add a new slotimport Slot from '../models/Slot'; // Adjust the import path according to your project structure

export const addSlot = async (req, res) => {
    try {
        const { clinicId, date, timeSlots } = req.body; // Assuming timeSlots is an array

        // Ensure the timeSlots is an array and properly formatted
        if (!Array.isArray(timeSlots) || timeSlots.length === 0) {
            return res.status(400).json({ message: 'Time slots must be provided.' });
        }

        const slotsToSave = timeSlots.map(timeSlot => {
            return { clinicId, date, timeSlot }; // Create an object for each time slot
        });

        // Save each slot to the database
        const savedSlots = await Slot.insertMany(slotsToSave); // Use insertMany to save multiple documents

        res.status(201).json({ message: 'Slots added successfully!', slots: savedSlots });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add slots', error: error.message });
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
