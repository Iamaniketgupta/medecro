import React, { useState } from 'react';
import { FaEye, FaRegEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axiosInstance from '../../axiosConfig/axiosConfig';
import Otp from './DocVerifyOtp';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        speciality: '',
        gender: '',
        virtualFee: '',
        onsiteFee: '',
    });
    const [otpsent, setOtpSent] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    console.log(formData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axiosInstance.post(`/doctor/register`, formData);
            if (response.status === 200) {
                setOtpSent(true);
                toast.success("🚀 OTP Sent to your Email");
            } else {
                toast.error(response?.data?.message || "Registration failed. Please try again.");
            }
            setLoading(false);
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error(error?.response?.data?.message || "Failed to register. Please try again later.");
            setLoading(false);
        }
    };

    return (
        <div className='overflow-hidden relative'>
            {/* Add Navbar component here if needed */}
            <div className='grid lg:grid-cols-2 overflow-clip'>
                {/* IMG */}
                <div className='min-h-full w-full overflow-hidden'>
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/001/991/652/non_2x/sign-in-page-flat-design-concept-illustration-icon-account-login-user-login-abstract-metaphor-can-use-for-landing-page-mobile-app-ui-posters-banners-free-vector.jpg"
                        alt="" className='object-cover h-full w-full' />
                </div>

                {/* FORM */}
                <div className='p-2 my-5'>
                    <div className='text-gray-800 max-w-md mx-auto shadow-lg p-5 rounded-lg'>
                        {!otpsent ? (
                            <>
                                <h1 className='text-center text-2xl md:text-3xl mb-8 font-semibold text-gray-800'>Join as Doctor 👨‍⚕️</h1>

                                <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                                    {/* Name */}
                                    <div className='space-y-2'>
                                        <label htmlFor="name" className='block text-sm px-2 font-medium text-gray-700'>
                                            Name <span className='text-red-500'>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            autoComplete="off"
                                            className='bg-gray-100 rounded-md px-4 py-2 text-gray-900 w-full'
                                            name="name"
                                            id="name"
                                            required
                                            placeholder='Name'
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className='space-y-2'>
                                        <label htmlFor="email" className='block text-sm px-2 font-medium text-gray-700'>
                                            Email <span className='text-red-500'>*</span>
                                        </label>
                                        <input
                                            type="email"
                                            autoComplete="off"
                                            className='bg-gray-100 rounded-md px-4 py-2 text-gray-900 w-full'
                                            name="email"
                                            id="email"
                                            required
                                            placeholder='Email'
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* Password */}
                                    <div className='space-y-2 relative'>
                                        <label htmlFor="password" className='block text-sm px-2 font-medium text-gray-700'>
                                            Password <span className='text-red-500'>*</span>
                                        </label>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            autoComplete="off"
                                            className='bg-gray-100 rounded-md px-4 py-2 text-gray-900 w-full'
                                            name="password"
                                            id="password"
                                            required
                                            placeholder='Password'
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                        <button
                                            type="button"
                                            className='absolute inset-y-0 right-3 top-5 flex items-center px-3 text-gray-700'
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <FaEye className='h-5 w-5' aria-hidden='true' />
                                            ) : (
                                                <FaRegEyeSlash className='h-5 w-5' aria-hidden='true' />
                                            )}
                                        </button>
                                    </div>

                                    {/* Speciality and Gender */}
                                    <div className='flex flex-col md:flex-row md:space-x-4 mb-4'>
                                        <div className='flex-1 space-y-2'>
                                            <label htmlFor="speciality" className='block text-sm px-2 font-medium text-gray-700'>
                                                Speciality <span className='text-red-500'>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                className='bg-gray-100 rounded-md px-4 py-2 text-gray-900 w-full'
                                                name="speciality"
                                                id="speciality"
                                                required
                                                placeholder='Speciality'
                                                value={formData.speciality}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className='flex-1 space-y-2'>
                                            <label htmlFor="gender" className='block text-sm px-2 font-medium text-gray-700'>
                                                Gender <span className='text-red-500'>*</span>
                                            </label>
                                            <select
                                                name="gender"
                                                required
                                                value={formData.gender}
                                                onChange={handleChange}
                                                className='bg-gray-100 rounded-md px-4 py-2 text-gray-900 w-full'
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Virtual Fee and Onsite Fee */}
                                    <div className='flex flex-col md:flex-row md:space-x-4 mb-4'>
                                        <div className='flex-1 space-y-2'>
                                            <label htmlFor="virtualFee" className='block text-sm px-2 font-medium text-gray-700'>
                                                Virtual Fee <span className='text-red-500'>*</span>
                                            </label>
                                            <input
                                                type="number"
                                                autoComplete="off"
                                                className='bg-gray-100 rounded-md px-4 py-2 text-gray-900 w-full'
                                                name="virtualFee"
                                                id="virtualFee"
                                                required
                                                placeholder='Virtual Fee'
                                                value={formData.virtualFee}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className='flex-1 space-y-2'>
                                            <label htmlFor="onsiteFee" className='block text-sm px-2 font-medium text-gray-700'>
                                                Onsite Fee <span className='text-red-500'>*</span>
                                            </label>
                                            <input
                                                type="number"
                                                autoComplete="off"
                                                className='bg-gray-100 rounded-md px-4 py-2 text-gray-900 w-full'
                                                name="onsiteFee"
                                                id="onsiteFee"
                                                required
                                                placeholder='Onsite Fee'
                                                value={formData.onsiteFee}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type='submit'
                                        className='bg-blue-500 hover:bg-blue-400 font-semibold px-4 py-2 rounded w-full text-white flex items-center justify-center'
                                    >
                                        {loading ? (
                                            <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                            </svg>
                                        ) : 'Sign Up'}
                                    </button>
                                </form>
                                <div className='mt-4 text-center text-gray-600'>
                                    Already have an account? <Link to='/login' className='text-blue-600 hover:underline'>Login</Link>
                                </div>
                            </>
                        ) : (
                            <Otp formData={formData} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
