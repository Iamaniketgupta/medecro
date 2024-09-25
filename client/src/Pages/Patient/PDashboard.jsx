import React, { useEffect, useState } from 'react';
import { FaPhone, FaPlusSquare } from 'react-icons/fa';
import { FaFileCirclePlus, FaUserDoctor } from 'react-icons/fa6';
import { MdPayment } from 'react-icons/md';
import { TbCalendarRepeat } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import LiveMap from '../../Map/LiveMap';
import {useSelector} from "react-redux";
import axiosInstance from "../../axiosConfig/axiosConfig"

const PDashboard = () => {

    const user = useSelector((state) => state.auth.user);
    const [pendingAppointments, setPendingAppointments] = useState([])

    const fetchPendingAppointments = async()=>{
        try {
            const res = await axiosInstance.get(`/appointment/getUpcomingAppointments/${user._id}`);
            if(res.data) {
                console.log("Res.data : " , res.data);
                setPendingAppointments(res.data);
            }
            
        } catch (error) {
            console.log(error);            
        }
    }
    // Statistics cards
    const statsTabs = [
        {
            id: 1,
            title: "Upcoming Appointments",
            value: pendingAppointments?.length,
            icon: <TbCalendarRepeat className='' />
        },
        {
            id: 2,
            title: "Total Consultations",
            value: "15",
            icon: <FaPlusSquare />

        },
        {
            id: 3,
            title: "Preferred Doctors",
            value: "5",
            icon: <FaUserDoctor />

        },
        {
            id: 4,
            title: "Pending Payments",
            value: "₹9,500",
            icon: <MdPayment />
        },
    ];

    // Appointments data
    const appointments = [
        {
            id: 1,
            doctor: "Dr. Suresh Patel",
            date: "15th Sept 2024",
            time: "10:30 AM",
            mode: 'online',
            status: "Confirmed",
        },

    ];
    const appointments2 = [
        {
            id: 1,
            clinic: 'Sabarmati Clinic',
            address: 'Dharmatala, Sabarmati, Nagpur, Maharashtra 440022',
            doctor: "Dr. Anita Sharma",
            date: "20th Sept 2024",
            time: "02:00 PM",
            mode: 'on site',
            status: "Pending Payment",
        },

    ];

    // Reports data
    const reports = [
        {
            id: 1,
            title: "Blood Test Report",
            date: "10th Sept 2024",
            doctor: "Dr. Suresh Patel",
            link: "#",
        },
        {
            id: 2,
            title: "X-Ray Report",
            date: "12th Sept 2024",
            doctor: "Dr. Anita Sharma",
            link: "#",
        },
    ];
    const [timers, setTimers] = useState({});

    // Initialize countdown timers for each appointment
    useEffect(() => {
        const initTimers = appointments.reduce((acc, appointment) => {
            acc[appointment.id] = 60; // Set each timer to 60 seconds
            return acc;
        }, {});
        // setTimers(initTimers);
    }, [appointments]);

    // Countdown logic
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimers((prevTimers) => {
                const newTimers = { ...prevTimers };
                Object.keys(newTimers).forEach((id) => {
                    if (newTimers[id] > 0) {
                        newTimers[id] -= 1;
                    }
                });
                return newTimers;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);


    useEffect(() => {
        fetchPendingAppointments();
    }, [])
    
    return (
        <div className='relative pb-10'>
            <h1 className="md:text-2xl text-lg max-sm:px-3 font-semibold mb-5 opacity-70">Patient Dashboard</h1>

            {/* Stats Section */}
            <div className='flex justify-around flex-wrap gap-4 p-3'>
                {statsTabs.map((i) => (
                    <div key={i.id} className='bg-white flex-1 rounded-lg shadow-lg flex min-w-46 p-4 md:w-[260px] w-[180px] py-5 justify-between gap-5 items-center'>
                        <div className='flex-grow'>
                            <h3 className='text-gray-600 font-semibold'>{i.title}</h3>
                            <p className='md:text-3xl text-xl font-bold text-gray-900'>{i.value}</p>
                        </div>
                        <div className='bg-gradient-to-r p-1 text-white text-5xl rounded-md from-blue-500 to-blue-800'>
                            {i.icon}
                        </div>
                    </div>
                ))}
            </div>

            <br />
            <hr />
            {/* Appointments Section */}
            <div className='my-6'>
      <h2 className='px-5 text-xl font-semibold text-gray-600 flex items-center gap-4'>
        1:1 Upcoming Appointments <div className='bg-red-500 animate-ping w-2 h-2 rounded-full'></div>
      </h2>
      <div className='flex-wrap gap-4 p-3 grid grid-cols-3'>
        {appointments.map((appointment) => (
          <div key={appointment.id} className='bg-white flex-1 rounded-lg shadow-lg p-4'>
            <h3 className='text-gray-800'>{appointment.doctor}</h3>
            <h3 className='text-gray-800'>{appointment.mode}</h3>
            <p className='text-gray-600'>
              {appointment.date} at {appointment.time}
            </p>
            <p className={`text-sm ${appointment.status === 'Pending Payment' ? 'text-red-500' : 'text-green-500'}`}>
              {appointment.status}
            </p>
<div className='flex items-center justify-between '>

<button
              className={`bg-indigo-300 text-white px-3 py-1 rounded-md my-1 flex items-center gap-3 ${timers[appointment.id] > 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
              disabled={timers[appointment.id] > 0} // Disable button based on timer
            //   onClick={() => console.log('Meeting started!')}
            >
              Meet <FaPhone />
            </button>

            <>
            {timers[appointment.id] > 0 ? (
              <p className='text-gray-500 text-sm'>Meeting starts in {timers[appointment.id]}s</p>
            ) : (
              <p className='text-gray-500 text-sm'>Ready to meet</p>
            )}

            </>
</div>
            {/* Display Countdown Timer */}

           
          </div>
        ))}
      </div>
    </div>

            {/* Appointments Section */}
            <div className='my-6'>
                <h2 className='px-5 text-xl font-semibold text-gray-600 flex items-center gap-3'>Onsite Appointments  <div className='bg-red-500 animate-ping w-2 h-2 rounded-full'></div></h2>
                <div className=' flex-wrap gap-4 p-3 grid grid-cols-2'>
                    {appointments2.map((appointment) => (
                        <div key={appointment.id} className='bg-white flex-1 rounded-lg shadow-lg p-4 flex gap-3 justify-between'>
                            <div>

                                {appointment.clinic &&
                                    <h3 className='text-gray-800 font-semibold'>{appointment.clinic}</h3>
                                }
                                {appointment.address &&
                                    <h3 className='text-gray-800 '>{appointment.address}</h3>
                                }
                                <h3 className='text-gray-800 '>{appointment.doctor}</h3>
                                <h3 className='text-gray-800 '>{appointment.mode}</h3>
                                <p className='text-gray-600'>{appointment.date} at {appointment.time}</p>
                                <p className={`text-sm ${appointment.status === 'Pending Payment' ? 'text-red-500' : 'text-green-500'}`}>{appointment.status}</p>
                            </div>

                            <div className='w-52 h-full '>
                                <LiveMap />
                            </div>
                        </div>

                    ))}
                </div>
            </div>

            <hr />
            {/* Reports Section */}
            <div className='my-6'>
                <h2 className='px-5 text-xl font-semibold text-gray-600 flex gap-4 items-center'>My Reports <FaFileCirclePlus className='text-red-500' /></h2>
                <div className='flex flex-wrap gap-4 p-3'>

                    {reports.map((report) => (
                        <div key={report.id} className='bg-white flex-1 rounded-lg shadow-lg p-4'>


                            <h3 className='text-gray-800 font-semibold'>{report.title}</h3>
                            <p className='text-gray-600'>Appointment : 9th Aug 2024</p>
                            <p className='text-gray-600'>Type : Physical ( on Clinic )</p>
                            <p className='text-gray-600'>Issued by {report.doctor} on {report.date}</p>
                            <br />
                            <a href={report.link} className='text-blue-500 hover:underline'>Download Report</a>
                            <Link href={''} className='text-green-500 font-semibold hover:underline mx-4'>Prescription</Link>
                            <Link to={"/patient/summarise"} className=' hover:bg-indigo-700 bg-indigo-500 px-3 text-white rounded-full py-1 mx-5'>Ask Ai Summarizer</Link>

                        </div>
                    ))}
                </div>
            </div>

            <hr />
            {/* Pending Payments Section */}
            <div className='my-6'>
                <h2 className='px-5 text-2xl font-semibold text-gray-600'>Pending Payments</h2>
                <div className='bg-white rounded-lg shadow-lg p-4'>
                    <p className='text-gray-600'>You have pending payments totaling <span className='font-bold text-gray-900'>₹9,500</span>.</p>
                    <button onClick={checkoutHandler} className='bg-blue-500 text-white px-4 py-2 rounded-md mt-3'>Pay Now</button>
                </div>
            </div>
        </div>
    );
};

export default PDashboard;
