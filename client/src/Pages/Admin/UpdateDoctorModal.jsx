import React, { useState } from 'react';
import Modal from 'react-modal'; // You can use any modal library or a custom one

const UpdateDoctorModal = ({ isOpen, onRequestClose, doctorInfo, onUpdate }) => {
    const [name, setName] = useState(doctorInfo.name || '');
    const [email, setEmail] = useState(doctorInfo.email || '');
    const [speciality, setSpeciality] = useState(doctorInfo.speciality || '');
    const [phoneNumber, setPhoneNumber] = useState(doctorInfo.phoneNumber || '');
    const [experience, setExperience] = useState(doctorInfo.experience || '');
    const [age, setAge] = useState(doctorInfo.age || '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Call the update function with the new values
        await onUpdate({ name, email, speciality, phoneNumber, experience, age });
        onRequestClose(); // Close the modal after the update
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal">
            <div className="bg-white rounded-lg shadow-lg mt-20 p-6 max-w-lg mx-auto">
                <h2 className="text-xl font-semibold mb-4">Update Doctor Information</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Specialization</label>
                            <input
                                type="text"
                                value={speciality}
                                onChange={(e) => setSpeciality(e.target.value)}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Experience (years)</label>
                            <input
                                type="number"
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Age</label>
                            <input
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                        <button
                            type="submit"
                            className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            onClick={onRequestClose}
                            className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default UpdateDoctorModal;
