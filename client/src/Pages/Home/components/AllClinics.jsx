import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

// Demo clinic data with random images
const demoClinics = [
    {
        name: 'SabarMati Clinic',
        address: '102 Sector near Jain Villa',
        city: 'Ahmedabad',
        state: 'Gujarat',
        zip: '380054',
        phone: '+91 9876543210',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjHqKynaNullSKL4t--MShwPxGSyDTM0nqiQ&s'
    },
    {
        name: 'Lotus Health Care',
        address: '45 Park Avenue',
        city: 'Mumbai',
        state: 'Maharashtra',
        zip: '400001',
        phone: '+91 9876543211',
        image: 'https://5.imimg.com/data5/HG/YA/MY-12789234/clinic-interior-designing-services-500x500.jpg'
    },
    {
        name: 'Green Valley Clinic',
        address: '99 Green Road',
        city: 'Bangalore',
        state: 'Karnataka',
        zip: '560001',
        phone: '+91 9876543212',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbzaGO_SVakDWEwvyexf1B_sftA8RAixYEWw&s'
    },
    {
        name: 'Sunshine Clinic',
        address: '28 Sunset Boulevard',
        city: 'Hyderabad',
        state: 'Telangana',
        zip: '500001',
        phone: '+91 9876543213',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2nu_zM83BA02Y4BV51Xx5wOBmOFv1V0c-Xg&s'
    },
    {
        name: 'Wellness Center',
        address: '89 Wellness Lane',
        city: 'Pune',
        state: 'Maharashtra',
        zip: '411001',
        phone: '+91 9876543214',
        image: 'https://www.practo.com/consumer-ui/_next/image?url=https%3A%2F%2Fimages1-fabric.practo.com%2Fpractices%2F1183469%2Fthe-family-doctor-bangalore-5ab4cbb5c36d0.JPG&w=256&q=100'
    },
    {
        name: 'Rainbow Clinic',
        address: '12 Color Street',
        city: 'Chennai',
        state: 'Tamil Nadu',
        zip: '600001',
        phone: '+91 9876543215',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6HDDHVicTbx08iqBmwtU74CBt7Kt2pKVl7A&s'
    },
    {
        name: 'Healing Touch Clinic',
        address: '56 Healing Road',
        city: 'Kolkata',
        state: 'West Bengal',
        zip: '700001',
        phone: '+91 9876543216',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk8fnBPAwhR5dBtE1PEwDfkDbLv2MU_Sz7Vg&s'
    },
    {
        name: 'Care Plus Clinic',
        address: '24 Care Lane',
        city: 'Jaipur',
        state: 'Rajasthan',
        zip: '302001',
        phone: '+91 9876543217',
        image: 'https://content.jdmagicbox.com/comp/ludhiana/y3/0161px161.x161.200130140358.n9y3/catalogue/dr-gupta-homeopathic-clinic-basti-jodhewal-ludhiana-homeopathic-clinics-sc1ep9epee.jpg'
    },
    {
        name: 'City Health Clinic',
        address: '39 Central Avenue',
        city: 'Delhi',
        state: 'Delhi',
        zip: '110001',
        phone: '+91 9876543218',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7pScl-HfzevLmn8oQjgeVsqOr4MnM5YDX-A&s'
    },
    {
        name: 'PrimeCare Clinic',
        address: '77 Prime Street',
        city: 'Lucknow',
        state: 'Uttar Pradesh',
        zip: '226001',
        phone: '+91 9876543219',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJHEctsPyHkyNienspA7tU9HMRNDHPDKgLIA&s'
    }
];

const AllClinics = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter clinics based on search term
    const filteredClinics = demoClinics.filter(clinic =>
        clinic.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="">
            <Navbar/>

            <div className='p-8'>

            <h1 className="text-3xl text-gray-600 font-semibold mb-6 text-center">All Clinics</h1>

            {/* Search Input */}
            <div className='flex items-center my-4 justify-between'>

            <input
                type="text"
                placeholder="Search clinics by name..."
                className="mb-6 p-3 border bg-gray-100 max-w-xl ouline-none rounded-full  w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />



            <select name="" className='w-[250px] p-2  bg-gray-50' id="">
                <option value="">Sort By</option>
                <option value="">Distance</option>
                <option value="">Fee</option>
            </select>
            </div>

            {/* Clinic Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredClinics.map((clinic, index) => (
                    <Link to={"/clinic/profile/211314378y17"} key={index} className="bg-white hover:bg-gray-50 shadow-lg rounded-lg overflow-hidden">
                        <img src={clinic.image} alt={clinic.name} className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-2">{clinic.name}</h2>
                            <p className="text-gray-700">{clinic.address}, {clinic.city}, {clinic.state} - {clinic.zip}</p>
                            <p className="text-gray-600 mt-2">Phone: {clinic.phone}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
        </div>

    );
};

export default AllClinics;
