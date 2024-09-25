// controllers/virtualSlotController.js
import VirtualSlot from '../models/virtualSlot.model.js'; // Adjust the path as necessary

// Add a new virtual slot
export const addVirtualSlot = async (req, res) => {
    try {
        const { doctor, date, timeSlots } = req.body; // Assuming timeSlots is an array

        // Ensure the timeSlots is an array and properly formatted
        if (!Array.isArray(timeSlots) || timeSlots.length === 0) {
            return res.status(400).json({ message: 'Time slots must be provided.' });
        }

        const slotsToSave = timeSlots.map(timeSlot => {
            return {doctor, date, timeSlot }; // Create an object for each time slot
        });

        // Save each virtual slot to the database
        const savedSlots = await VirtualSlot.insertMany(slotsToSave); // Use insertMany to save multiple documents

        res.status(201).json({ message: 'Virtual slots added successfully!', slots: savedSlots });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add virtual slots', error: error.message });
    }
};

// Get all virtual slots for a doctor
export const getVirtualSlotsByDoctorId = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const slots = await VirtualSlot.find({ doctor:doctorId }).populate('doctor'); // Populate doctor details if needed
        res.status(200).json(slots);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch virtual slots', error: error.message });
    }
};

// Get a single virtual slot by ID
export const getVirtualSlotById = async (req, res) => {
    try {
        const { slotId } = req.params;
        const slot = await VirtualSlot.findById(slotId).populate('doctor');
        if (!slot) {
            return res.status(404).json({ message: 'Virtual slot not found' });
        }
        res.status(200).json(slot);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch virtual slot', error: error.message });
    }
};

// Update a virtual slot
export const updateVirtualSlot = async (req, res) => {
    try {
        const { slotId } = req.params;
        const updatedSlot = await VirtualSlot.findByIdAndUpdate(slotId, req.body, { new: true });
        if (!updatedSlot) {
            return res.status(404).json({ message: 'Virtual slot not found' });
        }
        res.status(200).json({ message: 'Virtual slot updated successfully!', slot: updatedSlot });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update virtual slot', error: error.message });
    }
};

// Delete a virtual slot
export const deleteVirtualSlot = async (req, res) => {
    try {
        const { slotId } = req.params;
        const deletedSlot = await VirtualSlot.findByIdAndDelete(slotId);
        if (!deletedSlot) {
            return res.status(404).json({ message: 'Virtual slot not found' });
        }
        res.status(200).json({ message: 'Virtual slot deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete virtual slot', error: error.message });
    }
};
