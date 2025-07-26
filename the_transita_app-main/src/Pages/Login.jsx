import React from "react";
import signimg from "../assets/images/signimg.png";
import logo from "../assets/images/logo.png";

const Login = () => {
  return (
    <>
      <main className="max-w-[1500px] mx-auto flex flex-col md:grid md:grid-cols-2 md:h-screen">
        <div className="md:h-screen flex flex-col px-4 md:px-12 lg:px-20 pt-3 md:pt-12 gap-5 order-2 md:order-1">
          <div className="hidden md:flex flex-row items-center gap-2">
            <img src={logo} alt="" className="w-10 h-10" />
            <span className="text-xl">Transita</span>
          </div>
          <h1>Welcome Back, Please login to your account</h1>
          <span className="">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Input email address"
              className="w-full border px-3 py-3 rounded-lg focus:outline-none"
            />
          </span>
          <span className="">
            <label htmlFor="email">Password</label>
            <input
              type="password"
              placeholder="Input password"
              className="w-full border px-3 py-3 rounded-lg focus:outline-none"
            />
          </span>
          <div className="flex flex-row justify-between text-gray-700">
            <span className="flex  flex-row gap-1">
              <input type="checkbox" className=" accent-[#029664] " />
              <span>Remeber me</span>
            </span>
            <a>Forgot password?</a>
          </div>
          <div className="flex flex-row gap-5 justify-between">
            <button className="w-full bg-[#003366] py-2 rounded text-white">
              Login
            </button>
            <button className="w-full border border-black py-2 rounded">
              Sign Up
            </button>
          </div>
        </div>
        <div className="md:h-screen order-1">
          <div className="flex flex-row items-center gap-1 justify-center py-3 md:hidden bg-[#003366]">
            <img src={logo} alt="" className="w-8 h-8" />
            <span className="text-white">Transita</span>
          </div>
          <img
            src={signimg}
            alt=""
            className="md:h-screen h-[10rem] w-full object-cover object-center"
          />
        </div>
      </main>
    </>
  );
};

export default Login;
