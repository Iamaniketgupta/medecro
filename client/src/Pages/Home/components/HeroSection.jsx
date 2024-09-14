

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl font-bold sm:text-6xl lg:text-7xl text-center tracking-wide">
        Transforming
        <span className="bg-gradient-to-r from-blue-800 to-blue-500 text-transparent bg-clip-text">
          {" "}
          Healthcare
        </span> with
        <span className="bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text">
          {" "}
          Digital
          {" "}
        </span>
        Innovation &
        <span className="bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text">
          {" "}
          AI
          {" "}
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        Say goodbye to the hassle of clinic appointments and outdated offline ads!
        With our cutting-edge digital platform, you can effortlessly manage patient records, streamline appointments, and focus on what matters most—providing exceptional care. Let technology elevate your clinic to the next level!      </p>
      <div className="flex justify-center flex-wrap md:my-10 my-8">
        <a
          href="#"
          className="bg-gradient-to-r  from-blue-500 text-white to-blue-800 py-3 px-4 mx-3 rounded-md"
        >
          Start for free
        </a>
        <a href="#" className="py-3 max-sm:my-3 px-4 mx-3 rounded-md border">
          Read Now
        </a>
      </div>

    </div>
  );
};

export default HeroSection;
