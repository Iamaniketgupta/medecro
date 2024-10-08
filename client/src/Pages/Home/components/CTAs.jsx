import React from 'react';

const CTAs = () => {
  return (
    <section className="bg-white">
      <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
        <img
          className="w-full"
          src="https://media.istockphoto.com/id/1388254153/photo/shot-of-a-baby-sitting-on-her-mothers-lap-while-being-examined-by-a-doctor.jpg?s=2048x2048&w=is&k=20&c=bRMQjku9Qgnm2O7PiXQi52LeZfpnX7Qb0Q239JCJLXo="
          alt="dashboard"
        />
        <div className="mt-4 md:mt-0">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">
            Say goodbye to the hassle of clinic appointments and outdated offline ads!
          </h2>
          <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
            With our cutting-edge digital platform, you can effortlessly manage patient records, streamline appointments, and focus on what matters most—providing exceptional care. Let technology elevate your clinic to the next level!
          </p>
          <a
            href="#"
            className="inline-flex items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900"
          >
            Get started
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTAs;
