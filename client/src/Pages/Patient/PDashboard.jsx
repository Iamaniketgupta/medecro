import React, { useEffect, useState } from "react";
import { FaPhone, FaPlusSquare } from "react-icons/fa";
import { FaFileCirclePlus, FaUserDoctor } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";
import { TbCalendarRepeat } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import LiveMap from "../../Map/LiveMap";
import { useSelector } from "react-redux";
import axiosInstance from "../../axiosConfig/axiosConfig";
import { toast } from "react-toastify";
import { useStateManager } from "react-select";

const PDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [consultancies, setconsultancies] = useState([])
  const navigate  = useNavigate();
  const [reports, setreports] = useState(null)

  const fetchPendingAppointments = async () => {
    try {
      const res = await axiosInstance.get(
        `/appointment/getUpcomingAppointment/user/${user._id}`
      );
      if (res.data) {
        console.log("Res.data : ", res.data);
        setPendingAppointments(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOnlineConsultations = async () => {
    try {
      const res = await axiosInstance.get(
        `/virtualAppointment/getUpcomingAppointments/${user._id}`
      );
      if (res.data) {
        console.log("Res.data : ", res.data);
        setconsultancies(res.data);
        
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Statistics cards
  const statsTabs = [
    {
      id: 1,
      title: "Upcoming Appointments",
      value: pendingAppointments?.length,
      icon: <TbCalendarRepeat className="" />,
    },
    {
      id: 2,
      title: "Total Consultations",
      value: consultancies?.length,
      icon: <FaPlusSquare />,
    },
    {
      id: 3,
      title: "Preferred Doctors",
      value: "5",
      icon: <FaUserDoctor />,
    },
  ];

  // Appointments data
  const appointments = [
    {
      id: 1,
      doctor: "Dr. Suresh Patel",
      date: "15th Sept 2024",
      time: "10:30 AM",
      mode: "online",
      status: "Confirmed",
    },
  ];
  const appointments2 = [
    {
      id: 1,
      clinic: "Sabarmati Clinic",
      address: "Dharmatala, Sabarmati, Nagpur, Maharashtra 440022",
      doctor: "Dr. Anita Sharma",
      date: "20th Sept 2024",
      time: "02:00 PM",
      mode: "on site",
      status: "Pending Payment",
    },
  ];

  
  const [timers, setTimers] = useState({});

  function isTimeOver(dateString, timeSlot) {
    // Parse the date string and time slot to create a Date object
    const date = new Date(dateString); // Example: "2024-09-14T00:00:00.000+00:00"
    
    // Extract hours and minutes from the time slot
    const [time, meridian] = timeSlot.split(' '); // "12:30 AM"
    let [hours, minutes] = time.split(':').map(Number);

    // Convert to 24-hour format
    if (meridian === 'PM' && hours !== 12) {
        hours += 12;
    } else if (meridian === 'AM' && hours === 12) {
        hours = 0; // Midnight case
    }

    // Set the time in the date object
    date.setHours(hours, minutes);

    // Get the current date and time
    const now = new Date();
    

    // Compare the dates
    return date < now;
}


const fetchReports = async()=>{
  try {
      const res = await axiosInstance.get(`/prescription/getPrescriptionByPatientId/${user._id}`);
      if(res.data){
          console.log("res.data.pre :  " , res.data.prescription.slice(0,2))
          setreports(res?.data?.prescription?.slice(0,2));
      } 
  } catch (error) {
      console.log(error)
  }
}


  // Initialize countdown timers for each appointment
  useEffect(() => {
    const initTimers = appointments.reduce((acc, appointment) => {
      acc[appointment.id] = 60; // Set each timer to 60 seconds
      return acc;
    }, {});
    // setTimers(initTimers);
  }, [appointments , user]);

  // Countdown logic
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimers((prevTimers) => {
        const newTimers = { ...prevTimers };
        Object.keys(newTimers).forEach((id) => {
          if (newTimers[id] > 0) {
            newTimers[id] -= 1;
          }
        });
        return newTimers;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fetchPendingAppointments();
    fetchOnlineConsultations();
    fetchReports()
  }, []);

  return (
    <div className="relative pb-10">
      <h1 className="md:text-2xl text-lg max-sm:px-3 font-semibold mb-5 opacity-70">
        Patient Dashboard
      </h1>

      {/* Stats Section */}
      <div className="flex justify-around flex-wrap gap-4 p-3">
        {statsTabs &&  statsTabs?.map((i) => (
          <div
            key={i.id}
            className="bg-white flex-1 rounded-lg shadow-lg flex min-w-46 p-4 md:w-[260px] w-[180px] py-5 justify-between gap-5 items-center"
          >
            <div className="flex-grow">
              <h3 className="text-gray-600 font-semibold">{i.title}</h3>
              <p className="md:text-3xl text-xl font-bold text-gray-900">
                {i.value}
              </p>
            </div>
            <div className="bg-gradient-to-r p-1 text-white text-5xl rounded-md from-blue-500 to-blue-800">
              {i.icon}
            </div>
          </div>
        ))}
      </div>

      <br />
      <hr />
      {/* Appointments Section */}
      <div className="my-6">
        <h2 className="px-5 text-xl font-semibold text-gray-600 flex items-center gap-4">
          1:1 Upcoming Appointments{" "}
          <div className="bg-red-500 animate-ping w-2 h-2 rounded-full"></div>
        </h2>
        <div className="flex-wrap gap-4 p-3 grid grid-cols-3">
          {consultancies?.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white flex-1 rounded-lg shadow-lg p-4"
            >
              <h3 className="text-gray-800">{appointment.doctorId.name}</h3>
              <h3 className="text-gray-800">{appointment.mode || "Online"}</h3>
              <p className="text-gray-600">
                {appointment.slotId.date.slice(0 , 10)} at {appointment.slotId.timeSlot}
              </p>
              <p
                className={`text-sm ${
                  appointment.paymentStatus === "Pending Payment"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {appointment.paymentStatus}
              </p>
              <div className="flex items-center justify-between ">
                <button
                  className={`bg-indigo-300 text-white px-3 py-1 rounded-md my-1 flex items-center gap-3 ${
                    timers[appointment.id] > 0
                      ? "opacity-50 cursor-not-allowed"
                      : "opacity-100"
                  } ${isTimeOver && "bg-indigo-700 cursor-pointer"} `}
                  disabled={!isTimeOver(appointment.slotId?.date , appointment?.slotId.timeSlot)} // Disable button based on timer
                  onClick={()=>{
                    navigate(`../vc/${appointment?.roomId}`);
                  }}
                >
                  Meet <FaPhone />
                </button>

                <>
                  {timers[appointment.id] > 0 ? (
                    <p className="text-gray-500 text-sm">
                      Meeting starts in {timers[appointment.id]}s
                    </p>
                  ) : (
                    <p className="text-gray-500 text-sm">Ready to meet</p>
                  )}
                </>
              </div>
              {/* Display Countdown Timer */}
            </div>
          ))}
        </div>
      </div>

      {/* Appointments Section */}
      <div className="my-6">
        <h2 className="px-5 text-xl font-semibold text-gray-600 flex items-center gap-3">
          Onsite Appointments{" "}
          <div className="bg-red-500 animate-ping w-2 h-2 rounded-full"></div>
        </h2>
        <div className=" flex-wrap gap-4 p-3 grid grid-cols-2">
          {pendingAppointments?.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white flex-1 rounded-lg shadow-lg p-4 flex gap-3 justify-between"
            >
              <div>
                {appointment.clinicId && (
                  <h3 className="text-gray-800 font-semibold">
                    {appointment?.clinicId?.clinicName}
                  </h3>
                )}
                {appointment.address && (
                  <h3 className="text-gray-800 ">{appointment.clinicId.address}</h3>
                )}
                <h3 className="text-gray-800 ">{appointment.doctorId.name}</h3>
                <h3 className="text-gray-800 ">{appointment.mode || "on site"}</h3>
                <p className="text-gray-600">
                  {appointment.slotId.date.slice(0,10)} at {appointment.slotId.timeSlot}
                </p>
                <p
                  className={`text-sm ${
                    appointment.status === "paymentStatus"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {appointment.paymentStatus}
                </p>
              </div>

              <div className="w-52 h-full ">
                <LiveMap markerPositio1={appointment?.clinicId?.locationCoordinates} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr />
      {/* Reports Section */}
      <div className="my-6">
        <h2 className="px-5 text-xl font-semibold text-gray-600 flex gap-4 items-center">
          My Reports <FaFileCirclePlus className="text-red-500" />
        </h2>
        <div className="flex flex-wrap gap-4 p-3">
          {reports?.map((report) => (
            <div
              key={report._id}
              className="bg-white flex-1 rounded-lg shadow-lg p-4"
            >
              <h3 className="text-gray-800 font-semibold">{report.medication.name}</h3>
              <p className="text-gray-600">Type : Physical ( on Clinic )</p>
              <p className="text-gray-600">
                Issued by {report.clinicId?.doctor?.name} 
              </p>
              <br />
              <a href={report.report[0]} className="text-blue-500 hover:underline">
                Download Report
              </a>
              <Link
                href={""}
                className="text-green-500 font-semibold hover:underline mx-4"
              >
                Prescription
              </Link>
              <Link
                to={"/patient/summarise"}
                className=" hover:bg-indigo-700 bg-indigo-500 px-3 text-white rounded-full py-1 mx-5"
              >
                Ask Ai Summarizer
              </Link>
            </div>
          ))}
        </div>
      </div>

      <hr />
    </div>
  );
};

export default PDashboard;
