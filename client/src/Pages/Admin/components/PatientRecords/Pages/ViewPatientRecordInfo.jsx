import React from 'react';
import { useLocation } from 'react-router-dom';

const ViewPatientRecordInfo = () => {
    const {state} = useLocation();
    console.log(state)
    const {patient,prescriptions} = state;
   
    return (
        <div className='pb-10'>

            {/* patient info */}
            <div className=''>

                {/* Personal */}
                <div className='flex gap-5 flex-wrap'>

                    {/* image */}
                    <div className='w-fit md:p-5'>
                        <img src="https://preview.redd.it/created-random-people-using-chatgpt-midjourney-do-you-know-v0-q1aa450i5dqb1.png?width=1024&format=png&auto=webp&s=c4e9abc47d193474a2fa1a7e337d9d9340dce947" alt=""
                            className='object-cover rounded-xl shadow-md h-[300px] p-2' />
                    </div>
                    <div className='md:p-5 my-4'>
                        <h1 className='text-xl text-gray-700 font-bold'>{patient?.fullName}</h1>
                        <p className='text-lg'>Email : {patient?.email}</p>
                        <p className='text-lg'>Contact : +91 {patient?.mobileNo}</p>
                        <p className='text-lg'>Age : {patient?.age}</p>

                    </div>
                </div>

                {/* Contact and Address */}
                {/* <div className='md:p-5'>
                    <p className='text-lg'>Shared Reports : 2</p>
                    <p className='text-lg'>Address : BRS Nagar, Ludhiana, Punjab</p>
                    <p className='text-lg'>Total Visits : 3</p>
                    <p className='text-lg'>Online Consultation : 2</p>
                </div> */}

            </div>

          

            {/* Regular record */}
            <div className="overflow-scroll my-10" style={{ scrollbarWidth: 'none' }}>
                <h2 className="text-lg text-gray-700 my-2">Regular Records</h2>
                <div className="grid grid-cols-5 place-items-center bg-blue-700 text-white">
                 
                    <div className="p-2">
                        Medication Name
                    </div>
                    <div className="p-2">
                        Clinic
                    </div>
                    <div className="p-2">
                        Report (if any)
                    </div>
                    <div className="p-2">
                        Visit Type 
                    </div>
                    <div className="p-2">
                        Fee
                    </div>
                </div>
                {prescriptions?.map((record) => (
                    <div key={record._id} className="grid grid-cols-5 place-items-center bg-white text-gray-800">
                        <div className="p-2">
                            {record?.medication.name}
                        </div>
                        <div className="p-2">
                            {record.clinicId.clinicName}
                        </div>
                        <div className="p-2">
                          <a href={record.report[0]} className='text-blue-600 cursor-pointer'> {record.report[0]? "View" :'No Report'}</a> 
                        </div>
                        <div className="p-2">
                            {'onsite'}
                        </div>
                        <div className="p-2">
                            {200}Rs
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default ViewPatientRecordInfo;
