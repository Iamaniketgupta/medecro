import React from 'react';
import { Link } from 'react-router-dom';
import SearchInput from '../Admin/components/Dashboard/SearchInput';

const reports = [
    {
        id: 1,
        title: 'Report on Diabetes Management',
        issuer: 'Health Clinic',
        appointmentDate: '2024-09-01',
        mode: 'In-Person',
        doctor: 'Dr. John Doe',
        clinic: 'Healthy Life Clinic',
        prescription: 'Insulin Therapy'
    },
    {
        id: 2,
        title: 'Report on Hypertension',
        issuer: 'Medical Center',
        appointmentDate: '2024-08-25',
        mode: 'Telemedicine',
        doctor: 'Dr. Jane Smith',
        clinic: 'Cardio Care Center',
        prescription: 'Blood Pressure Medication'
    },
    // Add more reports as needed
];

const Reports = () => {
    return (
        <div className='relative pb-10  min-h-screen'>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">My Reports</h1>

            <SearchInput/>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-2 gap-6'>
                {reports.map(report => (
                    <Link to={'/patient/report/123'} key={report.id} className='bg-white rounded-lg shadow-md p-3 hover:bg-gray-50 border border-blue-700 cursor-pointer'>
                        <h2 className='text-xl font-semibold text-gray-900 '>{report.title}</h2>


                        <p className='text-gray-600 '><strong>Issuer:</strong> {report.issuer}</p>
                        <p className='text-gray-600 '><strong>Appointment Date:</strong> {report.appointmentDate}</p>
                        <p className='text-gray-600 '><strong>Clinic:</strong> {report.clinic}</p>
                        <p className='text-gray-600 '><strong>Mode:</strong> {report.mode}</p>

                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Reports;
