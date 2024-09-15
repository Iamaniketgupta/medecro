import React from 'react';
import SearchInput from './components/Dashboard/SearchInput';
import FilterChecklist from './components/PatientRecords/filter';
import { Link } from 'react-router-dom';

const PatientsRecords = () => {
    const demoRecords = [
        { id: 1, name: 'Vivek Sharma', age: 23, gender: 'Male', image: 'https://preview.redd.it/created-random-people-using-chatgpt-midjourney-do-you-know-v0-q1aa450i5dqb1.png?width=1024&format=png&auto=webp&s=c4e9abc47d193474a2fa1a7e337d9d9340dce947' },
        { id: 2, name: 'Priya Gupta', age: 29, gender: 'Female', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
        { id: 3, name: 'Ravi Verma', age: 34, gender: 'Male', image: 'https://randomuser.me/api/portraits/men/3.jpg' },

    ];
    const demoData2 = [
        { id: 4, name: 'Shalini Mehta', age: 41, gender: 'Female', image: 'https://randomuser.me/api/portraits/women/4.jpg' },
        { id: 5, name: 'Kiran Desai', age: 25, gender: 'Female', image: 'https://randomuser.me/api/portraits/women/5.jpg' },
        { id: 6, name: 'Rajesh Kumar', age: 50, gender: 'Male', image: 'https://randomuser.me/api/portraits/men/6.jpg' },
        { id: 7, name: 'Anita Singh', age: 33, gender: 'Female', image: 'https://randomuser.me/api/portraits/women/6.jpg' },
        { id: 8, name: 'Ajay Nair', age: 27, gender: 'Male', image: 'https://randomuser.me/api/portraits/men/7.jpg' },
        { id: 9, name: 'Meena Joshi', age: 42, gender: 'Female', image: 'https://randomuser.me/api/portraits/women/7.jpg' },
        { id: 10, name: 'Suresh Patel', age: 39, gender: 'Male', image: 'https://randomuser.me/api/portraits/men/8.jpg' },
    ];

const _id = 313;
    return (
        <div className='relative pb-10'>
            <h1 className="md:text-2xl text-lg max-sm:px-3 font-semibold mb-5  opacity-70">Patient Records</h1>

            <SearchInput placeholder={'Search Patient'} />

            <div>
                <h2 className=" px-4 text-lg max-sm:px-3 font-semibold mb-5  opacity-70">Recently Added Records</h2>
                <div className=' items-center gap-5 grid md:grid-cols-2 lg:grid-cols-4'>
                    {
                        demoRecords?.map((i) => {
                            return <Link to={`/clinic/records/patient/${_id }`} key={i.id} className='flex-grow cursor-pointer hover:bg-gray-50 max-w-[350px] border border-blue-700 p-3 flex gap-4 shadow-lg rounded-xl'>
                                <img src={i.image} alt="" className='w-16  h-16 rounded-full  object-cover ' />
                                <div className=' text-sm font-semibold text-gray-800'>
                                    <p className='text-lg'>  {i.name}</p>
                                    <p>Age : {i.age}</p>
                                    <p>Gender : {i.gender}</p>

                                </div>
                            </Link>
                        })
                    }
                </div>
            </div>

            <br />

            <hr />
            <br />

            <div>
                <h2 className=" px-4 text-lg max-sm:px-3 font-semibold mb-5  opacity-70">All Patients Records</h2>

                <div className='my-3 p-1  items-center flex flex-wrap gap-6 px-4'>
                    <select name="" id="" className='text-gray-800 w-52 font-semibold rounded bg-gray-100 p-2'>
                        <option value="">Sort By</option>
                        <option value="date">Date</option>
                        <option value="name">Name</option>
                    </select>

                    <FilterChecklist/>
                </div>
                <div className=' items-center gap-5 grid md:grid-cols-2 lg:grid-cols-4'>
                    {
                        demoData2?.map((i) => {
                            return <Link to={`/clinic/records/patient/${_id }`}key={i.id} className='flex-grow  cursor-pointer hover:bg-gray-50 max-w-[350px] border border-blue-700 p-3 flex gap-4 shadow-lg rounded-xl'>
                                <img src={i.image} alt="" className='w-16  h-16 rounded-full  object-cover ' />
                                <div className=' text-sm font-semibold text-gray-800'>
                                    <p className='text-lg'>  {i.name}</p>
                                    <p>Age : {i.age}</p>
                                    <p>Gender : {i.gender}</p>

                                </div>
                            </Link>
                        })
                    }
                </div>
            </div>

<button className='bg-blue-700 hover:bg-blue-500 text-bold block mx-auto my-10 px-4 py-2 w-[150px] rounded-md shadow-sm text-white'>More</button>

        </div >
    );
}

export default PatientsRecords;
