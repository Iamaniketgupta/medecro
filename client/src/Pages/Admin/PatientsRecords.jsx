import React, { useEffect, useState } from 'react';
import SearchInput from './components/Dashboard/SearchInput';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axiosConfig/axiosConfig';
import { useSelector } from 'react-redux';
import { useRecoilState } from 'recoil';
import { allClinics } from '../../atom/states';
import { FaSearch } from 'react-icons/fa';

const PatientsRecords = () => {
    const user = useSelector(state => state.auth.user);
    const [clinicsData, setAllClinics] = useRecoilState(allClinics);
    const [allrecords, setAllRecords] = useState([]);
    const [tab, setTab] = useState(clinicsData[0]?._id); // Default to the first clinic's _id
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); // State for search input
    const [filteredData, setFilteredData] = useState([]); // State for filtered records

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/prescription/patients/records/all/${tab}`);
            setAllRecords(response.data.data); // Assuming `patients` is the key in the response
            setFilteredData(response.data.data); // Set filtered data as well for later use
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching patient records:", error);
        } finally {
            setLoading(false); // Set loading to false after fetching data
        }
    }

    useEffect(() => {
        if (tab) {
            fetchData();
        }
    }, [tab]);

    useEffect(() => {
        // Filter records based on the search term
        if (searchTerm) {
            const filtered = allrecords.filter(record =>
                record.patient.fullName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredData(filtered);
        } else {
            setFilteredData(allrecords); // Reset to all records if search term is empty
        }
    }, [searchTerm, allrecords]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); // Update search term state on input change
    };

    if (!tab) {
        return (
            <p>Kindly Add Clinic to Get Records</p>
        );
    }

    return (
        <div className='relative pb-10'>
            <h1 className="md:text-2xl text-lg max-sm:px-3 font-semibold mb-5 opacity-70">Patient Records</h1>

            {/* Clinic Selection */}
            <div className='my-4 flex items-center mb-5 gap-4'>
                {
                    clinicsData?.map((clinic) => (
                        <button
                            key={clinic._id}
                            onClick={() => setTab(clinic._id)}
                            className={`font-bold py-2 px-4 rounded-full 
                                ${tab === clinic._id ? 'bg-blue-500 text-sm text-white' : 'bg-white text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white'}`}
                        >
                            {clinic?.clinicName}
                        </button>
                    ))
                }
            </div>

            {/* Search and Filter */}
            <div className='flex items-center px-4 my-3 max-w-md rounded-full bg-gray-50 mx-4 gap-3'>
                <FaSearch className='text-gray-600' />
                <input 
                    onChange={handleSearchChange} // Use the new function here
                    type="text" 
                    placeholder="Search Patient" // Updated placeholder
                    className='outline-none bg-gray-50 p-2 w-full' 
                />
            </div>
            <hr />
            <br />

            {/* Patients List */}
            <div>
                <h2 className="px-4 text-lg max-sm:px-3 font-semibold mb-5 opacity-70">All Patients Records</h2>

                {/* Patient Records */}
                <div className='items-center gap-5 grid md:grid-cols-2 lg:grid-cols-4'>
                    {
                        loading ? (
                            <p>Loading...</p>
                        ) : (
                            filteredData.map((i, idx) => (
                                <Link
                                    to={`/clinic/records/patient/${i.patient._id}`}
                                    key={idx}
                                    state={i}
                                    className='flex-grow cursor-pointer hover:bg-gray-50 max-w-[350px] border border-blue-700 p-3 flex gap-4 shadow-lg rounded-xl'
                                >
                                    <img src={i.patient.avatar || 'https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3408.jpg'} alt="i.patient Avatar" className='w-16 h-16 rounded-full object-cover' />
                                    <div className='text-sm font-semibold text-gray-800'>
                                        <p className='text-lg'>{i.patient.fullName}</p>
                                        <p>Age: {i.patient.age}</p>
                                    </div>
                                </Link>
                            ))
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default PatientsRecords;
