import React, { useEffect, useState } from 'react';
import AssignPrescriptionForm from './components/Prescriptions/AssignPrescForm';
import SearchInput from './components/Dashboard/SearchInput';
import { toast } from 'react-toastify';
import axiosInstance from '../../axiosConfig/axiosConfig';
import { Loader } from 'lucide-react';

const AssignPrescription = () => {
    const [loading, setLoading] = useState(false);
    const [allPatients, setAllPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState(allPatients);

    // const demoData2 = [
    //     { id: 4, name: 'Shalini Mehta', age: 41, gender: 'Female', image: 'https://randomuser.me/api/portraits/women/4.jpg' },
    //     { id: 5, name: 'Kiran Desai', age: 25, gender: 'Female', image: 'https://randomuser.me/api/portraits/women/5.jpg' },
    //     { id: 6, name: 'Rajesh Kumar', age: 50, gender: 'Male', image: 'https://randomuser.me/api/portraits/men/6.jpg' },
    //     { id: 7, name: 'Anita Singh', age: 33, gender: 'Female', image: 'https://randomuser.me/api/portraits/women/6.jpg' },
    //     { id: 8, name: 'Ajay Nair', age: 27, gender: 'Male', image: 'https://randomuser.me/api/portraits/men/7.jpg' },
    //     { id: 9, name: 'Meena Joshi', age: 42, gender: 'Female', image: 'https://randomuser.me/api/portraits/women/7.jpg' },
    //     { id: 10, name: 'Suresh Patel', age: 39, gender: 'Male', image: 'https://randomuser.me/api/portraits/men/8.jpg' },
    // ];

    const fetchPatientsHavingAppointment = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/prescription/getPatientsforPrescription');
            console.log(response)
            setAllPatients(response.data);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPatientsHavingAppointment();
    }, []);


    return (
        <div className='relative pb-10'>
            <h1 className="md:text-2xl text-lg max-sm:px-3 font-semibold mb-5  opacity-70">Assign Prescription</h1>

            <div className='grid grid-cols-3'>
                <div className='col-span-2'>
                    <AssignPrescriptionForm selectedPatient={null} />
                </div>

                <div className='bg-gray-100  shadow-lg rounded-3xl min-h-screen'>

                    <h2 className='text-gray-800 font-semibold text-center my-5 text-lg'>Select Patient</h2>
                    <SearchInput data={allPatients} setData={setFilteredPatients} />
                    {!loading ?
                        <>
                            {
                                filteredPatients.length == 0 ? <div className=' w-full text-center mt-10 text-gray-700'>No Patient Found</div>
                                    :
                                    <div className='grid grid-cols-3 p-1 px-2  gap-3'>
                                        {
                                            filteredPatients?.map((i) =>
                                                <div key={i.id} className='hover:bg-green-100 bg-white p-2 cursor-pointer hover:border-2 text-center w-32 h-32 rounded-lg hover:border-green-600 shadow-md'>
                                                    <img src={i.image} alt="" className='w-12 block mx-auto h-12 rounded-full object-cover' />
                                                    <p className='text-sm font-semibold'>{i.name}</p>
                                                    <p className='text-xs'>{i.gender}</p>
                                                    <p className='text-xs'>Age :{i.age}</p>

                                                </div>
                                            )
                                        }
                                    </div>
                            }
                        </>
                        : <div className='flex justify-center mt-20 h-full'><Loader /></div>}
                </div>

            </div>
        </div >
    );
}

export default AssignPrescription;
