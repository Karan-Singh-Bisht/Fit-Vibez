import React from "react";
import Navbar from "../components/Navbar";
import Pricing from "../components/Pricing";
import Rewards from "../components/Rewards";
import Challenge from "../components/Challenge";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-[#0F1112] relative">
      <Navbar />

      {/* Heading */}
      <h1 className="font-dynapuff mt-10 md:mt-[5vw] leading-none text-white text-center font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[4vw]">
        Discover the Fitness <br /> Rewards Program
      </h1>

      {/* Image */}
      <div className="flex justify-center mt-6 md:mt-12">
        <img
          src="//cdn-imgs.dora.run/design/HK2bbKITUTpHZVcR5xEz6f.webp/w/4096/h/4096/format/webp?"
          alt="Body Builder"
        />
      </div>

      <p className="text-[3vw] sm:text-[2.5vw] md:text-[1.1vw] font-semibold text-[#899093] absolute top-[25vw] left-[8vw] leading-6 sm:leading-7">
        Unlock Exclusive Fitness Rewards and Earn <br />
        Cash Prizes for Completing Challenging <br />
        Workouts. Join Our Fitness Community and <br />
        Start Earning Today!
      </p>
      <Pricing />
      <Rewards />
      <Challenge />
      <Footer />
    </div>
  );
};

export default Home;
