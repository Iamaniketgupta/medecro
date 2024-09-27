import Navbar from "../Home/components/Navbar";
import Rating from "./components/Rating";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { IoLocation } from "react-icons/io5";
import { FaClock, FaPhone } from "react-icons/fa";
import { Clock, LucideStethoscope } from "lucide-react";
import ReviewSection from "./components/ReviewSection";
import { FaUserDoctor } from "react-icons/fa6";
import LiveMap from "../../Map/LiveMap";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../axiosConfig/axiosConfig";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ClinicProfileView = () => {
  const { clinicId } = useParams();
  const [clinic, setClinic] = useState(null);
  const [slots, setSlots] = useState([]); // In-person slots
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [virtualSlots, setVirtualSlots] = useState([]); // Virtual slots
  const [selectedVirtualDate, setSelectedVirtualDate] = useState(null);
  const [virtualTimeSlots, setVirtualTimeSlots] = useState([]);
  const [selectedVirtualSlot, setSelectedVirtualSlot] = useState(null);

  const navigate = useNavigate();

  // Helper function to format date
  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "June",
      "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    const month = monthNames[date.getMonth()];

    const daySuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };

    return `${day}${daySuffix(day)} ${month}`;
  };

  // Handle date selection for in-person slots
  const handleDateClick = (date) => {
    setSelectedDate(date);
    const availableSlots = slots
      .filter((app) => app.date === date)
      .map((app) => app.timeSlot);
    setTimeSlots(availableSlots);
  };

  // Handle in-person slot selection
  const handleSlotSelection = (time) => {
    const slot = slots?.find(slot => slot.date === selectedDate && slot.timeSlot === time);
    setSelectedSlot(slot);
  };

  // Handle date selection for virtual slots
  const handleVirtualDateClick = (date) => {
    setSelectedVirtualDate(date);
    const availableVirtualSlots = virtualSlots
      ?.filter((app) => app?.date === date)
      ?.map((app) => app.timeSlot);
    setVirtualTimeSlots(availableVirtualSlots);
  };

  // Handle virtual slot selection
  const handleVirtualSlotSelection = (time) => {
    const slot = virtualSlots?.find(slot => slot.date === selectedVirtualDate && slot.timeSlot === time);
    setSelectedVirtualSlot(slot);
  };

  // Fetch clinic details
  const fetchClinicDetails = async () => {
    try {
      const res = await axiosInstance(`/clinic/getClinicById/${clinicId}`);
      console.log("Clinics:", res)
      setClinic(res.data.data);
      if (clinic?.clinicImages.length > 0)
        setSelectedImage(clinic?.clinicImages[0]);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch available in-person slots
  const fetchSlots = async () => {
    try {
      const res = await axiosInstance(`/slot/clinic/${clinicId}`);
      console.log("Slots:", res)
      if (res.data) {
        const formattedSlots = res.data.map(slot => ({
          ...slot,
          date: getFormattedDate(slot?.date),
        }));
        setSlots(formattedSlots);
        
        setSelectedDate(formattedSlots[0]?.date);
        setTimeSlots(formattedSlots
          .filter(app => app.date === formattedSlots[0]?.date)
          .map(app => app.timeSlot)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch available virtual slots
  const fetchVirtualSlots = async () => {
    try {
      const res = await axiosInstance(`/virtualSlot/getVirtualSlotsByDoctorId/${clinic?.doctor?._id}`);
      if (res.data) {
        const formattedVirtualSlots = res.data.map(slot => ({
          ...slot,
          date: getFormattedDate(slot.date),
        }));

        console.log({ redData: res })
        setVirtualSlots(formattedVirtualSlots);
        setSelectedVirtualDate(formattedVirtualSlots[0]?.date);
        setVirtualTimeSlots(formattedVirtualSlots
          .filter(app => app.date === formattedVirtualSlots[0]?.date)
          .map(app => app.timeSlot)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Effect to fetch clinic and slots
  useEffect(() => {
    fetchClinicDetails();
    fetchSlots();
  }, []);

  // Fetch virtual slots after clinic details are loaded
  useEffect(() => {
    if (clinic) {
      fetchVirtualSlots();
    }
  }, [clinic]);

  console.log(clinic?.clinicImages[0])
  const [selectedImage, setSelectedImage] = useState(clinic?.clinicImages[0]);

  useEffect(() => {
    if (clinic && clinic.clinicImages.length > 0) {
      setSelectedImage(clinic.clinicImages[0]);
    }
  }, [clinic]);
  // Get unique dates for both in-person and virtual slots
  const uniqueDates = [...new Set(slots.map(app => app.date))];
  const uniqueVirtualDates = [...new Set(virtualSlots.map(app => app.date))];

  return (
    <div>
      <Navbar />

      <div className="grid grid-cols-4 gap-2 p-2">
        {/* Clinic */}
        <div className="p-4 col-span-3">
          {/* Clinic Details */}
          <div className="flex flex-wrap  gap-4 justify-around">
            <div className="flex-1">
              {/* Clinic Image */}
              <img
                src={selectedImage}
                className=" h-[400px] w-full mb-5 object-cover rounded-lg shadow-md"
                alt=""
              />

              {/* Some More Images */}
              {clinic?.clinicImages.length > 0 &&
                <div className="flex items-center gap-3">
                  {clinic?.clinicImages.map((i) => (
                    <img
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      src={i}
                      className={`${selectedImage === i ? "border-2 border-blue-600" : ""} cursor-pointer w-20 h-20 rounded-lg shadow-md`}
                      alt=""
                    />
                  ))}


                </div>}

            </div>
            {/* Clinic Location Map */}
            <div className="w-[500px] h-[400px]  mb-6">
              <LiveMap markerPositio1={clinic?.locationCoordinates} />
              {/* Map Component */}
            </div>
          </div>

          {/* Clinic INFO */}
          <div className="my-10">
            {/* Rating */}
            <Rating />
            <p className="flex my-2 items-center gap-2">
              Verified <RiVerifiedBadgeFill className="text-xl text-blue-700" />
            </p>

            {/* info */}
            <h1 className="text-2xl text-gray-800 font-semibold">
              {clinic?.clinicName} Clinic
            </h1>
            <div className="text-sm">
              <p className="flex my-1 items-center gap-2">
                {" "}
                <IoLocation className="text-md text-gray-700" />
                {clinic?.address +
                  " " +
                  clinic?.zipCode +
                  " " +
                  clinic?.city +
                  " " +
                  clinic?.state}
              </p>
              <p className="flex my-1 items-center gap-2">
                {" "}
                <FaPhone className="text-md text-gray-700" /> +91{" "}
                {clinic?.phoneNumber}
              </p>
              <p className="flex my-1 items-center gap-2 text-green-500 font-medium">
                {" "}
                <FaClock className="text-md text-gray-700" /> Open
              </p>
            </div>
          </div>

          <div className="my-10">
            <h2 className="text-2xl text-gray-800 font-bold">
              Book Your Appointment
            </h2>
            <h2 className="text-gray-800 mt-3">Available Slots</h2>

            {/* Dates */}
           { uniqueDates.length>0 ? <div
              className="flex items-center gap-4 mb-4 mt-2 px-5 "
              style={{ overflowX: "scroll" , scrollbarWidth:'none' }}
            >
              {uniqueDates.map((date) => (
                <div
                  key={date}
                  className={`rounded-2xl min-w-fit font-bold bg-blue-50 p-3 cursor-pointer border-2 border-blue-700 ${selectedDate === date
                    ? "bg-blue-700 text-white"
                    : "hover:bg-blue-700 hover:text-white"
                    } text-gray-900 shadow-md`}
                  onClick={() => handleDateClick(date)}
                >
                  {date}
                </div>
              ))}
            </div> : <div className="text-center">No Slots Available</div>}

            {/* Timings */}
            <div className="flex items-center gap-4 my-5 px-5">
              {timeSlots.map((slot, index) => (
                <div
                  key={slot}
                  className={`rounded-2xl font-bold bg-green-50 px-2 py-1 text-sm cursor-pointer border-2 border-green-700 hover:bg-green-700 ${selectedSlot?.timeSlot == slot && "bg-green-700 text-white"}  hover:text-white text-gray-900 shadow-md`} 
                >
                    <div  onClick={() => {
                    handleSlotSelection(slot)}
                  }>

                    {slot}
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => {
              if (selectedSlot && selectedDate) {
                navigate(`/clinic/profile/${clinicId}/${selectedSlot?._id}`)

              } else {
                toast.info("Please select slot and date")
              }
            }} className="bg-blue-800 text-white font-bold py-2 px-4 mx-5 my-4 rounded shadow-sm">
              Book Appointment
            </button>
          </div>
        </div>

        {/* Doctor Details */}
        <div className=" gap-4 shadow-lg  min-h-screen   rounded-l-2xl">
          {/* Doctor Image */}
          <img
            src={clinic?.doctor?.avatar || "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3408.jpg"}
            alt="DoctorName"
            className="w-36 h-36 ring ring-blue-700 rounded-full object-cover mx-auto my-10 shadow-md"
          />

          {/* Doctor Info */}
          <div className="text-center">
            {/* Name,Exp,Speaciality, */}
            <h1 className="text-xl items-center gap-2 justify-center text-gray-800 font-semibold flex">
              Dr. {clinic?.doctor?.name}{" "}
              <RiVerifiedBadgeFill className="text-sm text-blue-700" />
            </h1>

            <div className="text-sm p-4 text-center">
              <p className="flex my-1 items-center justify-center gap-2 font-bold text-md">
                {" "}
                <LucideStethoscope className="  text-gray-700" /> {clinic?.doctor.speciality}
              </p>
              <p className="flex my-1 items-center justify-center  gap-2 font-bold text-md">
                
                <FaUserDoctor className=" text-gray-700" />
              {clinic?.doctor?.degrees?.map((d) => d).join(" , ")}
              </p>

              <p className="flex my-1 items-center justify-center  gap-2 font-bold text-md">
                {" "}
                <FaClock className=" text-gray-700" /> {clinic?.doctor?.experience}+ Years Experience
              </p>
            </div>
            <hr />
            <h3 className="text mt-4 items-center gap-2 justify-center text-gray-900 font-semibold flex">
              Book 1:1 Online Consultation
            </h3>

            <div className="flex items-center gap-4 mb-4 mt-2 px-5" style={{ overflowX: "scroll", scrollbarWidth: "none" }}>
              {uniqueVirtualDates.map((date) => (
                <div
                  key={date}
                  className={`rounded-2xl text-xs min-w-fit font-bold bg-blue-50 py-2 px-3 cursor-pointer border-2 border-blue-700 ${
                    selectedVirtualDate === date
                      ? "bg-blue-700 text-white"
                      : "hover:bg-blue-700 hover:text-white"
                  } text-gray-900 shadow-md`}
                  onClick={() => handleVirtualDateClick(date)}
                >
                  {date}
                </div>
              ))}
            </div>
            {/* Timings  1:1 */}
            <div className=" items-center place-content-center gap-y-2 gap-4  grid grid-cols-2">
            <div className="flex items-center gap-4 my-2 px-5">
              {virtualTimeSlots.map((slot, index) => (
                <div
                  key={index}
                  className={`rounded-2xl mb-2 font-bold text-xs min-w-fit bg-green-50 px-2 py-1  cursor-pointer border-2 border-green-700 hover:bg-green-700 ${selectedVirtualSlot?.timeSlot == slot && "bg-green-700 text-white"}  hover:text-white text-gray-900 shadow-md`}
                  
                >
                    <div onClick={() => {
                    handleVirtualSlotSelection(slot)}
                  }>

                  

                      {slot}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Button */}
            <div className="">
              <button onClick={() => {
                if (!(selectedVirtualSlot && selectedVirtualDate)) {
                  toast.info("Please select slot and date");
                  return;
                }
                navigate(`/clinic/profile/${clinicId}/virtual/${selectedVirtualSlot?._id}`)
              }} className="bg-blue-600 text-white font0bold py-2 px-4 mx-5 my-4 rounded-lg shadow-sm">
                Book 1:1 Online{" "}
              </button>
            </div>

            {/* Pricing */}
            <hr />
            <div className="flex flex-col items-center gap-4 mt-4 text-center text-gray-900">
              <p className="text font-semibold">
                1:1 Consultation Fee
                <div className="flex item-center gap-3 justify-center">
                  {" "}
                  <p className="font-bold text-blue-600">₹{clinic?.doctor?.virtualFee}</p>
                  <span> / 30 min</span>
                </div>
              </p>
              <p className="text font-semibold">
                Clinic Appointment Fee
                <div className="flex item-center gap-3 justify-center">
                  {" "}
                  <p className="font-bold text-blue-600">₹ {clinic?.doctor?.onsiteFee}</p>
                  <span> / appointment</span>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Review Section */}
      <div className="p-4">
        <ReviewSection />
      </div>
    </div>
  );
};

export default ClinicProfileView;
