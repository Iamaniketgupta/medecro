import React, { useState } from 'react';
import axiosInstance from '../../../../axiosConfig/axiosConfig';
import { toast } from 'react-toastify';
import { Loader, Loader2 } from 'lucide-react';

const AssignPrescriptionForm = ({ selectedPatient }) => {
    console.log(selectedPatient)
    const [formData, setFormData] = useState({
        medicationName: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: '',
        reports: [],
    });


    const [previewFiles, setPreviewFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    // Handle change for form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle file upload and preview
    const handleFileUpload = (e) => {
        const file = e.target.files[0];  // Get only the first file
        setFormData({ ...formData, reports: [file] });  // Store single file in an array
        const preview = URL.createObjectURL(file);
        setPreviewFiles([preview]);  // Only one preview
    };
    
    // Remove uploaded file
    const handleRemoveFile = (index) => {
        const updatedFiles = formData.reports.filter((_, i) => i !== index);
        const updatedPreviews = previewFiles.filter((_, i) => i !== index);
        setFormData({ ...formData, reports: updatedFiles });
        setPreviewFiles(updatedPreviews);
    };

    //  form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
    
        try {
            setLoading(true);
    
            const data = new FormData();
            data.append('clinicId', selectedPatient.clinicId);
            data.append('patientId', selectedPatient.userId._id);
            data.append('medicationName', formData.medicationName);
            data.append('dosage', formData.dosage);
            data.append('frequency', formData.frequency);
            data.append('duration', formData.duration);
            data.append('instructions', formData.instructions);
    
            if (formData.reports[0]) {
                data.append('report', formData.reports[0]);
            }
    
            const response = await axiosInstance.post('/prescription/assign', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.status === 201) {
                toast.success('Prescription assigned successfully');
                setFormData({
                    medicationName: '',
                    dosage: '',
                    frequency: '',
                    duration: '',
                    instructions: '',
                    reports: [],        
                })
                setPreviewFiles([]);
            } else {
                throw new Error('Failed to assign prescription');
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to assign prescription');
        } finally {
            setLoading(false);
        }
    };
    
    
    return (
        <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg">

            {/* Patient Info */}
            <div className="mb-8">
            <div className="grid md:grid-cols-2 gap-6 mb-8">

                <div>
                    <label className="block text-sm font-medium text-gray-600">
                        Patient Name <span className='text-red-700'>*</span>
                    </label>
                    <input
                        type="text"
                        name="patientName"
                        value={selectedPatient?.userId.fullName}
                        disabled
                        className="mt-1 block w-full border-gray-400 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                
            

                <div>
                    <label className="block text-sm font-medium text-gray-600">Age</label>
                    <input
                        type="number"
                        name="age"
                        value={selectedPatient?.userId.age}
                        disabled
                        className="mt-1 block w-full border-gray-400 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                </div>
                {/* <div>
                    <label className="block text-sm font-medium text-gray-600">Gender</label>
                    <input
                        type="text"
                        name="gender"
                        value={selectedPatient?.userId.gender || 'Male'}
                        disabled
                        className="mt-1 block w-full border-gray-400 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div> */}
            </div>

            {/* Prescription Details */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                    <label className="block text-sm font-medium text-gray-600">
                        Medication Name <span className='text-red-700'>*</span>
                    </label>
                    <input
                        type="text"
                        name="medicationName"
                        value={formData.medicationName}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-400 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Paracetamol"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600">Dosage</label>
                    <input
                        type="text"
                        name="dosage"
                        value={formData.dosage}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-400 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="500mg"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                    <label className="block text-sm font-medium text-gray-600">
                        Frequency <span className='text-red-700'>*</span>
                    </label>
                    <input
                        type="text"
                        name="frequency"
                        value={formData.frequency}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-400 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Twice a day"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600">Duration</label>
                    <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-400 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="7 days"
                    />
                </div>
            </div>

            <div className="mb-8">
                <label className="block text-sm font-medium text-gray-600">Special Instructions</label>
                <textarea
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-400 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows="3"
                    placeholder="Take with food, avoid alcohol..."
                />
            </div>

            {/* File Upload - Drag & Drop with Preview */}
            <div className="mb-8">
                <label className="block text-sm font-medium text-gray-600">Upload Report (if any)</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-400 rounded-md">
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
                                <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    onChange={handleFileUpload}
                                    multiple
                                    className="sr-only"
                                />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PDF, DOC, PNG, JPG up to 10MB</p>
                    </div>
                </div>
                <div className="mt-4">
                    {/* Preview uploaded files */}
                    {previewFiles.map((file, index) => {
                        const fileName = formData.reports[index]?.name;
                        const fileExtension = fileName?.split('.').pop().toLowerCase();

                        return (
                            <div key={index} className="flex items-center  space-x-2 mb-2">
                                {fileExtension === 'pdf' ? (
                                    <div className="h-10 w-10 bg-gray-300 flex items-center justify-center">
                                        <span className="text-gray-600">PDF</span>
                                    </div>
                                ) : fileExtension === 'doc' || fileExtension === 'docx' ? (
                                    <div className="h-10 w-10 bg-gray-300 flex items-center justify-center">
                                        <span className="text-gray-600">DOC</span>
                                    </div>
                                ) : (
                                    <img src={file} alt="preview" className="h-12 w-12 object-cover" />
                                )}
                                <span className="text-sm">{fileName}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveFile(index)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    &times;
                                </button>
                            </div>
                        );
                    })}

                </div>
            </div>

            {/* Submit Button */}
            <div className="text-right flex items-center justify-end">
                {loading ? <div className="bg-blue-600 w-fit  text-white font-semibold py-2 px-6 rounded-md shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <Loader />
                </div>
                    :
                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Submit Prescription
                    </button>
                }
            </div>
        </form>
    );
};

export default AssignPrescriptionForm;
