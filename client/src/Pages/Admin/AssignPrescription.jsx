import React, { useEffect, useState } from 'react';
import AssignPrescriptionForm from './components/Prescriptions/AssignPrescForm';
import SearchInput from './components/Dashboard/SearchInput';
import { toast } from 'react-toastify';
import axiosInstance from '../../axiosConfig/axiosConfig';
import { Loader } from 'lucide-react';

const AssignPrescription = () => {
    const [loading, setLoading] = useState(false);
    const [allPatients, setAllPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [filteredPatients, setFilteredPatients] = useState(allPatients);


    const fetchPatientsHavingAppointment = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/prescription/getPatientsforPrescription');
            console.log(response)
            setAllPatients(response.data.appointments);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
        finally {
            setLoading(false);
        }
    }
    console.log(allPatients)

    useEffect(() => {
        fetchPatientsHavingAppointment();
    }, []);

    useEffect(()=>{
setFilteredPatients(allPatients);
    },[allPatients])
console.log(selectedPatient ,"dadadadad")
    return (
        <div className='relative pb-10'>
            <h1 className="md:text-2xl text-lg max-sm:px-3 font-semibold mb-5  opacity-70">Assign Prescription</h1>

            <div className='grid grid-cols-3'>
                <div className='col-span-2'>
                    <AssignPrescriptionForm selectedPatient={selectedPatient} />
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
                                                <div onClick={()=>setSelectedPatient(i)} key={i._id} className={`hover:bg-green-100  ${selectedPatient===i ? 'border-2 border-green-600 bg-green-100' :'bg-white'}  p-2 cursor-pointer hover:border-2 text-center w-32 h-32 rounded-lg hover:border-green-600 shadow-md `}>
                                                    <img src={i.userId.avatar || 'https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-260nw-2470054311.jpg'} alt="" className='w-14 block mx-auto h-14 rounded-full object-cover' />
                                                    <p className='text-sm font-semibold'>{i.userId.fullName}</p>
                                                    {/* <p className='text-xs'>{i.userId.gender}</p> */}
                                                    <p className='text-xs'>Age :{i.userId.age}</p>

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
