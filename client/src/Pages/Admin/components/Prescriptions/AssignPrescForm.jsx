import React from 'react';

const AssignPrescriptionForm = () => {
    return (
        <div className=" p-8 bg-white  rounded-lg">

            {/* Patient Info */}
            <div className=" mb-8">
                <div>
                    <label className="block text-sm font-medium text-gray-600">Patient Name <span className='text-red-700'>*</span></label>
                    <input
                        type="text"
                        className="mt-1 block w-full border-gray-400 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="John Doe"
                    />
                </div>

            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">

                <div>
                    <label className="block text-sm font-medium text-gray-600">Age</label>
                    <input
                        type="number"
                        className="mt-1 block w-full border-gray-400 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="25"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600">Gender</label>
                    <input
                        type="number"
                        className="mt-1 block w-full border-gray-400 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Male"
                    />
                </div>

            </div>

            {/* Prescription Details */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                    <label className="block text-sm font-medium text-gray-600">Medication Name <span className='text-red-700'>*</span></label>
                    <input
                        type="text"
                        className="mt-1 block w-full border-gray-400 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Paracetamol"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600">Dosage</label>
                    <input
                        type="text"
                        className="mt-1 block w-full border-gray-400 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="500mg"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                    <label className="block text-sm font-medium text-gray-600">Frequency <span className='text-red-700'>*</span></label>
                    <input
                        type="text"
                        className="mt-1 block w-full border-gray-400 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Twice a day"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600">Duration</label>
                    <input
                        type="text"
                        className="mt-1 block w-full border-gray-400 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="7 days"
                    />
                </div>
            </div>

            <div className="mb-8">
                <label className="block text-sm font-medium text-gray-600">Special Instructions</label>
                <textarea
                    className="mt-1 block w-full border-gray-400 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows="3"
                    placeholder="Take with food, avoid alcohol..."
                />
            </div>

            {/* File Upload - Drag & Drop */}
            <div className="mb-8">
                <label className="block text-sm font-medium text-gray-600">Upload Report</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-400 p-1 rounded-md">
                    <div className="space-y-1 text-center">
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
                        <div className="flex text-sm text-gray-600">
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                            >
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PDF, DOC, PNG, JPG up to 10MB</p>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="text-right">
                <button
                    type="submit"
                    className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Submit Prescription
                </button>
            </div>
        </div>
    );
};

export default AssignPrescriptionForm;
