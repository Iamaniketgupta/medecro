import React, { useEffect } from 'react';
import { FaDownload } from 'react-icons/fa';
import { RiRobot2Fill } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosConfig/axiosConfig';
import { toast } from 'react-toastify';
import { useState } from 'react';

const ViewReport = () => {
  const { reportId } = useParams(); 
  const [report, setreport] = useState(null)
  
  const fetchReport = async()=>{
    try {
      const res = await axiosInstance(`/prescription/get/${reportId}`);
      if(res.data){
        
        console.log(res.data)
        setreport(res.data.prescription);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchReport();
  }, [])
  

  // Dummy data for demonstration
  // const report = {
  //   id: 1,
  //   title: 'Report on Diabetes Management',
  //   issuer: 'Health Clinic',
  //   appointmentDate: '2024-09-01',
  //   mode: 'In-Person',
  //   doctor: 'Dr. John Doe',
  //   clinic: 'Healthy Life Clinic',
  //   prescription: 'Insulin Therapy',
  //   documentUrl: 'path/to/report-doc.pdf' 
  // };

  return (
    <div className='p-6  min-h-screen'>
      <h1 className='text-3xl font-bold text-gray-800 mb-6'>{report?.title}</h1>
      <div className='bg-white rounded-lg shadow-md p-6'>
        <div className='space-y-4'>
          <p className='text-lg text-gray-700'><strong>Issuer:</strong> {report?.clinicId.clinicName}</p>
          <p className='text-lg text-gray-700'><strong>Mode:</strong> {report?.mode || "on-site"}</p>
          <p className='text-lg text-gray-700'><strong>Doctor:</strong> {report?.clinicId?.doctor?.name}</p>
          <p className='text-lg text-gray-700'><strong>Clinic:</strong> {report?.clinicId?.clinicName}</p>
          <p className='text-lg text-blue-700'><strong>Prescription:</strong> View</p>
        </div>
        <div className='mt-6 flex gap-4'>
          <a href={report?.report[0]} download className='bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-700 transition'>
            <FaDownload /> Download
          </a>
          <button className='bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-yellow-700 transition'>
            <RiRobot2Fill /> AI Summarize
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewReport;
