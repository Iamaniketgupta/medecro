import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdEditSquare } from "react-icons/md";
import axiosInstance from '../../axiosConfig/axiosConfig';
import {login} from "../../store/authSlice"
import { useState } from 'react';
import UpdateDoctorModal from "./UpdateDoctorModal"
const DoctorProfile = () => {
    const user = useSelector(state=>state.auth.user);
    const ref= useRef();
    const dispatch = useDispatch();
    const [onlinrConsultations, setonlinrConsultations] = useState([]);
    const [patients, setpatients] = useState([]);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    
    const handleProfilePic = async()=>{
        const file = ref.current.files[0];
        const formData = new FormData();
        formData.append("avatar", file);
        try {
            const res = await axiosInstance.post("/doctor/avatar", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",    
                },
            });
            console.log(res)
            if(res.data){
                dispatch(login({user : res.data.data , type:"doctor"}));

                console.log( "res.data", res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchOnlineConsultations=async()=>{
        try {
            const res = await axiosInstance(`/virtualAppointment/doctor/${user._id}`);
            if(res.data){
                
                setonlinrConsultations(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fecthPatients=async()=>{
        try {
            const res = await axiosInstance(`/users/getPatientsByDoctorId/${user._id}`);
            if(res){
                console.log(res)
                setpatients(res.data.data);
            }
        } catch (error) {
            console.log(error)   
        }
    }


    const updateDoctorInfo = async (updatedInfo) => {
        try {
            const res = await axiosInstance.post(`/doctor/updateDoctor`, updatedInfo); // Adjust endpoint as necessary
            if (res.data) {
                dispatch(login({ user: res.data.data, type: "doctor" }));
                console.log("Doctor info updated:", res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchOnlineConsultations();
        fecthPatients()
    }, [])
    

    return (
        <div className='relative pb-10 px-5 max-w-6xl mx-auto'>
            {/* Header */}
            <h1 className="md:text-2xl text-lg max-sm:px-3 font-semibold mb-5 opacity-70">Doctor Profile</h1>

    {/* Patient Stats Section */}
    <div className="bg-white shadow-lg rounded-lg p-5 mt-10">
                <h3 className="text-lg font-semibold text-gray-700 mb-5"> Statistics</h3>
                <div className="grid md:grid-cols-4 gap-6">
                    <div className="flex flex-col items-center bg-blue-100 rounded-lg py-5">
                        <h4 className="text-2xl font-bold text-blue-700">{patients?.length}+</h4>
                        <p className="text-gray-500">Total Patients</p>
                    </div>
                    <div className="flex flex-col items-center bg-green-100 rounded-lg py-5">
                        <h4 className="text-2xl font-bold text-green-700">{onlinrConsultations?.length}+</h4>
                        <p className="text-gray-500">Online Consultations</p>
                    </div>
                    <div className="flex flex-col items-center bg-yellow-100 rounded-lg py-5">
                        <h4 className="text-2xl font-bold text-yellow-700">4.8/5</h4>
                        <p className="text-gray-500">Average Rating</p>
                    </div>
                    <div className="flex flex-col items-center bg-red-100 rounded-lg py-5">
                        <h4 className="text-2xl font-bold text-red-700">{user?.experience} Years</h4>
                        <p className="text-gray-500">Experience</p>
                    </div>
                </div>
            </div>
            {/* Profile Info Section */}
            <div className="grid md:grid-cols-3 gap-10 my-10">
                {/* Left Section - Profile Image and Basic Info */}
                <div className="col-span-1 bg-white shadow-lg rounded-lg p-5">
                    <div className="flex flex-col items-center">
                        <div className='relative'>
                            <img
                                src={user?.avatar || 'https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'}
                                alt="Doctor Profile"
                                className="rounded-full w-32 h-32 object-cover shadow-md"
                            />
                            <div onClick={()=>{
                                ref.current.click();
                            }}  className='absolute cursor-pointer bottom-0 text-black right-2 '>
                                <MdEditSquare size={30} className='text-white bg-black p-1 rounded-full' />
                            </div>
                            <input onChange={handleProfilePic} ref={ref} type="file" name="avatar" hidden id="" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-700 mt-4">Dr. {user?.name}</h2>
                        <p className="text-sm text-gray-500">{user?.speciality}</p>
                        <p className="text-sm text-gray-500">
                            {user?.degrees?.join(', ')}
                        </p>
                    {/* <p className="text-sm text-gray-500 mt-4">Phone</p> */}
                    <p className="text-sm text-gray-700"> {user?.phoneNumber}</p>
                    <p className="text-sm text-gray-500 mt-4">Email</p>
                    <p className="text-sm text-gray-700">{user?.email}</p>
                    </div>

                </div>

                {/* Middle Section - Personal & Professional Info */}
                <div className="col-span-2 bg-white shadow-lg rounded-lg p-5">
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-700">Personal Information</h3>
                        <div className="grid md:grid-cols-2 gap-6 mt-4">
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="text-lg text-gray-700">{user?.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Contact</p>
                                <p className="text-lg text-gray-700">+91 3149194010</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Age</p>
                                <p className="text-lg text-gray-700">{user?.age || 31}</p>
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
                                <p className="text-lg text-gray-700">{user?.experience} years</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Specialization</p>
                                <p className="text-lg text-gray-700">{user?.speciality}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total Patients</p>
                                <p className="text-lg text-gray-700">{patients?.length}+</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Online Consultations</p>
                                <p className="text-lg text-gray-700">{onlinrConsultations?.length}+</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Qualifications</h3>
                        <ul className="list-disc ml-5 mt-4 text-gray-700">
                            {user?.degrees?.map((degree, index) => (
                                <li key={index}>{degree}</li>
                            ))}
                            {user?.degrees && user?.degrees.length === 0 && <p>No degrees added</p>}
                        </ul>
                    </div>
                    
                </div>
            </div>

            <div className="text-right">
                <button
                    onClick={() => setModalIsOpen(true)}
                    className="bg-blue-500 text-white rounded px-4 py-2"
                >
                    Edit Information
                </button>
            </div>

            <UpdateDoctorModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                doctorInfo={user}
                onUpdate={updateDoctorInfo}
            />

           

        
        </div>
    );
};

export default DoctorProfile;
