import React, { useState } from 'react';
import axiosInstance from '../../../axiosConfig/axiosConfig';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/authSlice';

const UserUpdateModal = ({ user, onClose }) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        age: user.age || '',
        emergencyno: user.emergencyno || '',
        doctors: user.doctors || [],
        address: {
            street: user.address?.street || '',
            city: user.address?.city || '',
            state: user.address?.state || '',
            zip: user.address?.zip || '',
            country: user.address?.country || '',
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => {
            const [section, field] = name.split('.');

            if (section === 'address') {
                return {
                    ...prevState,
                    address: {
                        ...prevState.address,
                        [field]: value
                    }
                };
            }
            return { ...prevState, [name]: value };
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post('/users/update', formData);
            if (res.data) {
                dispatch(login({ user: res.data.data, type: "user" }));
                onClose(); // Close modal after successful update
            }
        } catch (error) {
            console.log(error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="fixed overflow-y-scroll inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white mt-16 p-5 rounded-lg w-full max-w-lg">
                <h2 className="text-xl font-semibold mb-4">Update Information</h2>

                <form onSubmit={handleFormSubmit}>
                    {/* Flex container for age and emergency contact in a single row */}
                    <div className="flex flex-wrap gap-4">
                        {/* Age and Emergency Contact in one row */}
                        <div className="w-full md:w-2/5">
                            <div className="mb-4">
                                <label className="block text-sm text-gray-600">Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <div className="mb-4">
                                <label className="block text-sm text-gray-600">Emergency Contact</label>
                                <input
                                    type="text"
                                    name="emergencyno"
                                    value={formData.emergencyno}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Flex container for street, state, city, zip, country */}
                    <div className="flex flex-wrap gap-4">
                        {/* Street and State in one row */}
                        <div className="w-full md:w-2/5">
                            <div className="mb-4">
                                <label className="block text-sm text-gray-600">Street</label>
                                <input
                                    type="text"
                                    name="address.street"
                                    value={formData.address.street}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <div className="mb-4">
                                <label className="block text-sm text-gray-600">State</label>
                                <input
                                    type="text"
                                    name="address.state"
                                    value={formData.address.state}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                        </div>
                    </div>

                    {/* City and Zip in one row */}
                    <div className="flex flex-wrap gap-4">
                        <div className="w-full md:w-2/5">
                            <div className="mb-4">
                                <label className="block text-sm text-gray-600">City</label>
                                <input
                                    type="text"
                                    name="address.city"
                                    value={formData.address.city}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <div className="mb-4">
                                <label className="block text-sm text-gray-600">Zip Code</label>
                                <input
                                    type="text"
                                    name="address.zip"
                                    value={formData.address.zip}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Country in one row */}
                    <div className="flex flex-wrap gap-4">
                        <div className="w-full">
                            <div className="mb-4">
                                <label className="block text-sm text-gray-600">Country</label>
                                <input
                                    type="text"
                                    name="address.country"
                                    value={formData.address.country}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserUpdateModal;
