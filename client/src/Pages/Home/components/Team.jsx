import React from 'react';

const teamMembers = [
  {
    name: 'Tirthesh Jain',
    role: 'Developer',
    description: 'Specializes in full-stack development with a passion for coding.',
    image: 'tirthesh.jpeg',
  },
  {
    name: 'Aniket Gupta',
    role: 'Developer',
    description: 'Expert in UI/UX design with a keen eye for aesthetics and user experience.',
    image: 'aniket.jpg',
  },
  {
    name: 'Suraj Gusain',
    role: 'Developer',
    description: 'Skilled in managing projects and ensuring timely delivery with high quality.',
    image: 'suraj.jpeg',
  },
];

const Team = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-16">
      <div className="container mx-auto text-center mb-12">
        <p className="text-gray-500 text-lg font-bold mb-2">One Punch Coders</p>
        <h1 className="text-4xl font-extrabold text-gray-800">
          The Talented People Behind the Scenes of the OnePunch Coders
        </h1>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="w-full mt-16 max-w-xs bg-white shadow-lg rounded-lg transform transition-transform hover:scale-105 hover:shadow-2xl relative"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full object-cover mx-auto -mt-16 border-4 border-white shadow-md"
              />
              <div className="px-6 pt-16 pb-6 text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-1">{member.name}</h2>
                <p className="text-gray-600 mb-4">{member.role}</p>
                <p className="text-gray-500 mb-6">{member.description}</p>
                <div className="flex justify-center space-x-4">
                  <a href="#" aria-label="Github" className="text-gray-600 hover:text-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                  <a href="#" aria-label="Twitter" className="text-gray-600 hover:text-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                  </a>
                  <a href="#" aria-label="Instagram" className="text-gray-600 hover:text-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
