import Navbar from "../Home/components/Navbar";
import Rating from "./components/Rating";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { IoLocation } from "react-icons/io5";
import { FaClock, FaPhone } from "react-icons/fa";
import { Clock, LucideStethoscope } from "lucide-react";
import ReviewSection from "./components/ReviewSection";
import { FaUserDoctor } from "react-icons/fa6";
import LiveMap from "../../Map/LiveMap";

const ClinicProfileView = () => {
    return (
        <div >
            <Navbar />

            <div className="grid grid-cols-4 gap-2 p-2">

                {/* Clinic */}
                <div className='p-4 col-span-3'>
                    {/* Clinic Details */}
                    <div className='flex flex-wrap gap-4 justify-around items-center'>

                        <div className="flex-1">
                            {/* Clinic Image */}
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxe2RionRovJj8Q4yAe0wZUWxw56D-FcOVoA&s"
                                className=' h-42 w-full mb-5 object-cover rounded-lg shadow-md' alt="" />

                            {/* Some More Images */}
                            <div className="flex items-center gap-3">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxe2RionRovJj8Q4yAe0wZUWxw56D-FcOVoA&s" alt=""
                                    className="w-20 h-20 rounded-lg shadow-md" />
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxe2RionRovJj8Q4yAe0wZUWxw56D-FcOVoA&s" alt=""
                                    className="w-20 h-20 rounded-lg shadow-md" />
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxe2RionRovJj8Q4yAe0wZUWxw56D-FcOVoA&s" alt=""
                                    className="w-20 h-20 rounded-lg shadow-md" />
                            </div>
                        </div>
                        {/* Clinic Location Map */}
                        <div className='w-[500px] h-[400px] mb-6'>

                                <LiveMap />
                            {/* Map Component */}
                        </div>

                    </div>


                    {/* Clinic INFO */}
                    <div className='my-10'>
                        {/* Rating */}
                        <Rating />
                        <p className="flex my-2 items-center gap-2">Verified  <RiVerifiedBadgeFill className="text-xl text-blue-700" /></p>

                        {/* info */}
                        <h1 className="text-2xl text-gray-800 font-semibold">SabarMati Clinic</h1>
                        <div className="text-sm">
                            <p className="flex my-1 items-center gap-2"> <IoLocation className="text-md text-gray-700" /> New Sundar Nagar, near Dainty Sweets</p>
                            <p className="flex my-1 items-center gap-2"> <FaPhone className="text-md text-gray-700" /> +91 31415113415</p>
                            <p className="flex my-1 items-center gap-2 text-green-500 font-medium"> <FaClock className="text-md text-gray-700" /> Open</p>

                        </div>
                    </div>

                    {/* Available Appointments */}
                    <div className='my-10'>

                        <h2 className="text-2xl text-gray-800 font-bold">Book Your Appointment</h2>
                        <h2 className=" text-gray-800 mt-3">Available Slots</h2>

                        {/* Dates */}
                        <div className="flex items-center gap-4 mb-4 mt-2 px-5">
                            <div className="rounded-2xl font-bold bg-blue-50 p-3 cursor-pointer border-2 border-blue-700 hover:bg-blue-700 hover:text-white text-gray-900 shadow-md">
                                19th Aug
                            </div>
                            <div className="rounded-2xl font-bold bg-blue-50 p-3 cursor-pointer border-2 border-blue-700 hover:bg-blue-700 hover:text-white text-gray-900 shadow-md">
                                29th Aug
                            </div>
                            <div className="rounded-2xl font-bold bg-blue-50 p-3 cursor-pointer border-2 border-blue-700 hover:bg-blue-700 hover:text-white text-gray-900 shadow-md">
                                21st Aug
                            </div>
                            <div className="rounded-2xl font-bold bg-blue-50 p-3 cursor-pointer border-2 border-blue-700 hover:bg-blue-700 hover:text-white text-gray-900 shadow-md">
                                22nd Aug
                            </div>
                            <div className="rounded-2xl font-bold bg-blue-50 p-3 cursor-pointer border-2 border-blue-700 hover:bg-blue-700 hover:text-white text-gray-900 shadow-md">
                                23rd Aug
                            </div>
                        </div>
                        {/* Timings */}
                        <div className="flex items-center gap-4 my-5 px-5">
                            <div className="rounded-2xl font-bold bg-green-50 px-2 py-1 text-sm cursor-pointer border-2 border-green-700 hover:bg-green-700 hover:text-white text-gray-900 shadow-md">
                                10:00 AM
                            </div>
                            <div className="rounded-2xl font-bold bg-green-50 px-2 py-1 text-sm cursor-pointer border-2 border-green-700 hover:bg-green-700 hover:text-white text-gray-900 shadow-md">
                                11:00 AM
                            </div>
                            <div className="rounded-2xl font-bold bg-green-50 px-2 py-1 text-sm cursor-pointer border-2 border-green-700 hover:bg-green-700 hover:text-white text-gray-900 shadow-md">
                                12:00 PM
                            </div>
                            <div className="rounded-2xl font-bold bg-green-50 px-2 py-1 text-sm cursor-pointer border-2 border-green-700 hover:bg-green-700 hover:text-white text-gray-900 shadow-md">
                                01:00 PM
                            </div>
                            <div className="rounded-2xl font-bold bg-green-50 px-2 py-1 text-sm cursor-pointer border-2 border-green-700 hover:bg-green-700 hover:text-white text-gray-900 shadow-md">
                                02:00 PM
                            </div>
                        </div>

                        <button className="bg-blue-800 text-white font0bold py-2 px-4 mx-5 my-4 rounded shadow-sm">Book Appointment </button>


                    </div>



                </div>

                {/* Doctor Details */}
                <div className=' gap-4 shadow-lg  min-h-screen   rounded-l-2xl'>
                    {/* Doctor Image */}
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNfDse2ByfQZEb-fND9WanwbpmWKlMfXHXIw&s"
                        alt="DoctorName" className='w-36 h-36 ring ring-blue-700 rounded-full object-cover mx-auto my-10 shadow-md' />

                    {/* Doctor Info */}
                    <div className="text-center" >
                        {/* Name,Exp,Speaciality, */}
                        <h1 className="text-xl items-center gap-2 justify-center text-gray-800 font-semibold flex">Dr. Nikita Sharma <RiVerifiedBadgeFill className="text-sm text-blue-700" /></h1>


                        <div className="text-sm p-4 text-center">
                            <p className="flex my-1 items-center justify-center gap-2 font-bold text-md"> <LucideStethoscope className="  text-gray-700" /> Dermatalogist</p>
                            <p className="flex my-1 items-center justify-center  gap-2 font-bold text-md"> <FaUserDoctor className=" text-gray-700" /> MBBS, M.D</p>
                            <p className="flex my-1 items-center justify-center  gap-2 font-bold text-md"> <FaClock className=" text-gray-700" /> 7+ Years Experience</p>

                        </div>
                        <hr />
                        <h3 className="text mt-4 items-center gap-2 justify-center text-gray-900 font-semibold flex">Book 1:1 Online Consultation</h3>
                        {/* Timings  1:1 */}
                        <div className=" items-center place-content-center gap-y-2 gap-4 my-5 px-5 grid grid-cols-2">
                            <div className="">
                                <div className="rounded-2xl mb-2 font-bold bg-green-50 px-2 py-1 text-sm cursor-pointer border-2 border-green-700 hover:bg-green-700 hover:text-white text-gray-900 shadow-md">
                                    10:00 AM
                                </div>
                                <div className="rounded-2xl font-bold bg-green-50 px-2 py-1 text-sm cursor-pointer border-2 border-green-700 hover:bg-green-700 hover:text-white text-gray-900 shadow-md">
                                    11:00 AM
                                </div>
                            </div>

                            <div>
                                <div className="rounded-2xl mb-2 font-bold bg-green-50 px-2 py-1 text-sm cursor-pointer border-2 border-green-700 hover:bg-green-700 hover:text-white text-gray-900 shadow-md">
                                    12:00 PM
                                </div>
                                <div className="rounded-2xl font-bold bg-green-50 px-2 py-1 text-sm cursor-pointer border-2 border-green-700 hover:bg-green-700 hover:text-white text-gray-900 shadow-md">
                                    01:00 PM
                                </div>
                            </div>

                            <div>
                                <div className="rounded-2xl mb-2 font-bold bg-green-50 px-2 py-1 text-sm cursor-pointer border-2 border-green-700 hover:bg-green-700 hover:text-white text-gray-900 shadow-md">
                                    12:00 PM
                                </div>
                                <div className="rounded-2xl font-bold bg-green-50 px-2 py-1 text-sm cursor-pointer border-2 border-green-700 hover:bg-green-700 hover:text-white text-gray-900 shadow-md">
                                    01:00 PM
                                </div>
                            </div>


                        </div>


                        {/* Booking Button */}
                        <div className="">

                            <button className="bg-blue-600 text-white font0bold py-2 px-4 mx-5 my-4 rounded-lg shadow-sm">Book 1:1 Online </button>
                        </div>


                        {/* Pricing */}
                        <hr />
                        <div className="flex flex-col items-center gap-4 mt-4 text-center text-gray-900">
                            <p className="text font-semibold">
                                1:1 Consultation Fee

                                <div className="flex item-center gap-3 justify-center"> <p className="font-bold text-blue-600">₹150</p><span> / 30 min</span></div>
                            </p>
                            <p className="text font-semibold">
                                Clinic Appointment Fee
                                <div className="flex item-center gap-3 justify-center"> <p className="font-bold text-blue-600">₹200</p><span> / appointment</span></div>

                            </p>


                        </div>




                    </div>



                </div>


            </div>
            {/* Review Section */}
            <div className='p-4'>
                <ReviewSection />
            </div>







        </div>
    );
}

export default ClinicProfileView;
