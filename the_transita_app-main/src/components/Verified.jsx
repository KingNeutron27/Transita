import React from "react";
import signimg from "../assets/images/signimg.png";
import bckIcon from "../assets/images/backIcon.png";

const Verified = () => {
  return (
    <>
      <main className="max-w-[1500px] mx-auto md:grid md:grid-cols-2 md:h-screen ">
        <div className="mx-auto px-6 md:px-12 py-5 md:py-20 flex flex-col gap-10 items-center justify-between h-screen max-w-xl text-center">
          <div className="flex flex-col gap-10 items-center h-screen max-w-lg text-center">
            <img
              src={bckIcon}
              alt="Success Illustration"
              className="w-64 h-64 md:w-80 md:h-80 object-contain"
            />

            <div className="flex flex-col gap-4 items-center">
              <h1 className="text-2xl md:text-3xl font-bold text-[#003366]">
                Verification Successful
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                Your account has been successfully verified. You’re all set to
                explore and make the most of our platform.
              </p>
            </div>
          </div>
          <button className="bg-[#003366] hover:bg-[#002244] transition-colors duration-300 text-white py-3 px-8 rounded-lg text-sm md:text-base mt-4 w-full md:w-[60%]">
            Proceed to Login
          </button>
        </div>

        <div className="hidden md:block h-screen">
          <img
            src={signimg}
            alt=""
            className="h-full object-cover object-center"
          />
        </div>
      </main>
    </>
  );
};

export default Verified;
