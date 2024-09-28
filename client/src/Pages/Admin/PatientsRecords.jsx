import React, { useEffect, useState } from 'react';
import SearchInput from './components/Dashboard/SearchInput';
import FilterChecklist from './components/PatientRecords/filter';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axiosConfig/axiosConfig';
import { useSelector } from 'react-redux';
import { useRecoilState } from 'recoil';
import { allClinics } from '../../atom/states';

const PatientsRecords = () => {
    const user = useSelector(state => state.auth.user);
    const [clinicsData, setAllClinics] = useRecoilState(allClinics);
    const [allrecords, setAllRecords] = useState([]);
    const [tab, setTab] = useState(clinicsData[0]?._id); // Default to the first clinic's _id
    const [loading, setLoading] = useState(false);
    const [filteredData, setFilteredData] = useState([]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/prescription/patients/records/all/${tab}`);
            setAllRecords(response.data.data); // Assuming `patients` is the key in the response
            setFilteredData(response.data.data); // Set filtered data as well if you want to handle search/filter later
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
console.log(allrecords)
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
            <SearchInput placeholder={'Search Patient'} />

            <hr />
            <br />

            {/* Patients List */}
            <div>
                <h2 className="px-4 text-lg max-sm:px-3 font-semibold mb-5 opacity-70">All Patients Records</h2>

                {/* Sorting and Filters */}
                <div className='my-3 p-1 items-center flex flex-wrap gap-6 px-4'>
                    <select name="" id="" className='text-gray-800 w-52 font-semibold rounded bg-gray-100 p-2'>
                        <option value="">Sort By</option>
                        <option value="date">Date</option>
                        <option value="name">Name</option>
                    </select>

                    {/* <FilterChecklist /> */}
                </div>

                {/* Patient Records */}
                <div className='items-center gap-5 grid md:grid-cols-2 lg:grid-cols-4'>
                    {
                        loading ? (
                            <p>Loading...</p>
                        ) : (
                            allrecords?.map((i,idx) => (
                                <Link
                                    to={`/clinic/records/i.patient/${i.patient._id}`}
                                    key={idx}
                                    className='flex-grow cursor-pointer hover:bg-gray-50 max-w-[350px] border border-blue-700 p-3 flex gap-4 shadow-lg rounded-xl'
                                >
                                    <img src={i.patient.avatar || 'https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3408.jpg'} alt="i.patient Avatar" className='w-16 h-16 rounded-full object-cover' />
                                    <div className='text-sm font-semibold text-gray-800'>
                                        <p className='text-lg'>{i.patient.fullName}</p>
                                        <p>Age: {i.patient.age}</p>
                                        {/* <p>Gender: {patient.gender}</p> */}
                                    </div>
                                </Link>
                            ))
                        )
                    }
                </div>
            </div>

            {/* Load More Button */}
            {/* <button className='bg-blue-700 hover:bg-blue-500 text-bold block mx-auto my-10 px-4 py-2 w-[150px] rounded-md shadow-sm text-white'>
                More
            </button> */}

        </div>
    );
}

export default PatientsRecords;
