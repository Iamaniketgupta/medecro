
import React, { useState } from 'react';
import { MdOutlineSettings } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import { FaChartLine, FaMessage, FaPersonCirclePlus } from "react-icons/fa6";
import { TbDrone } from "react-icons/tb";
import { FaFile, FaFolder, FaFolderOpen, FaRegFolder, FaSignOutAlt } from "react-icons/fa";

import { IoIosArrowDroprightCircle } from "react-icons/io";




import Cookies from 'universal-cookie';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { SidebarState, userData } from '../../../atom/states';
import { IoChatboxEllipses } from 'react-icons/io5';
const cookies = new Cookies(null, { path: '/' });

const SideBar = () => {
    
    const {pathname}= useLocation();
    const [currentUser,setCurrentUser] =useRecoilState(userData)
    const navigate = useNavigate();

    const [open,setOpen] =useRecoilState(SidebarState);
    const navlist = [
        {
            title: 'Dashboard',
            link: `/patient/dashboard`,
            icon: <MdDashboard className='text-xl max-sm:text-sm' />
        },
      
    
        {
            title: 'Patient Records',
            link: `/patient/reports`,
            icon: <FaFolderOpen className='text-xl max-sm:text-sm' />
        },
        {
            title: 'Chat and Calls',
            link: `/patient/chat`,
            icon: <IoChatboxEllipses className='text-xl max-sm:text-sm' />
        },
        // {
        //     title: 'Prescriptions',
        //     link: `/patient/prescription`,
        //     icon: <FaPersonCirclePlus className='text-xl max-sm:text-sm' />
        // },
      
      
 
     
    ];
    
  
    return (
        <div className={` ${open ? "w-60" : "w-20 max-sm:w-12 max-md:w-14 "}  bg-gray-100 shadow-md h-screen relative p-2 lg:p-5 pt-8  duration-300`}>
            <IoIosArrowDroprightCircle
                className={`absolute max-md:hidden z-[1600] text-blue-400  cursor-pointer text-2xl  -right-3 top-9 w-7 
                  rounded-full ${!open && "rotate-180"}`}
                onClick={() => setOpen(!open)}
            />
            <div className="flex gap-x-4 items-center" onClick={()=>{
                navigate("/")
            }} >
                <h1
                    className={`text-2xl text-blue-600 font-bold ${!open && "hidden"}`}
                >
                  🩺<span className='text-gray-700'>Clinic</span>  Net 
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
