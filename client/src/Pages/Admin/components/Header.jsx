
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userData } from '../../../atom/states';
import { IoNotifications } from 'react-icons/io5';
import { useSelector } from 'react-redux';
// import { useRecoilState } from 'recoil';

const Header = () => {
    const user = useSelector(state=>state.auth.user);

    return (
        <div className='sticky top-0 z-50 shadow  bg-white' 
        >
            <div className=' p-5 flex gap-2 items-center  justify-end shadow-md h-14 '>
            {/* <IoNotifications className='text-2xl text-yellow-500'/> */}
            <div className='text-xs items-end flex flex-col'>
               
               <p className='font-semibold'>{user?.fullName || user?.name || 'name'}</p> 
               <p>{user?.email || ' Email'}</p> 
               </div>
               <div className='relative w-fit h-fit'>
                <img
                 src={user?.avatar || 'https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'} alt={user?.fullName}  className='w-10 h-10 object-cover rounded-full m-1 ring ring-green-500'/>
               </div>

            </div>

        </div>
    );
}

export default Header;
