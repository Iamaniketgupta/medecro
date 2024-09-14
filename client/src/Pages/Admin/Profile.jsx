import React from 'react';
import { useRecoilState } from 'recoil';
import { userData } from '../atom/states';

const Profile = () => {
    const [currentUser] = useRecoilState(userData);


    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-semibold text-blue-600 mb-6">Profile</h1>

            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex flex-col items-center">
                    <img 
                         src={currentUser?.avatar || 'https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'}
                        alt="Profile"
                        className="w-32  object-cover h-32 rounded-full border-4 border-blue-500 mb-4"
                    />
                    <h2 className="text-xl font-bold text-blue-700">{currentUser?.fullName}</h2>
                    <p className="text-md text-gray-600">{currentUser?.username}</p>
                    <p className="text-sm text-gray-500">{currentUser?.email}</p>
                    <p className="text-sm text-blue-500 mt-2 capitalize">{currentUser?.role}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
