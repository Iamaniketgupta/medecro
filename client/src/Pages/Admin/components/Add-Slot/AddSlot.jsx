import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../../axiosConfig/axiosConfig';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const AddSlot = () => {
    const [date, setDate] = useState('');
    const [timeSlots, setTimeSlots] = useState(['']);
    const [clinics, setClinics] = useState([]);
    const [selectedClinic, setSelectedClinic] = useState('');
    const navigate = useNavigate();
    const user = useSelector(state=>state.auth.user)

    // Fetch clinics when component mounts
    useEffect(() => {
        const fetchClinics = async () => {
            try {
                const response = await axiosInstance.get(`/clinic/getClinicByDoctorId/${user._id}`);
                if(response.data){
                    console.log(response.data)
                    setClinics(response.data.data);
                } // Adjust the endpoint as necessary
            } catch (error) {
                console.error('Failed to fetch clinics:', error);
                toast.error('Error fetching clinics');
            }
        };

        fetchClinics();
    }, []);

    const handleTimeSlotChange = (index, value) => {
        const newTimeSlots = [...timeSlots];
        // Validate format: HH:MM
        if (/^(?:[01]\d|2[0-3]):(?:[0-5]\d)$/.test(value) || value === '') {
            newTimeSlots[index] = value;
        }
        setTimeSlots(newTimeSlots);
    };

    const convertTo12HourFormat = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        const isPM = hours >= 12;
        const adjustedHours = hours % 12 || 12; // Convert to 12-hour format
        const formattedMinutes = minutes.toString().padStart(2, '0'); // Ensure minutes are always two digits
        return `${adjustedHours}:${formattedMinutes} ${isPM ? 'PM' : 'AM'}`;
    };

    const addTimeSlot = () => {
        setTimeSlots([...timeSlots, '']);
    };

    const removeTimeSlot = (index) => {
        const newTimeSlots = timeSlots.filter((_, i) => i !== index);
        setTimeSlots(newTimeSlots);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const slots = timeSlots.map(time => convertTo12HourFormat(time));

        try {
            const res = await axiosInstance.post('/slot/add', {
                clinicId: selectedClinic, // Include selected clinic ID
                date,
                timeSlots: slots.filter(slot => slot.trim() !== '') // Filter out empty slots
            });

            if (res.data) {
                toast.success('Slots added successfully');
                navigate(`/clinic/profile`);
            } else {
                toast.error('Failed to add slots');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while adding slots');
        }
    };

    return (
        <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Add Available Slots</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
        {/* Clinic Selection */}
        <div>
            <label className="block text-sm font-medium text-gray-700">Select Clinic</label>
            <select
                value={selectedClinic}
                onChange={(e) => setSelectedClinic(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
            >
                <option value="">Select a clinic</option>
                {clinics.map((clinic) => (
                    <option key={clinic._id} value={clinic._id}>
                        {clinic.clinicName}
                    </option>
                ))}
            </select>
        </div>

        {/* Date Selection */}
        <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
            />
        </div>

        {/* Time Slots */}
        <div>
            <label className="block text-sm font-medium text-gray-700">Time Slots (HH:MM)</label>
            <div className="flex flex-wrap gap-2">
                {timeSlots.map((slot, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <input
                            type="time"
                            value={slot}
                            onChange={(e) => handleTimeSlotChange(index, e.target.value)}
                            className="mt-1 block w-28 border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => removeTimeSlot(index)}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
            <button
                type="button"
                onClick={addTimeSlot}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
                Add Another Slot
            </button>
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Submit Slots
        </button>
    </form>
</div>

    );
};

export default AddSlot;
