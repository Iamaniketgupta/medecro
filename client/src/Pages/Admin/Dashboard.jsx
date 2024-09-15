import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { FaChartSimple, FaRankingStar, FaUserDoctor } from 'react-icons/fa6';
import { FaPenSquare } from 'react-icons/fa';
import LiveAppointments from './components/Dashboard/LiveAppointments';
import OneonOne from './components/Dashboard/OneonOne';
import AddClinic from './components/Dashboard/AddClinic';
// import { useRecoilState } from 'recoil';
// import { userData } from '../atom/states';

const Dashboard = () => {
    // const [currentUser, setCurrentUser] = useRecoilState(userData);



    const statsTabs = [
        {
            id: 1,
            title: "Total patients",
            value: "500",
            icon: <FaUserDoctor className='' />

        },
        {
            id: 2,
            title: "Active Appointments",
            value: "10",
            icon: <FaChartSimple />
        },
        {
            id: 3,
            title: "Rating",
            value: "4.5",
            icon: <FaRankingStar />

        },
        {
            id: 4,
            title: "Total Reviews",
            value: "100",
            icon: <FaPenSquare />

        },
    ]
    const clinics = [
        {
            id: 1,
            img: 'https://plus.unsplash.com/premium_photo-1682145291930-43b73e27446e?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2xpbmljfGVufDB8fDB8fHww',
            Name: "SabarMati Clinic",
            location: "102 Sector near jain villa",
            phone: `+91 1234567890`,
        },
        {
            id: 1,
            img: 'https://plus.unsplash.com/premium_photo-1673547484865-199b16c93a5e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            Name: "Asha Clinic & Care",
            location: "102 Sector near jain villa",
            phone: `+91 1234567890`,
        },

    ]

    const [open,setopen]= useState(false);


    return (
        <div className='relative pb-10'>
            <h1 className="md:text-2xl text-lg max-sm:px-3 font-semibold mb-5  opacity-70">Dashboard</h1>

            <div className='flex justify-around flex-wrap gap-4 p-3'>
                {
                    statsTabs.map((i) =>
                        <div key={i.id} className='bg-white flex-1 rounded-lg shadow-lg flex min-w-46  p-4 md:w-[260px] w-[180px] py-5 justify-between gap-5  items-center'>
                            <div className='flex-grow'>
                                <h3 className='text-gray-600  font-semibold'>{i.title}</h3>
                                <p className='md:text-3xl text-xl font-bold text-gray-900'>{i.value}</p>
                            </div>
                            <div className='bg-gradient-to-r p-1 text-white text-5xl rounded-md from-blue-500 to-blue-800'>
                                {i?.icon}
                            </div>
                        </div>
                    )}
            </div>

            <>
                {/* Clinics */}
                <div className='flex gap-1 items-center'>
                    <h2 className='px-5 my-4 text-2xl font-semibold text-gray-600'>My Clinics</h2>
                    <p>2/2</p>
                    <button onClick={() => setopen(true)} className='bg-blue-500 opacity-35 px-4 py-1 rounded-md text-white font-semibold cursor-not-allowed mx-4'>Add Clinic</button>
                </div>
                <div className='flex flex-wrap gap-4 p-3'>
                    {
                        clinics.map((i) =>
                            <div key={i.id} className='bg-white min-w-fit hover:bg-gray-50 cursor-pointer flex-1 max-w-[500px] rounded-lg shadow-lg flex min-w-46  p-4 md:w-[260px] w-[180px] py-5 justify-between gap-5  items-center'>
                                <img src={i.img} className=' rounded-md w-20 md:w-40 h-32 object-cover' />
                                <div className='flex-grow'>
                                    <h3 className='text-gray-800  font-semibold'>{i.Name}</h3>
                                    <p className='  text-gray-900'>{i.location}</p>
                                    <p className='  text-gray-900'>{i.phone}</p>
                                </div>
                            </div>
                        )}
                </div>

            </>


            <div className='grid md:grid-cols-2 gap-10 my-4 px-3'>
                {/* Live Appointments */}
                <LiveAppointments />
                <OneonOne />
            </div>

            <AddClinic open={open} onClose={() => setopen(false)} />

        </div >
    );
}

export default Dashboard;
