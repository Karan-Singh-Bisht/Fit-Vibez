import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
// import CardModel from "./CardModel";
// import Man2 from "./Man2";
import Man from "../components/man";
import Man2 from "./Man2";
import Man3 from "./Man3";
import { OrbitControls } from "@react-three/drei";
// import Female1 from "../components/Female1";
// console.log('Pricing component rendered');
// console.log('Plans:', plans);
// console.log('Navigate function:', navigate);


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
  const navigate = useNavigate();

  const plans = [
    { name: "Squats", price: 5599, value: 1, to: "/pushup" , modelName: <Man2 position={[0, -2.6, 0]} scale={1.5} animationName="Armature|mixamo.com|Layer0"/> , },
    { name: "Jumping Jack", price: 5299, value: 1.5, to: "/jumpingjack" , modelName: <Man position={[0, -3, 0]} scale={1.5} animationName="Armature|mixamo.com|Layer0"/>},
    { name: "BicepCurls", price: 399, value: 2, to: "/pullups" , modelName: <Man3 position={[0, -2.6, 0]} scale={1.5} animationName="Armature|mixamo.com|Layer0" />},
    // { name: "Fitnes: naumaný", price: 5399, value: 2.5 },
    // { name: "SIOCCAIG", price: 5999, value: 3 },
  ];
  return (
    <div>
      <h1 className="font-dynapuff text-white mt-[2vw] text-[3vw] font-semibold text-center">
        Join the Fitness Challenge
      </h1>
      <p className="text-[#818180] mt-[1vw] font-inter text-center">
        Unlock Cash Rewards for Completing Fitness Challenges. Track Your
        Progress, Compete with <br></br> Friends, and Earn Exciting Prizes as
        You Achieve Your Fitness Goals
      </p>
      <div className="bg-[#0F1112] min-h-screen flex flex-col items-center justify-center p-8">
        {/* Pricing Cards */}
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8  max-w-6xl">
          {plans.map((plan, index) => (
            <motion.div
              variants={iconVariants(plan.value)}
              initial="intial"
              animate="animate"
              key={index}
              onClick={() => navigate(plan.to)}
              className="bg-[#1C1E21] p-8 rounded-xl text-center shadow-lg h-[35vw]"
            >
              <div className="w-30 h-72  rounded-3xl flex items-center justify-center mx-auto">
                {/* <span className="text-white text-3xl">S</span> */}
                <Canvas className="bg-slate-800 rounded-xl">
                  <ambientLight intensity={1} />
                  <directionalLight position={[3, 2, 1]} /> 
                  {plan.modelName}
                  <OrbitControls 
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                  />
                </Canvas>
                
              </div>
              <h2 className="text-white text-1xl font-bold mt-2">
                {plan.name}
              </h2>
              <p className="text-white text-2xl font-extrabold mt-2">
                ${plan.price}
              </p>
              <button className="mt-2 bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition">
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
