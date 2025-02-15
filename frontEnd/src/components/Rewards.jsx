import React from "react";

const FitnessRewards = () => {
  return (
    <div className="bg-[#121416] relative min-h-screen flex flex-col items-center p-8 mt-[6vw]">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-white text-4xl md:text-5xl font-dynapuff">
          Unlock Fitness Rewards
        </h1>
        <p className="text-gray-400 mt-2 text-lg">
          Earn Cash for Completing Fitness Challenges. Join Our Exclusive
          Program and Start
          <br />
          Your Journey to a Healthier, Wealthier You
        </p>
      </div>

      <img
        src="https://cdn-imgs.dora.run/design/JDRmO4CRdI9GUqSiGWIGMU.webp/w/4096/h/4096/format/webp?"
        alt=""
        className="object-cover"
      />
      {/* Cards */}
      <div className="flex w-[80vw] justify-between items-center md:flex-row gap-8">
        {/* Left Card */}
        <div className="absolute top-[38vw] bg-[#2C2C2C] p-8 rounded-xl shadow-lg w-80 md:w-[30vw]">
          <h2 className="text-red-500 text-xl font-bold">Get Rewarded</h2>
          <p className="text-[#7B7A7A] mt-2 text-lg ">
            Unlock <br /> Cash Prizes <br /> for Fitness
          </p>
        </div>

        {/* Right Card */}
        <div className="absolute top-[38vw] h-[13vw] right-[8vw] bg-[#2C2C2C] p-10 rounded-xl shadow-lg w-72 md:w-[30vw] flex items-center justify-between">
          <span className="text-[#7B7A7A] text-lg">Start Earning</span>
          <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-[3vw]">🏃‍♂️</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitnessRewards;
