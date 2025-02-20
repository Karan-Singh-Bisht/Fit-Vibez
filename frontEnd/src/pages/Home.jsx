import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Pricing from "../components/Pricing";
import Rewards from "../components/Rewards";
import Challenge from "../components/Challenge";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import AuthModal from "../modals/AuthModal";
import { useDispatch } from "react-redux";
import { getUserProfile } from "../state/Auth/userAuthSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ScrollVelocity from "../components/ScrollVelocity";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get("token");

  useEffect(() => {
    const getUser = async () => {
      const result = await dispatch(getUserProfile());
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/");
      }
    };
    getUser();
  }, [token, dispatch, navigate]);

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-[#0F1112] relative">
      <Navbar />
      <AuthModal />
      {/* Heading */}
      <motion.h1
        initial={{ y: -500, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="font-dynapuff mt-10 md:mt-[5vw] leading-none text-white text-center font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[4vw]"
      >
        Discover the Fitness
        <br />
        Rewards Program
      </motion.h1>
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="flex justify-center mt-6 md:mt-12"
      >
        <img
          src="//cdn-imgs.dora.run/design/HK2bbKITUTpHZVcR5xEz6f.webp/w/4096/h/4096/format/webp?"
          alt="Body Builder"
        />
      </motion.div>
      <motion.p
        className="text-[3vw] sm:text-[2.5vw] md:text-[1.1vw] font-semibold text-[#899093] absolute top-[25vw] left-[8vw] leading-6 sm:leading-7"
        animate={{
          x: [1, -5, 5, -7], // Moves slightly left & right
          y: [1, -3, 3, 7], // Moves slightly up & down
        }}
        transition={{
          duration: 3, // Adjust the speed
          repeat: Infinity, // Loop forever
          ease: "easeInOut",
        }}
      >
        Unlock Exclusive Fitness Rewards and Earn <br />
        Cash Prizes for Completing Challenging <br />
        Workouts. Join Our Fitness Community and <br />
        Start Earning Today!
      </motion.p>
      <Pricing />
      <Rewards />
      <Challenge />
      <Footer />
    </div>
  );
};

export default Home;
