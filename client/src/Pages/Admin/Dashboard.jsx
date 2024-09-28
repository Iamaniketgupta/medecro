import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { FaChartSimple, FaRankingStar, FaUserDoctor } from 'react-icons/fa6';
import { FaPenSquare } from 'react-icons/fa';
import LiveAppointments from './components/Dashboard/LiveAppointments';
import OneonOne from './components/Dashboard/OneonOne';
import AddClinic from './components/Dashboard/AddClinic';
import axiosInstance from '../../axiosConfig/axiosConfig';
import { useSelector } from 'react-redux';
import { useRecoilState } from 'recoil';
import { allClinics } from '../../atom/states';
// import { useRecoilState } from 'recoil';
// import { userData } from '../atom/states';

const Dashboard = () => {
    // const [currentUser, setCurrentUser] = useRecoilState(userData);
    const [clinics, setclinics] = useState([]);
    const [patients, setpatients] = useState([]);
    const [reviews, setreviews] = useState([]);
    const [open,setopen]= useState(false);
    const [appointments, setappointments] = useState([]);
    const [virtualAppointments, setvirtualAppointments] = useState([])
    const [liveAppointments, setliveAppointments] = useState([]);
    const [liveVirtualAppointments, setliveVirtualAppointments] = useState([])
    
    
    const user = useSelector(state=>state.auth.user);
    const [Theclinics,setAllClincs] = useRecoilState(allClinics);
    

    const fetchClinics =async()=>{
        try {
            const res = await axiosInstance.get(`/clinic/getClinicByDoctorId/${user?._id}`);
            if(res.data){
                
                setclinics(res.data.data);
                setAllClincs(res.data.data);
                // console.log("dadadad",Theclinics)
            }
            
        } catch (error) {
            console.log(error.message);
        }
    }

    const fetchPatients =async()=>{
        try {
            const res = await axiosInstance.get(`/doctor/patients`);
            if(res.data){
                
                setpatients(res.data.data);
            }
            
        } catch (error) {
            console.log(error.message);
        }
    }


    const fetchReviews =async()=>{
        try {
            const res = await axiosInstance.get(`/review/${user?._id}`);
            if(res.data){
                setreviews(res.data);
            }
            
        } catch (error) {
            console.log(error.message);
        }
    }

    const fetchAppointments=async()=>{
        try {
            const res = await axiosInstance.get(`/appointment/getUpcomingAppointments/doc/${user?._id}`);
            if(res.data){
                console.log("app : " , res.data)
                setappointments(res.data);
            }
            
        } catch (error) {
            console.log(error.message);
        }
    }

    function calculateAverage(reviews) {
        if (reviews === null || reviews?.length === 0) {
            return 0; // Avoid division by zero
        }
    
        // Sum the ratings of all reviews
        const sum = reviews.reduce((accumulator, current) => accumulator + current.rating, 0);
        const average = sum / reviews?.length; // Calculate the average
        return average;
    }

    

    const fetchVirtualAppointments = async()=>{
        try {
            const res = await axiosInstance.get(`/virtualAppointment/getUpcomingAppointments/doc/${user?._id}`);
            console.log(" res : "  ,res)
            if(res.data){
                console.log(" : " , res.data)
                setvirtualAppointments(res.data);
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    const fetchLiveAppointments = async()=>{
        try {
            const res = await axiosInstance(`/appointment/getRecentlyPassedAppointmentsByDoctorId/${user._id}`);
            if(res.data){
                console.log("live appointmnts : " , res.data);
                setliveAppointments(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchLiveVirtualAppointments = async()=>{
        try {
            const res= await axiosInstance(`/virtualAppointment/getRecentlyPassedAppointments/${user._id}`);
            if(res.data){
                console.log("virtual live appintments : " , res.data)
                setliveVirtualAppointments(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const statsTabs = [
        {
            id: 1,
            title: "Total patients",
            value: patients?.length,
            icon: <FaUserDoctor className='' />

        },
        {
            id: 2,
            title: "Active Appointments",
            value: appointments?.length,
            icon: <FaChartSimple />
        },
        {
            id: 3,
            title: "Rating",
            value: calculateAverage(reviews),
            icon: <FaRankingStar />

        },
        {
            id: 4,
            title: "Total Reviews",
            value: reviews?.length,
            icon: <FaPenSquare />

        },
    ]
    
    useEffect(() => {
        
        fetchClinics()
        fetchPatients()
        fetchReviews()
        fetchAppointments()
        fetchVirtualAppointments();
        fetchLiveAppointments();
        fetchLiveVirtualAppointments();
        
    }, [user])
    


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

            {/* Clinics */}
                <div className='flex gap-1 items-center'>
                    <h2 className='px-5 my-4 text-2xl font-semibold text-gray-600'>My Clinics</h2>
                    <p>{clinics?.length}/2</p>
                    <button onClick={() => setopen(true)} disabled={clinics?.length === 2}  className={`bg-blue-500 opacity-${clinics?.length === 2 ? 50 : 100} px-4 py-1 rounded-md text-white font-semibold  mx-4`}>Add Clinic</button>
                </div>
                <div className='flex flex-wrap gap-4 p-3'>
                    {
                        clinics.map((i) =>
                            <div key={i._id} className='bg-white min-w-fit hover:bg-gray-50 cursor-pointer flex-1 max-w-[500px] rounded-lg shadow-lg flex min-w-46  p-4 md:w-[260px] w-[180px] py-5 justify-between gap-5  items-center'>
                                <img src={i.clinicImages[0]} className=' rounded-md w-20 md:w-40 h-32 object-cover' />
                                <div className='flex-grow'>
                                    <h3 className='text-gray-800  font-semibold'>{i.clinicName}</h3>
                                    <p className='  text-gray-900'>{i.address + " " + i.zipCode + " " + i.city + " " + i.state}</p>
                                    <p className='  text-gray-900'>{i.phoneNumber}</p>
                                </div>
                            </div>
                        )}
                </div>


            <div className='grid md:grid-cols-2 gap-10 my-4 px-3'>
                {/* Live Appointments */}
                <LiveAppointments upcomingAppointments={appointments} liveAppointments={liveAppointments}  />
                <OneonOne upcomingAppointments={virtualAppointments} liveAppointments={liveVirtualAppointments} />
            </div>

            <AddClinic open={open} onClose={() => setopen(false)} />

        </div >
    );
}

export default Dashboard;
