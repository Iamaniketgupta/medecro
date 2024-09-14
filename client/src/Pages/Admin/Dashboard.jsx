import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { useRecoilState } from 'recoil';
import { userData } from '../atom/states';

const Dashboard = () => {
    const [currentUser, setCurrentUser] = useRecoilState(userData);



    const statsTabs = [
        {
            id: 1,
            title: "Total Stories",
            value: "50",
        },
        {
            id: 2,
            title: "Total Views",
            value: "50",
        },
        {
            id: 3,
            title: "Total Likes",
            value: "50",
        },
        {
            id: 4,
            title: "Comments",
            value: "50",
        },
    ]
    return (
        <div className='relative'>
            <h1 className="md:text-2xl text-lg max-sm:px-3 font-semibold mb-5  opacity-70">Dashboard</h1>

            <div className='flex justify-around flex-wrap gap-4 p-3'>
                {
                    statsTabs.map((i) =>
                        <div key={i.id} className='bg-white flex-1 rounded-lg shadow-lg flex min-w-46  p-4 md:w-[260px] w-[180px] py-5 justify-between gap-5  items-center'>
                            <div className='flex-grow'>
                                <h3 className='text-gray-600  font-semibold'>{i.title}</h3>
                                <p className='md:text-3xl text-xl font-bold text-gray-900'>{i.value}</p>
                            </div>
                            <div className='bg-gradient-to-r p-1 rounded-md from-blue-500 to-blue-800'>
                                {i?.icon}
                            </div>
                        </div>
                    )}
            </div>

        </div >
    );
}

export default Dashboard;
