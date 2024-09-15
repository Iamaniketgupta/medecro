import React from 'react';
import { FaCalendarCheck, FaFileMedical, FaHospitalUser } from 'react-icons/fa6';
import { FaUserNurse } from 'react-icons/fa';

const PDashboard = () => {
    const statsTabs = [
        {
            id: 1,
            title: "Upcoming Appointments",
            value: "3",
            icon: <FaCalendarCheck className='' />
        },
        {
            id: 2,
            title: "Total Consultations",
            value: "15",
            icon: <FaFileMedical />
        },
        {
            id: 3,
            title: "Preferred Doctors",
            value: "5",
            icon: <FaUserNurse />
        },
        {
            id: 4,
            title: "Total Clinics",
            value: "2",
            icon: <FaHospitalUser />
        },
    ];

    const doctors = [
        {
            id: 1,
            img: 'https://plus.unsplash.com/premium_photo-1682145291930-43b73e27446e?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9jdG9yfGVufDB8fDB8fHww',
            name: "Dr. Suresh Patel",
            specialization: "Cardiologist",
            phone: `+91 9876543210`,
        },
        {
            id: 2,
            img: 'https://plus.unsplash.com/premium_photo-1673547484865-199b16c93a5e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: "Dr. Anita Sharma",
            specialization: "Pediatrician",
            phone: `+91 9876543211`,
        },
    ];

    return (
        <div className='relative pb-10'>
            <h1 className="md:text-2xl text-lg max-sm:px-3 font-semibold mb-5  opacity-70">Patient Dashboard</h1>

            {/* Stats Section */}
            <div className='flex justify-around flex-wrap gap-4 p-3'>
                {
                    statsTabs.map((i) =>
                        <div key={i.id} className='bg-white flex-1 rounded-lg shadow-lg flex min-w-46 p-4 md:w-[260px] w-[180px] py-5 justify-between gap-5 items-center'>
                            <div className='flex-grow'>
                                <h3 className='text-gray-600 font-semibold'>{i.title}</h3>
                                <p className='md:text-3xl text-xl font-bold text-gray-900'>{i.value}</p>
                            </div>
                            <div className='bg-gradient-to-r p-1 text-white text-5xl rounded-md from-blue-500 to-blue-800'>
                                {i.icon}
                            </div>
                        </div>
                    )}
            </div>

            {/* My Doctors Section */}
            {/* <div className='flex gap-1 items-center'>
                <h2 className='px-5 my-4 text-2xl font-semibold text-gray-600'>My Doctors</h2>
                <p>{doctors.length}/5</p>
                <button className='bg-blue-500 opacity-35 px-4 py-1 rounded-md text-white font-semibold cursor-not-allowed mx-4'>Add Doctor</button>
            </div> */}

            {/* <div className='flex flex-wrap gap-4 p-3'>
                {
                    doctors.map((i) =>
                        <div key={i.id} className='bg-white hover:bg-gray-50 cursor-pointer flex-1 max-w-[500px] rounded-lg shadow-lg flex min-w-46 p-4 md:w-[260px] w-[180px] py-5 justify-between gap-5 items-center'>
                            <img src={i.img} className='rounded-md w-20 md:w-40 h-32 object-cover' alt="doctor profile" />
                            <div className='flex-grow'>
                                <h3 className='text-gray-800 font-semibold'>{i.name}</h3>
                                <p className='text-gray-900'>{i.specialization}</p>
                                <p className='text-gray-900'>{i.phone}</p>
                            </div>
                        </div>
                    )}
            </div> */}

            {/* Other Sections: Future or Ongoing */}
            <div className='grid md:grid-cols-2 gap-10 my-4 px-3'>
                {/* Sections for appointments, reports, etc., can be added here */}
            </div>
        </div>
    );
}

export default PDashboard;
