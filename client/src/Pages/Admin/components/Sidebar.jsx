
import React, { useState } from 'react';
import { MdOutlineSettings } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import { FaChartLine } from "react-icons/fa6";
import { TbDrone } from "react-icons/tb";
import { FaRegFolder, FaSignOutAlt } from "react-icons/fa";

import { IoIosArrowDroprightCircle } from "react-icons/io";




import Cookies from 'universal-cookie';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { SidebarState, userData } from '../../atom/states';
const cookies = new Cookies(null, { path: '/' });

const SideBar = () => {
    
    const {pathname}= useLocation();
    const [currentUser,setCurrentUser] =useRecoilState(userData)
    console.log(currentUser)
    const [open,setOpen] =useRecoilState(SidebarState);
    const navlist = [
        {
            title: 'Dashboard',
            link: `/author/dashboard`,
            icon: <MdDashboard className='text-xl max-sm:text-sm' />
        },
        {
            title: 'Profile',
            link: `/author/profile`,
            icon: <CgProfile className='text-xl max-sm:text-sm' />
        },
    
        {
            title: 'Collabors',
            link: `/author/collabors`,
            icon: <FaChartLine className='text-xl max-sm:text-sm' />
        },
      
        // {
        //     title: 'Settings',
        //     link: `/pilot/settings/${currentUser?.fullName.toLowerCase().replace(" ","-")}`,
        //     icon: <MdOutlineSettings className='text-xl max-sm:text-sm' />
        // },
  
 
     
    ];
    
  
    return (
        <div className={` ${open ? "w-60" : "w-20 max-sm:w-12 max-md:w-14 "}  bg-gray-100 shadow-md h-screen relative p-2 lg:p-5 pt-8  duration-300`}>
            <IoIosArrowDroprightCircle
                className={`absolute max-md:hidden z-[1600] text-blue-400  cursor-pointer text-2xl  -right-3 top-9 w-7 
                  rounded-full ${!open && "rotate-180"}`}
                onClick={() => setOpen(!open)}
            />
            <div className="flex gap-x-4 items-center">
                <h1
                    className={`text-2xl text-blue-600 font-bold ${!open && "hidden"}`}
                >
                    Fiction Mania
                </h1>
                
            </div>
            <ul className="pt-6">
                {navlist.map((Menu, index) => (
                    <Link title={Menu.title} to={Menu.link} key={index} className={`flex my-1 rounded-md p-2 cursor-pointer hover:bg-blue-500 hover:text-white text-gray-800 items-center gap-x-4 
                          ${pathname === Menu.link ? "bg-blue-500 text-white" : "bg-none text-gray-800"}`}>
                        {Menu.icon}
                        <span className={`${!open && "hidden"} origin-left text-md duration-200`}>
                            {Menu.title}
                        </span>
                    </Link>
                ))}
            </ul>

            <div onClick={()=>{
            cookies.remove('auth')
            // router.push('/pilot/login')
        }

            } title='Sign out' className=' flex my-1 hover:bg-blue-500 hover:text-white inset-x-0 w-[80%] mx-auto rounded-md p-2 cursor-pointer  text-gray-800 items-center gap-x-4 
                          bottom-10 absolute'>
                <FaSignOutAlt className={`text-xl ${!open && "mx-auto"}`}/>
                <span className={`${!open && "hidden"} origin-left text-md duration-200`}>
                    Sign Out
                </span>

            </div>
        </div>
    );
}

export default SideBar;
