// AppointmentDetails.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../axiosConfig/axiosConfig';
import { useSelector } from 'react-redux';
import { FaSpinner } from 'react-icons/fa'; // Import the spinner icon
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid'; // Correct import for uuid

const AppointmentDetails = () => {
    const [clinic, setclinic] = useState(null);
    const [slot, setslot] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const RAZORPAY_KEY='rzp_test_mrBW5J4OwVHwDY';
    const { clinicId, SlotId } = useParams();
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();

    const checkoutHandler = async () => {
        try {
        const instance = async () => {
            try {
                const response = await axiosInstance.post(`/create_order`,{amt:clinic?.doctor?.onsiteFee});
                return response.data.message;
            } catch (error) {
                console.log("error : ", error);
            }
        };

        const order = await instance();
        const key = RAZORPAY_KEY;
        const options = {
            key,
            amount: Math.ceil(order.amount / 100),
            currency: "INR",
            name: clinic?.doctor?.name,
            description: "RazorPay",
            order_id: order.id,
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#121212"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
        return true;
    } catch (error) {
            return false;
    }
    };

    const fetchClinicDetails = async () => {
        try {
            const res = await axiosInstance(`/clinic/getClinicById/${clinicId}`);
            if (res.data) {
                console.log(res.data);
                setclinic(res.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchSlot = async () => {
        try {
            const res = await axiosInstance(`/virtualSlot/slot/${SlotId}`);
            if (res.data) {
                console.log(res.data);
                setslot(res.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handlePayment = () => {
        if(checkoutHandler()){
        BookAppointment();
        }
    };

    const BookAppointment = async () => {
        try {
            setLoading(true)
            const userId = user._id;
            
            const roomId = uuidv4(); 
            console.log(roomId);
            const res = await axiosInstance.post(`/virtualAppointment`, {  slotId: SlotId, userId, doctorId: clinic.doctor._id, payment: clinic.doctor.onsiteFee , roomId });

            if (res.data) {
                console.log(res.data);
                toast.success("Appointment booked successfully. Redirecting to dashboard...");
                navigate(`/patient/dashboard`)
            }
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false)
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchClinicDetails();
            await fetchSlot();
            setLoading(false); // Set loading to false after fetching data
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <FaSpinner className="animate-spin text-4xl text-green-500" />
            </div>
        ); // Display loader while fetching data
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white border border-gray-300 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Appointment Details</h1>
                
                <div className="mb-4">
                    <p className="text-lg text-gray-700"><strong>Date:</strong> {slot?.date?.toString()?.slice(0, 10)}</p>
                    <p className="text-lg text-gray-700"><strong>Time Slot:</strong> {slot?.timeSlot}</p>
                </div>

                <div className="flex items-center mb-4">
                    <img src={clinic?.doctor?.avatar || "https://via.placeholder.com/150"} alt={clinic?.doctor?.name} className="w-20 h-20 rounded-full border-2 border-green-500 shadow-md mr-4" />
                    <p className="text-lg font-medium text-gray-800"><strong>Doctor:</strong> {clinic?.doctor?.name}</p>
                </div>

                <p className="text-lg text-gray-700 mb-4"><strong>Amount to Pay:</strong> <span className="text-xl font-bold text-green-600">₹{clinic?.doctor?.onsiteFee}</span></p>

                <button 
                    onClick={handlePayment} 
                    className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-200 transform hover:scale-105"
                >
                    Pay Now
                </button>
            </div>
        </div>
    );
};

export default AppointmentDetails;
