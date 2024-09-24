import React, { useState } from 'react';
import axiosInstance from "../../../../axiosConfig/axiosConfig";

import { FaSpinner } from 'react-icons/fa'; 

const AddClinic = ({ open, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phoneNumber: '',
        emailAddress: '',
        coordinates: '',
    });

    const [loading, setLoading] = useState(false); // Loader state

    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    if (!open) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        
        // Combine new files with existing ones
        const updatedFiles = [...imageFiles, ...newFiles];
        setImageFiles(updatedFiles);
        
        // Create image previews
        const previews = updatedFiles.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    };
    

    const handleSubmit = async (e) => {
        setLoading(true);

        e.preventDefault();
        try {
            const form = new FormData();
            form.append('name', formData.name);
            form.append('address', formData.address);
            form.append('city', formData.city);
            form.append('state', formData.state);
            form.append('zipCode', formData.zipCode);
            form.append('phoneNumber', formData.phoneNumber);
            form.append('emailAddress', formData.emailAddress);
            form.append('coordinates', formData.coordinates);

            // Append each image file to the form data
            for (let i = 0; i < imageFiles.length; i++) {
                form.append('images', imageFiles[i]);
            }

            // Make the API request using axios
            const response = await axiosInstance.post('/clinic/create', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                alert('Clinic added successfully!');
                onClose(); // Close the form on successful submission
                resetForm(); // Reset the form after submission
            }
        } catch (error) {
            console.error('Error adding clinic:', error);
            alert('Failed to add clinic. Please try again.');
        }finally{
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            phoneNumber: '',
            emailAddress: '',
            coordinates: '',
        });
        setImageFiles([]);
        setImagePreviews([]);
    };

    return (
        <div className="fixed inset-0 z-[2000] overflow-scroll bg-gray-900 bg-opacity-50">
            <div className="bg-white shadow-lg p-8 z-[3000] min-w-full">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Clinic</h2>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="flex items-center justify-around">
                        {/* Clinic Name */}
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Clinic Name <span className="text-red-700">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="block w-full border-gray-300 p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="SabarMati Clinic"
                                required
                            />
                        </div>

                        {/* Address */}
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Address <span className="text-red-700">*</span>
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="block w-full border-gray-300 p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="102 Sector near Jain Villa"
                                required
                            />
                        </div>
                    </div>

                    {/* Other fields */}
                    <div className="flex items-center justify-around">
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                City <span className="text-red-700">*</span>
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                className="block w-full border-gray-300 p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="City"
                                required
                            />
                        </div>

                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                State <span className="text-red-700">*</span>
                            </label>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                className="block w-full border-gray-300 p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="State"
                                required
                            />
                        </div>
                    </div>

                    {/* More fields */}
                    <div className="flex items-center justify-around">
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Zip Code <span className="text-red-700">*</span>
                            </label>
                            <input
                                type="text"
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={handleInputChange}
                                className="block w-full border-gray-300 p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="123456"
                                required
                            />
                        </div>

                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                className="block w-full border-gray-300 p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="+91 1234567890"
                            />
                        </div>
                    </div>

                    {/* Email Address and Coordinates */}
                    <div className="flex items-center justify-around">
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="emailAddress"
                                value={formData.emailAddress}
                                onChange={handleInputChange}
                                className="block w-full border-gray-300 p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="example@clinic.com"
                            />
                        </div>

                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Location Coordinates
                            </label>
                            <input
                                type="text"
                                name="coordinates"
                                value={formData.coordinates}
                                onChange={handleInputChange}
                                className="block w-full border-gray-300 p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Latitude, Longitude"
                            />
                        </div>
                    </div>

                    {/* Upload Clinic Images */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Upload Clinic Images
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-400 rounded-md">
                            <div className="text-center">
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M24 0v24M12 12h24M32 12v-8h8v8h8v8h-8v8h-8v8h-8v-8h-8v-8h8z"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <div className="text-sm text-gray-600">
                                    <label
                                        htmlFor="image-upload"
                                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <span>Upload Clinic Images</span>
                                        <input
                                            id="image-upload"
                                            name="images"
                                            type="file"
                                            className="sr-only"
                                            multiple
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image Previews */}
                    {imagePreviews.length > 0 && (
                        <div className="grid grid-cols-3 gap-4 mt-4">
                            {imagePreviews.map((preview, index) => (
                                <img
                                    key={index}
                                    src={preview}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-32 object-cover rounded-md"
                                />
                            ))}
                        </div>
                    )}

                    {/* Submit and Close Buttons */}
                    <div className="flex justify-end mt-6">
                        <button
                            type="button"
                            className="mr-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-md shadow-sm hover:bg-gray-400"
                            onClick={onClose}
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="relative flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-500"
                            disabled={loading} // Disable button while loading
                        >
                            {loading && (
                                <FaSpinner className="animate-spin mr-2" /> // Show spinner
                            )}
                            Add Clinic
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddClinic;
