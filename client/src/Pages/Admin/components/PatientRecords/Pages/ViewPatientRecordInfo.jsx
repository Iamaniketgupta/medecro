import React from 'react';

const regularRecords = [
    { id: 1, date: '2024-08-23', time: '10:00 AM', prescription: 'Paracetamol, Vitamin C', visitType: 'Physical', feeCharged: '230' },
    { id: 2, date: '2024-07-15', time: '11:30 AM', prescription: 'Ibuprofen, Antibiotics', visitType: 'Online', feeCharged: '390' },
    { id: 3, date: '2024-06-05', time: '02:00 PM', prescription: 'Pain Relievers', visitType: 'Physical', feeCharged: '600' },
    { id: 4, date: '2024-05-20', time: '09:00 AM', prescription: 'Antibiotics', visitType: 'Online', feeCharged: '340' },
    { id: 5, date: '2024-04-10', time: '01:00 PM', prescription: 'Cough Syrup', visitType: 'Physical', feeCharged: '450' },
];

const ViewPatientRecordInfo = () => {
    return (
        <div className='pb-10'>

            {/* patient info */}
            <div className='grid md:grid-cols-2 '>

                {/* Personal */}
                <div className='grid md:grid-cols-2'>

                    {/* image */}
                    <div className='w-full md:p-5'>
                        <img src="https://preview.redd.it/created-random-people-using-chatgpt-midjourney-do-you-know-v0-q1aa450i5dqb1.png?width=1024&format=png&auto=webp&s=c4e9abc47d193474a2fa1a7e337d9d9340dce947" alt=""
                            className='object-cover rounded-xl shadow-md w-full h-full ' />
                    </div>
                    <div className='md:p-5 '>
                        <h1 className='text-2xl text-gray-700 font-bold'>Vivek Sharma</h1>
                        <p className='text-lg'>Email : viviek213@gmail.com</p>
                        <p className='text-lg'>Contact : +91 3149194010</p>
                        <p className='text-lg'>Age : 23</p>
                        <p className='text-lg'>Gender : Male</p>
                        <p className='text-lg'>Last Visited : 23rd Aug 2024 , 10:00 AM</p>

                    </div>
                </div>

                {/* Contact and Address */}
                <div className='md:p-5'>
                    <p className='text-lg'>Shared Reports : 2</p>
                    <p className='text-lg'>Address : BRS Nagar, Ludhiana, Punjab</p>
                    <p className='text-lg'>Total Visits : 3</p>
                    <p className='text-lg'>Online Consultation : 2</p>
                </div>

            </div>

            {/* shared reports record */}
            <div className="overflow-scroll my-10" style={{ scrollbarWidth: 'none' }}>
                <h2 className="text-lg text-gray-700 my-2">Shared Reports</h2>
                <div className="grid grid-cols-5 place-items-center bg-blue-700 text-white">
                    <div className="p-2">
                        Report Name
                    </div>
                    <div className="p-2">
                        Issuer
                    </div>
                    <div className="p-2">
                        Date of Issue
                    </div>
                    <div className="p-2">
                        Type
                    </div>
                    <div className="p-2">
                        Action
                    </div>
                </div>
                <div className="text-center p-5">
                    No Data Available
                </div>
            </div>

            {/* Regular record */}
            <div className="overflow-scroll my-10" style={{ scrollbarWidth: 'none' }}>
                <h2 className="text-lg text-gray-700 my-2">Regular Records</h2>
                <div className="grid grid-cols-5 place-items-center bg-blue-700 text-white">
                    <div className="p-2">
                        Date
                    </div>
                    <div className="p-2">
                        Time
                    </div>
                    <div className="p-2">
                        Prescription
                    </div>
                    <div className="p-2">
                        Visit Type
                    </div>
                    <div className="p-2">
                        Fee Charged (Rs)
                    </div>
                </div>
                {regularRecords.map((record) => (
                    <div key={record.id} className="grid grid-cols-5 place-items-center bg-white text-gray-800">
                        <div className="p-2">
                            {record.date}
                        </div>
                        <div className="p-2">
                            {record.time}
                        </div>
                        <div className="p-2">
                          <p className='text-blue-600 cursor-pointer'> {record.prescription}</p> 
                        </div>
                        <div className="p-2">
                            {record.visitType}
                        </div>
                        <div className="p-2">
                            {record.feeCharged}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default ViewPatientRecordInfo;
