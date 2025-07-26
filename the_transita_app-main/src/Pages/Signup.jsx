import React from "react";
import logo from "../assets/images/logo.png";
import signimg from "../assets/images/signimg.png";

const Signup = () => {
  return (
    <>
      <main className="max-w-[1500px] mx-auto flex flex-col md:grid md:grid-cols-2 items-center gap-2 md:gap-20 h-screen">
        <div className="flex flex-col items-center mt-2 gap-5 max-w-full order-2 md:order-1">
          <div className="flex flex-col gap-7 md:py-3 w-full md:px-20">
            <div className="hidden md:flex flex-row items-center gap-2">
              <img src={logo} alt="" className="w-10 h-10" />
              <span>Transita</span>
            </div>
            <h1 className="text-gray-400">
              Get started in minutes- create your account
            </h1>
          </div>

          <form
            action="submit"
            className="flex flex-col gap-7 w-full  md:px-20"
          >
            <span className="flex flex-col gap-1">
              <label htmlFor="text">Full name</label>
              <input
                type="text"
                className="border py-2 w-full rounded-md px-4"
                placeholder="Input name"
              />
            </span>

            <span className="flex flex-col gap-1">
              <label htmlFor="text">Email address</label>
              <input
                type="email"
                className="border py-2 w-full rounded-md px-4"
                placeholder="Input Email address"
              />
            </span>

            <span className="flex flex-col gap-1">
              <label htmlFor="text">Password</label>
              <input
                type="password"
                className="border py-2 w-full rounded-md px-4"
                placeholder="Enter password"
              />
            </span>

            <span className="flex flex-col gap-1">
              <label htmlFor="text">Confirm password</label>
              <input
                type="password"
                className="border py-2 w-full rounded-md px-4"
                placeholder="Confirm password"
              />
            </span>

            <button className="bg-[#003366] w-full mt-10 md:mt-20 mb-5 py-4 text-white rounded-lg">
              Continue
            </button>
          </form>
        </div>

        <div className="w-full md:h-screen order-1 ">
          <div className="flex flex-row items-center gap-1 justify-center py-3 md:hidden bg-[#003366]">
            <img src={logo} alt="" className="w-8 h-8" />
            <span className="text-white">Transita</span>
          </div>
          <img
            src={signimg}
            alt=""
            className="w-full h-[10rem] md:h-full object-cover object-center"
          />
        </div>
      </main>
    </>
  );
};

export default Signup;
