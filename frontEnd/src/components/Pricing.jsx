import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// import GlitchText from "./GlitchText";
import GradientText from "./GradientText";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import {Canvas} from "@react-three/fiber"
import {OrbitControls} from "@react-three/drei"
import Model1 from "./Model1";
import Model2 from "./Model2";
import Model3 from "./Model3";


const iconVariants = (duration) => ({
  initial: { y: -10 },
  animate: {
    y: [10, -10],
    transition: {
      duration: duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
});

const Pricing = () => {
  const authUser = useSelector((state) => state.userAuth);
  const navigate = useNavigate();

  const handleNavigate = (to) => {
    if (authUser.user) {
      navigate(to);
    } else {
      toast.error("You need to be logged in to access this page.");
    }
  };

  const plans = [
    { name: "Jumping Jack", price: 5599, value: 1, to: "/pushup" , model: <Model1 position={[0,-2.7,0]} scale={1.6} animationName = "Armature|mixamo.com|Layer0"/> },
    { name: "Squats", price: 5299, value: 1.5, to: "/jumpingjack" , model: <Model2 position={[0,-2.7,0]} scale={1.6} animationName = "Armature|mixamo.com|Layer0"/>},
    { name: "Bicep Curls", price: 399, value: 2, to: "/pullups" , model: <Model3 position={[0,-2.7,0]} scale={1.6} animationName = "Armature|mixamo.com|Layer0"/> },
    // { name: "Fitnes: naumaný", price: 5399, value: 2.5 },
    // { name: "SIOCCAIG", price: 5999, value: 3 },
  ];
  return (
    <div>
      <h1 className="font-dynapuff text-white mt-[2vw] text-[3vw] font-semibold text-center">
        Join the Fitness Challenge
      </h1>
      <h2 className="text-[#818180] mt-[1vw] font-inter text-center">
        Unlock Cash Rewards for Completing Fitness Challenges. Track Your
        Progress, Compete with <br></br> Friends, and Earn Exciting Prizes as
        You Achieve Your Fitness Goals
      </h2>
      <h2 className="text-[#818180] mt-[1vw] font-inter text-center gap-2">
        Help us to keep the gains coming—both in reps and in funds!
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={3}
        >
          <h1 onClick={() => handleNavigate("donate")}>Donate</h1>
        </GradientText>
      </h2>

      <div className="bg-[#0F1112] min-h-screen flex flex-col items-center justify-center p-8">
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
          {plans.map((plan, index) => (
            <motion.div
              variants={iconVariants(plan.value)}
              initial="intial"
              animate="animate"
              key={index}
              onClick={() => handleNavigate(plan.to)}
              className="bg-[#1C1E21] p-8 rounded-xl text-center shadow-lg h-[36vw]"
            >
              <div className="w-50 h-72 bg-gray-600 rounded-3xl flex items-center justify-center mx-auto">
                {/* <span className="text-white text-3xl">S</span> */}
                <Canvas>
                  <ambientLight intensity={1} />
                  <directionalLight position={[3, 2, 1]} />
                  
                  {plan.model}

                  <OrbitControls 
                    minPolarAngle={Math.PI / 2}
                    enableZoom={false}
                    maxPolarANgle={Math.PI / 2}
                  />
                </Canvas>
              </div>
              <h2 className="text-white text-2xl font-bold mt-4">
                {plan.name}
              </h2>
              <p className="text-white text-4xl font-extrabold mt-2">
                ${plan.price}
              </p>
              <button className="mt-4 bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition">
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
        {/* Call to Action */}
        <div className="flex flex-col mt-[5vw] items-center">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto">
            <span className="text-white text-2xl">🏃‍♂️</span>
          </div>
          <h2 className="text-white text-3xl font-bold mt-4">Start Now</h2>
          <p className="text-white text-4xl font-extrabold mt-2">Earn</p>
          <p className="text-red-400 font-medium mt-2">Get Fit, Get Paid</p>
          <p className="text-gray-400 text-sm">Achieve Your Fitness Goals</p>
        </div>
      </div>
      <hr className="text-[#899093]"></hr>
    </div>
  );
};

export default Pricing;
