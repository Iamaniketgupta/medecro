import React from 'react';
import SideBar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './PDashboard';

const PAdminPanel = ({children}) => {

    return (
     
      <div className="flex">
      <SideBar />
      {/* outer wrapper */}
      <div className='flex flex-col flex-1 overflow-y-auto  h-screen'>
        <Header />

        {/* Main page container */}
        <div className=" bg-white h-full max-sm:pt-4 max-sm:px-1 max-md:p-5 p-7">

          {children}

        </div>


      </div>

    </div>
    );
}

export default PAdminPanel;
