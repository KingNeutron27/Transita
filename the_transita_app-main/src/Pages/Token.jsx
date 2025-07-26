import React, { useRef } from "react";
import logo from "../assets/images/logo.png";
import signimg from "../assets/images/signimg.png";
import bckIcon from "../assets/images/backIcon.png";

const Token = () => {
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Optional: Prevent non-digits
    if (!/^\d*$/.test(value)) {
      e.target.value = "";
    }
  };
  return (
    <main className="max-w-[1500px] mx-auto md:grid md:grid-cols-2 md:h-screen">
      <div className="flex flex-col justify-between gap-10 h-screen py-5 md:py-20 mx-4 md:mx-12">
        <div className="flex flex-col gap-10 w-full">
          <div className="flex flex-row  items-center justify-between">
            <span className="flex flex-row items-center gap-1">
              <img src={bckIcon} className="w-5 h-5" alt="" />
              <span>Back</span>
            </span>
            <img src={logo} alt="" className="w-10 h-10" />
          </div>
          <div className="mx-auto w-full max-w-[100%] md:max-w-[70%] flex flex-col gap-5">
            <h1>Verify your account</h1>
            <h3>
              We sent a code to your email address. Enter it her to verify
            </h3>
            <div className="flex flex-row gap-5">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <input
                    type="text"
                    maxLength={1}
                    ref={(el) => (inputRefs.current[i] = el)}
                    key={1}
                    className="bg-gray-200 w-10 h-10 rounded text-center semi-bold focus:outline-none"
                    onChange={(e) => handleChange(e, i)}
                  />
                ))}
            </div>
            <a>Resend code?</a>
          </div>
        </div>
        <button className="bg-[#003366] justify-end w-full mt-0 md:mt-20 mb-5 py-4 text-white rounded-lg ">
          Continue
        </button>
      </div>
      <div className="hidden md:block">
        <img
          src={signimg}
          alt=""
          className="w-full h-[10rem] md:h-full object-cover object-center"
        />
      </div>
    </main>
  );
};

export default Token;
