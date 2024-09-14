import React, { useState } from 'react';
import { FaEye, FaRegEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axiosInstance from '../../axiosConfig/axiosConfig';
import Otp from './VerifyOtp';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobileNo: '',
        age: '',
    });
    const [otpsent, setOtpSent] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Client-side validation
        const { name, email, password, mobileNo, age } = formData;
        if (!name || !email || !password || !mobileNo || !age) {
            toast.error("All fields are required");
            return;
        }

        try {
            setLoading(true);

            const response = await axiosInstance.post(`/users/register`, formData);
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
        <div className='overflow-hidden'>
            <div className='p-2 my-5'>
                <div className='text-gray-800 max-w-xl mx-auto p-5 shadow-lg rounded-lg'>
                    {!otpsent ? (
                        <>
                            <h1 className='text-center text-2xl md:text-3xl mb-8 font-semibold text-gray-800'>Join Our Community</h1>
                            <form className='space-y-4' onSubmit={handleSubmit}>
                                <div className='space-y-2'>
                                    <label htmlFor="name" className='block text-sm px-2 font-medium text-gray-700'>
                                        Full Name <span className='text-red-500'>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        className='outline-none border-b px-4 py-2 text-gray-900 w-full'
                                        name="name"
                                        id="name"
                                        required
                                        placeholder='Full Name'
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className='space-y-2'>
                                    <label htmlFor="email" className='block text-sm px-2 font-medium text-gray-700'>
                                        Email <span className='text-red-500'>*</span>
                                    </label>
                                    <input
                                        type="email"
                                        autoComplete="off"
                                        className='outline-none border-b px-4 py-2 text-gray-900 w-full'
                                        name="email"
                                        id="email"
                                        required
                                        placeholder='Email'
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className='flex flex-col md:flex-row md:space-x-4 mb-4'>
                                    <div className='flex-1 space-y-2'>
                                        <label htmlFor="mobileNo" className='block text-sm px-2 font-medium text-gray-700'>
                                            Mobile No <span className='text-red-500'>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            autoComplete="off"
                                            className='outline-none border-b px-4 py-2 text-gray-900 w-full'
                                            name="mobileNo"
                                            id="mobileNo"
                                            required
                                            placeholder='Mobile No'
                                            value={formData.mobileNo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className='flex-1 space-y-2'>
                                        <label htmlFor="age" className='block text-sm px-2 font-medium text-gray-700'>
                                            Age <span className='text-red-500'>*</span>
                                        </label>
                                        <input
                                            type="number"
                                            autoComplete="off"
                                            className='outline-none border-b px-4 py-2 text-gray-900 w-full'
                                            name="age"
                                            id="age"
                                            required
                                            placeholder='Age'
                                            value={formData.age}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className='space-y-2 relative mb-4'>
                                    <label htmlFor="password" className='block text-sm px-2 font-medium text-gray-700'>
                                        Password <span className='text-red-500'>*</span>
                                    </label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="off"
                                        className='outline-none border-b px-4 py-2 text-gray-900 w-full'
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

                                <button
                                    type='submit'
                                    className='bg-blue-500 hover:bg-blue-400 font-semibold px-4 py-2 rounded w-full text-white flex items-center justify-center'
                                >
                                    {loading ? (
                                        <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.832 3 8.071l3-2.78z"></path>
                                        </svg>
                                    ) : (
                                        'Sign Up'
                                    )}
                                </button>

                                <div className='text-center mt-4'>
                                    Already have an account?{' '}
                                    <Link to="/login" className='text-blue-500'>
                                        login{' '}
                                    </Link>
                                </div>

                                <div className='text-center mt-4'>
                                    <Link to="/doc/Singup" className='text-blue-500'>
                                        Join as a Doctor?{' '}
                                    </Link>
                                </div>
                            </form>
                        </>
                    ) : (
                        <Otp formData={formData} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SignUp;
