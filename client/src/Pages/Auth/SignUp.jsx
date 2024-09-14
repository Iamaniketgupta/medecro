import React, { useEffect, useState } from 'react';
import { FaEye, FaRegEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import GoogleButton from 'react-google-button'
import { Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
// import { googleLogout } from '@react-oauth/google';
import Navbar from '../Home/components/Navbar';
import axiosInstance from '../../axiosConfig/axiosConfig.js';
// import { userData } from '../atom/states';
// import { useRecoilState } from 'recoil';
const SignUp = () => {

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        role: ''

    });
    const [user, setUser] = useState([]);
    // const [currUser, setCurrUser] = useRecoilState(userData);


    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    console.log(setUser)
    // console.log(currUser)


    const createUserAccount = async (userData) => {
        try {
            const response = await axiosInstance.post('/users/google-register', {
                fullName: userData.name,
                email: userData.email,
                googleId: userData.id,
            });

            if (response.status === 200) {
                toast.success("Account created successfully!");
                // setCurrUser(response.data)

            } else {
                toast.error("Failed to create account.");
            }
        } catch (error) {
            console.error('Error creating account:', error);
            toast.error("An error occurred. Please try again.");
        }
    };


    useEffect(
        () => {
            if (user) {
                user == [] ? console.log(user) : console.log("Empty user")
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then(async (res) => {
                        await createUserAccount(res.data);
                        // console.log("data assigned");
                    })
                    .catch((err) => console.log(err));
            }
        },
        [user]
    );

    // const logOut = () => {
    //     googleLogout();
    //     setProfile([]);
    // };



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
        try {
            setLoading(true);

            const response = await axiosInstance.post(`/users/register`, formData);
            if (response.status === 200) {
                setOtpSent(true);
                toast.success("🚀 OTP Sent on your Email");
            } else {
                // toast.error(error?.response?.data?.message || "Registration failed. Please try again.");
            }
            setLoading(false);

        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error(error?.response?.data?.message || "Failed to register. Please try again later.");
            setLoading(false);

        }
    };


    return (
        <div className=' overflow-hidden realtive'>
            <div className=''>
            <Navbar />
            </div>
            <div className='grid lg:grid-cols-2 overflow-clip'>
                {/* IMG */}

                <div className='min-h-full w-full overflow-hidden'>
                    <img src="https://static.vecteezy.com/system/resources/previews/001/991/652/non_2x/sign-in-page-flat-design-concept-illustration-icon-account-login-user-login-abstract-metaphor-can-use-for-landing-page-mobile-app-ui-posters-banners-free-vector.jpg"
                     alt="" className='object-cover h-full w-full '/>
                </div>


                {/* FORM */}
                <div className=' p-2 my-5 '>
                        <h1 className='text-center text-2xl md:text-3xl mb-8 font-semibold text-gray-800'>Easy Sign Up</h1>
                    <div className='text-gray-800 max-w-md mx-auto shadow-lg p-5  rounded-lg'>
                        {!otpsent ? (
                            <>


                                <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                                    {/* <div className='flex gap-5 items-center justify-between '> */}
                                    <div className='space-y-2'>
                                        <label htmlFor="name" className='block text-sm px-2 font-medium text-gray-700'>
                                            Full Name <span className='text-red-500'>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            autoComplete="off"
                                            className=' bg-gray-100 rounded-md  px-4 py-2 text-gray-900  w-full'
                                            name="fullName"
                                            id="name"
                                            required
                                            placeholder='Full Name'
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>


                                    <div className='space-y-2'>
                                        <label htmlFor="email" className='block text-sm px-2 font-medium text-gray-700'>
                                            Role <span className='text-red-500'>*</span>
                                        </label>

                                        <select
                                            name="role"
                                            required
                                            value={formData.role}
                                            onChange={handleChange}
                                            className=' bg-gray-100 rounded-md  px-4 py-2 text-gray-900  w-full'

                                        >
                                            <option value="">Select Role</option>
                                            <option value="author">Author</option>
                                            <option value="reader">Reader</option>
                                        </select>

                                    </div>

                                    <div className='space-y-2'>
                                        <label htmlFor="email" className='block text-sm px-2 font-medium text-gray-700'>
                                            Email <span className='text-red-500'>*</span>
                                        </label>
                                        <input
                                            type="email"
                                            autoComplete="off"
                                            className=' bg-gray-100 rounded-md  px-4 py-2 text-gray-900  w-full'
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
                                            className=' bg-gray-100 rounded-md  px-4 py-2 text-gray-900  w-full'
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
                                        typeof='submit'
                                        className='bg-blue-500 hover:bg-blue-400 font-semibold px-4 py-2 rounded   w-[95%] mx-auto text-white flex items-center justify-center'
                                    >
                                        {loading ? (
                                            <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : (
                                            'Register Now'
                                        )}
                                    </button>

                                    <hr />
                                    <div className='flex justify-center '>

                                        <GoogleButton
                                            className="w-full block"
                                            onClick={() => login()}
                                        />
                                    </div>

                                    <div className='text-center mt-5'>
                                        <p className='text-gray-700'>
                                            Already having an account?{' '}
                                            <Link to="/login" className='text-blue-500'>
                                                Login
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            </>
                        ) : (

                            <Otp formData={formData} setOtpSent={setOtpSent} />
                        )}
                    </div>
                </div>
            </div>


        </div>
    );
}

export default SignUp;
