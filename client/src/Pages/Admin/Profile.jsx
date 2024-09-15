import React from 'react';

const DoctorProfile = () => {
    return (
        <div className='relative pb-10 px-5 max-w-6xl mx-auto'>
            {/* Header */}
            <h1 className="md:text-2xl text-lg max-sm:px-3 font-semibold mb-5 opacity-70">Doctor Profile</h1>

    {/* Patient Stats Section */}
    <div className="bg-white shadow-lg rounded-lg p-5 mt-10">
                <h3 className="text-lg font-semibold text-gray-700 mb-5"> Statistics</h3>
                <div className="grid md:grid-cols-4 gap-6">
                    <div className="flex flex-col items-center bg-blue-100 rounded-lg py-5">
                        <h4 className="text-2xl font-bold text-blue-700">1,500+</h4>
                        <p className="text-gray-500">Total Patients</p>
                    </div>
                    <div className="flex flex-col items-center bg-green-100 rounded-lg py-5">
                        <h4 className="text-2xl font-bold text-green-700">300+</h4>
                        <p className="text-gray-500">Online Consultations</p>
                    </div>
                    <div className="flex flex-col items-center bg-yellow-100 rounded-lg py-5">
                        <h4 className="text-2xl font-bold text-yellow-700">4.8/5</h4>
                        <p className="text-gray-500">Average Rating</p>
                    </div>
                    <div className="flex flex-col items-center bg-red-100 rounded-lg py-5">
                        <h4 className="text-2xl font-bold text-red-700">20 Years</h4>
                        <p className="text-gray-500">Experience</p>
                    </div>
                </div>
            </div>
            {/* Profile Info Section */}
            <div className="grid md:grid-cols-3 gap-10 my-10">
                {/* Left Section - Profile Image and Basic Info */}
                <div className="col-span-1 bg-white shadow-lg rounded-lg p-5">
                    <div className="flex flex-col items-center">
                        <img
                            src="https://randomuser.me/api/portraits/men/1.jpg"
                            alt="Doctor Profile"
                            className="rounded-full w-32 h-32 object-cover shadow-md"
                        />
                        <h2 className="text-xl font-bold text-gray-700 mt-4">Dr. Vivek Sharma</h2>
                        <p className="text-sm text-gray-500">Cardiologist</p>
                        <p className="text-sm text-gray-500">MBBS, MD (Cardiology)</p>
                    <p className="text-sm text-gray-500 mt-4">Phone</p>
                    <p className="text-sm text-gray-700">+91 3149194010</p>
                    <p className="text-sm text-gray-500 mt-4">Email</p>
                    <p className="text-sm text-gray-700">vivek213@gmail.com</p>
                    </div>

                </div>

                {/* Middle Section - Personal & Professional Info */}
                <div className="col-span-2 bg-white shadow-lg rounded-lg p-5">
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-700">Personal Information</h3>
                        <div className="grid md:grid-cols-2 gap-6 mt-4">
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="text-lg text-gray-700">vivek213@gmail.com</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Contact</p>
                                <p className="text-lg text-gray-700">+91 3149194010</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Age</p>
                                <p className="text-lg text-gray-700">45</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Gender</p>
                                <p className="text-lg text-gray-700">Male</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-700">Professional Information</h3>
                        <div className="grid md:grid-cols-2 gap-6 mt-4">
                            <div>
                                <p className="text-sm text-gray-500">Years of Experience</p>
                                <p className="text-lg text-gray-700">20 years</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Specialization</p>
                                <p className="text-lg text-gray-700">Cardiology</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total Patients</p>
                                <p className="text-lg text-gray-700">1,500+</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Online Consultations</p>
                                <p className="text-lg text-gray-700">300+</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Qualifications</h3>
                        <ul className="list-disc ml-5 mt-4 text-gray-700">
                            <li>MBBS from XYZ Medical College (2000)</li>
                            <li>MD in Cardiology from ABC University (2005)</li>
                            <li>Fellowship in Interventional Cardiology (2010)</li>
                        </ul>
                    </div>
                    
                </div>
            </div>

           

        
        </div>
    );
};

export default DoctorProfile;
