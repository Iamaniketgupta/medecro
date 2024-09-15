import React, { useState } from 'react';

import { FaEye, FaRegEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosConfig/axiosConfig';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

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
        try {
            setLoading(true);

            const response = await axiosInstance.post(`/users/login`, formData);
            if (response.status === 200) {
                // Assuming response.data contains user data and accessToken
                const { user, accessToken } = response.data?.data;
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("user", JSON.stringify(user));
                toast.success("🎉 Login Successful!");
                navigate("/patient/dashboard");
            } else {
                toast.error(error?.response?.data?.message || "Invalid Login. Please try again.");
            }
            setLoading(false);

        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error(error?.response?.data?.message || "Failed to login. Please try again.");
            setLoading(false);
        }
    };
    
    return (
        <div className='overflow-hidden'>
            
            <div className='p-2 my-10'>
                <div className='text-gray-800 max-w-xl mx-auto p-5 shadow-lg rounded-lg'>
                    <h1 className='text-center text-2xl md:text-3xl mb-8 font-semibold text-gray-800'>Welcome Back👋</h1>
                    <form className='flex flex-col gap-3' onSubmit={()=>{
                        navigate("/patient/dashboard")
                    }}>
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
                            className='bg-blue-500 hover:bg-blue-400 font-semibold px-4 py-2 rounded w-[95%] mx-auto text-white flex items-center justify-center'
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                'Log In'
                            )}
                        </button>

                        <div className='text-center mt-5'>
                            <p className='text-gray-700'>
                                Not having an account?{' '}
                                <Link to="/signup" className='text-blue-500'>
                                    Register
                                </Link>
                            </p>
                        </div>


                        <div className='text-center mt-5'>
                            <p className='text-gray-700'>
                                <Link to="/doc/login" className='text-blue-500'>
                                    
                                Login as a Doctor?{' '}
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
