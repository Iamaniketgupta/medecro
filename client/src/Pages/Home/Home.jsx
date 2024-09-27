import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeatureSection from "./components/FeatureSection";
import Workflow from "./components/Workflow";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimonials";
import CTAs from "./components/CTAs";
import Pricing from "./components/Pricing";
import Team from "./components/Team";
import Chatbot from "./components/ChatBot";
import { useEffect } from "react";

const Home = () => {
  
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <HeroSection />
        <CTAs/>
        <FeatureSection />
        <Workflow />
        <Pricing />
        <Testimonials />
        {/* <Chatbot/> */}
        <Team/>
        <Footer />
      </div>
    </>
  );
};

export default Home;
