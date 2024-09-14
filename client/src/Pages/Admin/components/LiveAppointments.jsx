import React from 'react';

const LiveAppointments = () => {
    return (
        <div className='shadow-lg bg-white py-5 rounded-xl'>
            <h2 className='px-5 my-4 text-xl rounded-lg font-semibold text-gray-600'>Appointments</h2>
            <div className=''>
                <h3 className='text-red-600 animate-pulse font-bold mx-4'>Live</h3>
                <div className='flex items-center gap-5 px-4 w-full h-16 cursor-pointer hover:bg-gray-50'>
                    <img src="https://i.cbc.ca/1.5003340.1549069097!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/melanie-fraser.jpg" alt=""
                        className='object-cover ring ring-blue-600 h-12 w-12 rounded-full' />
                    <div className='flex-grow'>
                        
                        <h3 className='text-gray-900  font-semibold'>Radhika Verma</h3>
                        <div>
                        <p className=' text-sm text-gray-900'>9th Aug  10:00 AM - 11:00 AM</p> 
                        </div>
                       
                    </div>
                </div>

                <div className='flex items-center gap-5 px-4 w-full h-16 cursor-pointer hover:bg-gray-50'>
                    <img src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?w=360" alt=""
                        className='object-cover ring ring-blue-600 h-12 w-12 rounded-full' />
                    <div className='flex-grow'>
                        
                        <h3 className='text-gray-900  font-semibold'>Sri kant Sharma</h3>
                        <div>
                        <p className=' text-sm text-gray-900'>9th Aug  11:00 AM - 12:00 PM</p> 
                        </div>
                       
                    </div>
                </div>
               
            </div>

            <hr />
            <div className=''>
                <h3 className='text-blue-600 my-3 font-semibold mx-4'>Upcoming</h3>
                <div className='flex items-center gap-5 px-4 w-full h-16  cursor-pointer hover:bg-gray-50'>
                    <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""
                        className='object-cover ring ring-blue-600 h-12 w-12 rounded-full' />
                    <div className='flex-grow'>
                        
                        <h3 className='text-gray-900  font-semibold'>Ravi Verma</h3>
                        <div>
                        <p className=' text-sm text-gray-900'>10th Aug  9:00 AM - 10:00 AM</p> 
                        </div>
                       
                    </div>
                    <button  className='text-red-600  font-semibold hover:text-red-400'>Cancel</button>
                </div>

                <div className='flex items-center gap-5 px-4 w-full h-16  cursor-pointer hover:bg-gray-50'>
                    <img src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?w=360" alt=""
                        className='object-cover ring ring-blue-600 h-12 w-12 rounded-full' />
                    <div className='flex-grow'>
                        
                        <h3 className='text-gray-900  font-semibold'>Aditya Pratap</h3>
                        <div>
                        <p className=' text-sm text-gray-900'>10th Aug  11:00 AM - 12:00 PM</p> 
                        </div>
                       
                    </div>
                    <button  className='text-red-600  font-semibold hover:text-red-400'>Cancel</button>

                </div>
                <div className='flex items-center gap-5 px-4 w-full h-16  cursor-pointer hover:bg-gray-50'>
                    <img src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?w=360" alt=""
                        className='object-cover ring ring-blue-600 h-12 w-12 rounded-full' />
                    <div className='flex-grow'>
                        
                        <h3 className='text-gray-900  font-semibold'>Raghu Das</h3>
                        <div>
                        <p className=' text-sm text-gray-900'>12th Aug  11:00 AM - 12:00 PM</p> 
                        </div>
                       
                    </div>
                    <button  className='text-red-600  font-semibold hover:text-red-400'>Cancel</button>

                </div>
                <div className='flex items-center gap-5 px-4 w-full h-16  cursor-pointer hover:bg-gray-50'>
                    <img src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?w=360" alt=""
                        className='object-cover ring ring-blue-600 h-12 w-12 rounded-full' />
                    <div className='flex-grow'>
                        
                        <h3 className='text-gray-900  font-semibold'>Priya sharma</h3>
                        <div>
                        <p className=' text-sm text-gray-900'>10th Aug  12:00 PM - 1:00 PM</p> 
                        </div>
                       
                    </div>
                    <button  className='text-red-600  font-semibold hover:text-red-400'>Cancel</button>

                </div>
               
            </div>
        </div>
    );
}

export default LiveAppointments;
