import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdEditSquare } from "react-icons/md";
import axiosInstance from '../../../axiosConfig/axiosConfig';
import { login } from "../../../store/authSlice";
import UserUpdateModal from './UpdateModel'; // Modal component

const UserProfile = () => {
    const user = useSelector(state => state.auth.user);
    const ref = useRef();
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false); // Modal visibility state

    const handleProfilePic = async () => {
        const file = ref.current.files[0];
        const formData = new FormData();
        formData.append("avatar", file);

        try {
            const res = await axiosInstance.post("/users/avatar", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.data) {
                dispatch(login({ user: res.data.data, type: "user" }));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleModalToggle = () => {
        setShowModal(!showModal);
    };

    return (
        <div className='relative pb-10 px-5 max-w-6xl mx-auto'>
            <h1 className="md:text-2xl text-lg font-semibold mb-5 opacity-70">User Profile</h1>

            {/* Profile Info Section */}
            <div className="grid md:grid-cols-3 gap-10 my-10">
                <div className="col-span-1 bg-white shadow-lg rounded-lg p-5">
                    <div className="flex flex-col items-center">
                        <div className='relative'>
                            <img
                                src={user?.avatar || 'https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'}
                                alt="User Profile"
                                className="rounded-full w-32 h-32 object-cover shadow-md"
                            />
                            <div onClick={() => ref.current.click()} className='absolute cursor-pointer bottom-0 text-black right-2'>
                                <MdEditSquare size={30} className='text-white bg-black p-1 rounded-full' />
                            </div>
                            <input onChange={handleProfilePic} ref={ref} type="file" name="avatar" hidden />
                        </div>
                        <h2 className="text-xl font-bold text-gray-700 mt-4">{user?.fullName}</h2>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                        <p className="text-sm text-gray-500">{user?.mobileNo}</p>
                    </div>
                </div>

                {/* Middle Section - Personal Info */}
                <div className="col-span-2 bg-white shadow-lg rounded-lg p-5">
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-700">Personal Information</h3>
                        <div className="grid md:grid-cols-2 gap-6 mt-4">
                            <div>
                                <p className="text-sm text-gray-500">Age</p>
                                <p className="text-lg text-gray-700">{user?.age || "Not provided"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Emergency Contact</p>
                                <p className="text-lg text-gray-700">{user?.emergencyno || "Not provided"}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Associated Doctors</h3>
                        <ul className="list-disc ml-5 mt-4 text-gray-700">
                            {user?.doctors.length ? user.doctors.map((doctor, index) => (
                                <li key={index}>{doctor.name} - {doctor.speciality}</li>
                            )) : <p>No doctors associated</p>}
                        </ul>
                    </div>

                    {/* Edit Button to open modal */}
                    <button
                        onClick={handleModalToggle}
                        className="bg-blue-500 text-white px-4 py-2 mt-5 rounded-lg hover:bg-blue-600"
                    >
                        Edit Information
                    </button>
                </div>
            </div>

            {/* Modal for editing user info */}
            {showModal && <UserUpdateModal user={user} onClose={handleModalToggle} />}
        </div>
    );
};

export default UserProfile;
