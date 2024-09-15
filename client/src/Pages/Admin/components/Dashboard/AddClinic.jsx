import React, { useState } from 'react';

const AddClinic = ({ open, onClose }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0  z-[2000] overflow-scroll  bg-gray-900 bg-opacity-50">
            <div className="bg-white  shadow-lg p-8 z-[3000] min-w-full  ">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Clinic</h2>

                <form className="space-y-6">
                    <div className='flex items-center justify-around'>
                    {/* Clinic Name */}
                    <div className='w-full' >
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Clinic Name <span className='text-red-700'>*</span>
                        </label>
                        <input
                            type="text"
                            className="block w-full border-gray-300 p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="SabarMati Clinic"
                            required
                        />
                    </div>

                    {/* Address */}
                    <div className='w-full' >
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Address <span className='text-red-700'>*</span>
                        </label>
                        <input
                            type="text"
                            className="block w-full border-gray-300 p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="102 Sector near Jain Villa"
                            required
                        />
                    </div>


                    </div>


                    <div className='flex items-center justify-around'>

                    {/* City */}
                    <div className='w-full' >
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            City <span className='text-red-700'>*</span>
                        </label>
                        <input
                            type="text"
                            className="block w-full border-gray-300 p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="City"
                            required
                        />
                    </div>

                    {/* State */}
                    <div className='w-full' >
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            State <span className='text-red-700'>*</span>
                        </label>
                        <input
                            type="text"
                            className="block w-full border-gray-300 p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="State"
                            required
                        />
                    </div>
</div>

<div className='flex items-center justify-around'>

                    {/* Zip Code */}
                    <div className='w-full' >
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Zip Code <span className='text-red-700'>*</span>
                        </label>
                        <input
                            type="text"
                            className="block w-full border-gray-300 p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="123456"
                            required
                        />
                    </div>

                    {/* Phone Number */}
                    <div className='w-full' >
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            className="block w-full border-gray-300 p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="+91 1234567890"
                        />
                    </div>
</div>

<div className='flex items-center justify-around'>

                    {/* Email Address */}
                    <div className='w-full' >
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            className="block w-full border-gray-300 p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="example@clinic.com"
                        />
                    </div>

                    {/* Location Coordinates */}
                    <div className='w-full' >
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Location Coordinates
                        </label>
                        <input
                            type="text"
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
                                        <input id="image-upload" name="image-upload" type="file" className="sr-only" multiple />
                                    </label>
                                    <p className="text-xs text-gray-500">PNG, JPG up to 5MB each</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit and Close Buttons */}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md shadow-md hover:bg-gray-400 focus:outline-none"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
                        >
                            Add Clinic
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddClinic;
