import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useAccount, useWriteContract } from "wagmi";
import { ABI } from "../ABI/abi";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Challenge = () => {
  const claimRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#claim") {
      const element = document.getElementById("claim");
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  const { address, isConnected } = useAccount();
  const { data: hash, writeContract } = useWriteContract();

  const handleClaim = () => {
    if (!isConnected) {
      toast.error("Please Connect your wallet");
      return;
    }
    return writeContract({
      address: import.meta.env.VITE_CONTRACT_ADDRESS,
      abi: ABI,
      functionName: "claim",
    });
  };

  return (
    <div className="bg-[#1B1A1D] ">
      <div className="flex gap-[19vw] px-[10vw] pt-[8vw]">
        <div className="flex flex-col gap-4">
          <h1 className="font-dynapuff text-[3vw] text-white font-bold">
            Fitness
          </h1>
          <p className="text-md text-[#878587] tracking-[0.5px] leading-2xl">
            Discover How to Earn Cash Rewards for Reaching <br /> Your Fitness
            Goals. Join Our Cutting-Edge Program
            <br /> and Start Transforming Your Body and Bank Account
            <br /> Today
          </p>
          <button
            id="claim"
            onClick={handleClaim}
            className="text-white mt-6 w-[10vw] text-md p-2 bg-[#F04658] opacity-80 rounded-full"
          >
            Claim Rewards
          </button>
        </div>
        <motion.div
          initial={{ y: 300, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src="https://cdn-imgs.dora.run/design/CuiHA53WkTUFjspowIOIyE.webp/w/4096/h/4096/format/webp?"
            alt="women with weights"
            className="w-[17vw] h-[30vw]"
          />
        </motion.div>
      </div>
      <div className="flex">
        {/* Left Card */}
        <motion.div
          initial={{ opacity: 0, x: -100, rotate: -10 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-[50%] px-[8vw] rounded-md flex flex-col gap-6 py-[6vw] bg-[#FAEFEC]"
        >
          <h1 className="font-dynapuff text-4xl text-[#1C1A1C] font-bold">
            Fitness <br></br>Challenges
          </h1>
          <p className="text-sm text-[#9D9492]">
            Earn Money for Staying Active. Join Our Fitness Program and Get Paid
            to Achieve Your Health and Wellness Goals
          </p>
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl">🏃‍♂️</span>
          </div>
          <div className="flex gap-[15vw]">
            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-3xl">$0</h1>
              <h2 className="text-[#9D9492]">Get Rewarded</h2>
              <p className="text-sm text-[#9D9492]">Start Earning</p>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-3xl">#5</h1>
              <h2 className="text-[#9D9492]">Unlock Rewards</h2>
            </div>
          </div>
        </motion.div>

        {/* Right Card */}
        <motion.div
          initial={{ opacity: 0, x: 100, rotate: 10 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-[50%] pr-[8vw] pl-[3vw] flex flex-col gap-6 pt-[8vw] pb-[6vw]"
        >
          <h1 className="font-dynapuff text-4xl text-white font-bold">
            Fitness <br></br>Challenges
          </h1>
          <p className="text-sm text-[#9D9492]">
            Join Our Fitness Program and Get Paid to Stay Active. Earn Cash
            Prizes for Completing Challenging Workouts and
          </p>
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl">🏃‍♂️</span>
          </div>
          <div className="flex text-[#9D9492] gap-[15vw] mt-[4vw]">
            <div className="flex flex-col gap-4">Explore Fitness Rewards</div>
            <div className="flex flex-col gap-4">
              Earn Crypto for <br />
              fitness
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Challenge;
