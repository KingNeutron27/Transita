import React from "react";

const Aboutus = () => {
  return (
    <>
      <main className="flex flex-col items-center gap-5 md:gap-10 py-10 max-w-[1250px] mx-auto">
        <h1 className="text-2xl font-bold">About us</h1>
        <div className="w-[80%] md:w-[50%] bg-[#2A5243] text-center text-white px-5 md:px-20 py-5 md:py-10">
          <p>
            Transita is built to make city commuting smarter and easier. we help
            urban travelers beat traffic, find parking, plan routes and stay
            updated- all in real time. whether you drive, take transit, or mix
            both, transita helps you move better everyday.
          </p>
        </div>
      </main>
    </>
  );
};

export default Aboutus;
