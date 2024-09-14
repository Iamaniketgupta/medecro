

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl font-bold sm:text-6xl lg:text-7xl text-center tracking-wide">
      Enjoy 
       <span className="bg-gradient-to-r from-blue-800 to-blue-500 text-transparent bg-clip-text">
          {" "}
          Fiction Mania
        </span> Get  
        <span className="bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text">
          {" "}
          Stories
          {" "}
        </span>
        for free
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        Now Share Your Story and Collaborate with the authors for free
      </p>
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
