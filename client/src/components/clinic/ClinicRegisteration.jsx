import React, { useState } from 'react';
import axiosInstance from '../../axiosConfig/axiosConfig';
import { FaClinicMedical } from 'react-icons/fa';
import { MdLocationOn, MdPhone } from 'react-icons/md';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';

const ClinicForm = ({ clinic }) => {
    const [formData, setFormData] = useState({
        name: clinic?.name || '',
        address: clinic?.address || { street: '', city: '', state: '', country: '' },
        coordinates: clinic?.coordinates || { lat: 0, lng: 0 },
        licenseNumber: clinic?.licenseNumber || '',
        mobileNo: clinic?.mobileNo || '',
        doctor: clinic?.doctor || '66e53dc6e8c2b937091da4f3', // Ensure this is a valid ObjectId or identifier
    });
    const [images, setImages] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [displayedCoords, setDisplayedCoords] = useState({ lat: 0, lng: 0 });
    const fileInputRef = React.useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('address')) {
            const [field, subField] = name.split('.');
            setFormData(prevData => ({
                ...prevData,
                address: {
                    ...prevData.address,
                    [subField]: value,
                },
            }));
        } else if (name.includes('coordinates')) {
            const [field, subField] = name.split('.');
            setFormData(prevData => ({
                ...prevData,
                coordinates: {
                    ...prevData.coordinates,
                    [subField]: value,
                },
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles(prevFiles => [...prevFiles, ...files]);
        setImages(prevImages => [
            ...prevImages,
            ...files.map(file => URL.createObjectURL(file)),
        ]);
    };

    const handleRemoveImage = (index) => {
        setImageFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const handleGetCoordinates = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    setFormData(prevData => ({
                        ...prevData,
                        coordinates: {
                            lat: latitude,
                            lng: longitude,
                        },
                    }));
                    setDisplayedCoords({ lat: latitude, lng: longitude });
                },
                error => {
                    console.error("Error fetching location", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = new FormData();
        Object.keys(formData).forEach(key => {
            if (typeof formData[key] === 'object') {
                form.append(key, JSON.stringify(formData[key]));
            } else {
                form.append(key, formData[key]);
            }
        });

        imageFiles.forEach(file => {
            form.append('images', file);
        });

        try {
            const response = await axiosInstance.post("/clinic/create", form);
            console.log("response", response);
            if (response.data) {
                toast.success("Clinic created successfully");
            } else {
                toast.error("Failed to create clinic");
            }

            
        } catch (error) {
            console.error("Error submitting form", error);
            toast.error("An error occurred while submitting the form");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white min-h-screen p-6">
            <div className="max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">{clinic ? 'Update Clinic' : 'Create Clinic'}</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col  sm:space-x-6 space-y-6 sm:space-y-0">
                        <div className="flex flex-col flex-1 space-y-6">
                            <div className="flex items-center gap-4">
                                <FaClinicMedical className="text-4xl text-blue-600" />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Clinic Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                                <div className="flex flex-col flex-1 space-y-4">
                                    <div className="flex items-center gap-4">
                                        <MdLocationOn className="text-4xl text-blue-600" />
                                        <input
                                            type="text"
                                            name="address.street"
                                            placeholder="Street"
                                            value={formData.address.street}
                                            onChange={handleChange}
                                            className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <MdLocationOn className="text-4xl text-blue-600" />
                                        <input
                                            type="text"
                                            name="address.city"
                                            placeholder="City"
                                            value={formData.address.city}
                                            onChange={handleChange}
                                            className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col flex-1 space-y-4">
                                    <div className="flex items-center gap-4">
                                        <MdLocationOn className="text-4xl text-blue-600" />
                                        <input
                                            type="text"
                                            name="address.state"
                                            placeholder="State"
                                            value={formData.address.state}
                                            onChange={handleChange}
                                            className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <MdLocationOn className="text-4xl text-blue-600" />
                                        <input
                                            type="text"
                                            name="address.country"
                                            placeholder="Country"
                                            value={formData.address.country}
                                            onChange={handleChange}
                                            className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <MdPhone className="text-4xl text-blue-600" />
                                <input
                                    type="text"
                                    name="mobileNo"
                                    placeholder="Phone Number"
                                    value={formData.mobileNo}
                                    onChange={handleChange}
                                    className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <FaClinicMedical className="text-4xl text-blue-600" />
                                <input
                                    type="text"
                                    name="licenseNumber"
                                    placeholder="License Number"
                                    value={formData.licenseNumber}
                                    onChange={handleChange}
                                    className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleGetCoordinates}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                            >
                                Get Coordinates
                            </button>
                            <div className="mt-4">
                                <p className="text-lg font-semibold text-gray-700">Coordinates:</p>
                                <p className="text-gray-600">Latitude: {displayedCoords.lat.toFixed(6)}</p>
                                <p className="text-gray-600">Longitude: {displayedCoords.lng.toFixed(6)}</p>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <label className="flex items-center gap-4 cursor-pointer">
                                <span className="text-lg font-semibold text-gray-700">Images:</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    className="hidden"
                                    ref={fileInputRef}
                                />
                                <button
                                    onClick={() => fileInputRef.current.click()}
                                    type="button"
                                    className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                                >
                                    Choose Images
                                </button>
                            </label>
                            <div className="grid grid-cols-3 gap-4">
                                {images.map((img, index) => (
                                    <div key={index} className="relative">
                                        <img src={img} alt={`preview ${index}`} className="w-full h-32 object-cover rounded-lg" />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition duration-200"
                                        >
                                            X
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ClinicForm;
