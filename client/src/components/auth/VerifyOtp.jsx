import React, { useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosConfig/axiosConfig';
// import { login } from '../../../store/authSlice';

const Otp = ({ setOtpSent,  formData  , type}) => {
    const [otpValue, setOtpValue] = useState('');

    
    
    const navigate = useNavigate();
    
    

    const verifyOTP = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post(`/users/verifyOtp`, {
                email: formData?.email,
                otp: otpValue
            });

            if (response.status === 200 || response.status === 201) {
                
                toast.success("🎉 OTP Verified Successfully!");
                console.log("respinse.data :",response.data)
                localStorage.setItem("accessToken" , response.data?.data?.accessToken);

                navigate("/patient/dashboard");
                // if(type === "user"){
                //     const obj = {
                //         user : response?.data?.data?.user,
                //         type :'user'
                //     }

                
                    // dispatch(login(obj));
            //     }else{
                    
            //         const obj = {
            //             user : response?.data?.data.newRagPicker,
            //             type:'ragpicker'
            //         }

            //         console.log("object : " , obj)
            //         dispatch(login(obj));
            //     }

            //     navigate(`/${type}/dashboard`)

            // } else {
            //     toast.error("Failed to verify OTP. Please try again.");
            // }
        }
    } catch (error) {
            console.error('Error verifying OTP:', error);
            toast.error(error||"Failed to verify OTP. Please try again later.");
        }
    };

    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const input3Ref = useRef(null);
    const input4Ref = useRef(null);

    const handleInput = (event, refToFocus, prevRef) => {
        const maxLength = parseInt(event.target.maxLength, 10);
        const currentLength = event.target.value.length;

        if (currentLength >= maxLength) {
            if (refToFocus && refToFocus.current) {
                refToFocus.current.focus();
            }
        }

        if (!event.target.value && event.nativeEvent.inputType === 'deleteContentBackward' && prevRef && prevRef.current) {
            prevRef.current.focus();
        }

        const newOtpValue = [
            input1Ref.current.value,
            input2Ref.current.value,
            input3Ref.current.value,
            input4Ref.current.value
        ].join('');

        setOtpValue(newOtpValue);
    };

    return (
        <div className="max-w-md mx-auto p-5 text-black">
            <div className="font-semibold text-3xl text-center mb-8">
                <p>Email Verification</p>
            </div>
            <div className="text-sm font-medium text-gray-400 mb-8">
                <p className='text-center'>We have sent a code to your email {formData?.email}</p>
                <p onClick={() => {
                    setOtpSent(false);
                    setOtpValue('');
                }} className='text-blue-500 my-2 text-center cursor-pointer font-semibold'>Change Email</p>
            </div>

            <form className="space-y-5" onSubmit={verifyOTP}>
                <div className="flex flex-row items-center justify-between mx-auto max-w-xs">
                    <input
                        ref={input1Ref}
                        className="w-16 h-16 flex items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name="otp1"
                        id="otp1"
                        maxLength="1"
                        required
                        onChange={(e) => handleInput(e, input2Ref, null)}
                    />
                    <input
                        ref={input2Ref}
                        className="w-16 h-16 flex items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name="otp2"
                        id="otp2"
                        maxLength="1"
                        required
                        onChange={(e) => handleInput(e, input3Ref, input1Ref)}
                    />
                    <input
                        ref={input3Ref}
                        className="w-16 h-16 flex items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name="otp3"
                        id="otp3"
                        maxLength="1"
                        required
                        onChange={(e) => handleInput(e, input4Ref, input2Ref)}
                    />
                    <input
                        ref={input4Ref}
                        className="w-16 h-16 flex items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name="otp4"
                        id="otp4"
                        maxLength="1"
                        required
                        onChange={(e) => handleInput(e, null, input3Ref)}
                    />
                </div>

                <div className="flex flex-col space-y-5">
                    <button
                        type="submit"
                        className="flex items-center justify-center w-full py-5 bg-blue-700 rounded-xl text-white text-sm shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 ring-blue-700"
                    >
                        Verify Account
                    </button>

                    <div className="flex items-center justify-center text-sm font-medium space-x-1 text-gray-500">
                        <p>Didn't receive code?</p>
                        <a className="text-blue-600" href="#" target="_blank" rel="noopener noreferrer">
                            Resend
                        </a>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Otp;
