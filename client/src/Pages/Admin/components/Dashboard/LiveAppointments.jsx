import React from "react";
import SearchInput from "./SearchInput";

const LiveAppointments = ({
  upcomingAppointments = [],
  liveAppointments = [],
}) => {

  const handleCancel =async()=>{
    
  }
  return (
    <div className="shadow-lg bg-white py-5 rounded-xl">
      <h2 className="px-5 my-4 text-xl rounded-lg font-semibold text-gray-600">
        Appointments
      </h2>
      <SearchInput />
      <div className="">
        <h3 className="text-red-600 animate-pulse font-bold mx-4">Live</h3>
        {liveAppointments.length === 0 && (
          <div className="flex items-center gap-5 px-4 w-full h-16 cursor-pointer hover:bg-gray-50">
            <div className="flex-grow">
              <h3 className="text-gray-900  font-semibold">
                No live appointments
              </h3>
            </div>
          </div>
        )}
        {liveAppointments.map((appointment) => {
          return (
            <div className="flex items-center gap-5 px-4 w-full h-16 cursor-pointer hover:bg-gray-50">
              <img
                src={appointment.userId?.avatar}
                alt=""
                className="object-cover ring ring-blue-600 h-12 w-12 rounded-full"
              />
              <div className="flex-grow">
                <h3 className="text-gray-900  font-semibold">
                  {appointment.userId?.fullName}
                </h3>
                <div>
                  <p className=" text-sm text-gray-900">
                    {appointment.slotId.date.slice(0, 10)}{" "}
                    {appointment.slotId?.timeSlot}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <hr />
      <div className="">
        <h3 className="text-blue-600 my-3 font-semibold mx-4">Upcoming</h3>
        {upcomingAppointments.length === 0 && (
          <div className="flex items-center gap-5 px-4 w-full h-16 cursor-pointer hover:bg-gray-50">
            <div className="flex-grow">
              <h3 className="text-gray-900  font-semibold">
                No live appointments
              </h3>
            </div>
          </div>
        )}
        
        {upcomingAppointments.map((appointment) => (
          <div
            key={appointment}
            className="flex items-center gap-5 px-4 w-full h-16 cursor-pointer hover:bg-gray-50"
          >
            <img
              src={
                appointment?.userId?.avatar ||
                "https://imgs.search.brave.com/p_i_CvZoxJVyJlHgxMLnHbaA6s1bqtzlH555Hm0LD-c/rs:fit:860:0:0:0/g:ce/aHR0cDovL3d3dy5i/a2FyY2hpdGVjdHMu/bmV0L2ltYWdlcy9k/ZWZhdWx0LWRwLTI3/MXgzMDAuZ2lm.gif"
              }
              alt=""
              className="object-cover ring ring-blue-600 h-12 w-12 rounded-full"
            />
            <div className="flex-grow">
              <h3 className="text-gray-900  font-semibold">
                {appointment?.userId?.fullName}
              </h3>
              <div>
                <p className=" text-sm text-gray-900">
                  {appointment?.slotId?.date.slice(0, 10)}{" "}
                  {appointment?.slotId?.timeSlot}
                </p>
              </div>
            </div>
            <button className="text-red-600  font-semibold hover:text-red-400">
              Cancel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveAppointments;
