import React from "react";
import { ourFeatures } from "../data/db.js";
import loca from "../assets/images/loca.svg";
import destination from "../assets/images/destination.svg";
import map from "../assets/images/map.png";
import route from "../assets/images/route.png";
import find from "../assets/images/find.png";
import disallowed from "../assets/images/disallowed.png";
import warning from "../assets/images/warning-sign.png";

const Features = () => {
  return (
    <main className="max-w-[1250px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-6 lg:py-6 items-center flex flex-col gap-8 ">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
        Our Features
      </h1>
      
      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch gap-4 md:gap-6 lg:gap-8 w-full">
        {ourFeatures.map((updateFeatures, index) => (
          <div
            className="flex flex-col items-center text-center h-full gap-3 md:gap-4 lg:gap-6 py-6 md:py-8 lg:py-12 px-4 md:px-6 rounded-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105"
            key={index}
            style={{ background: updateFeatures.bg }}
          >
            <img 
              src={updateFeatures.img} 
              className="w-8 md:w-10 lg:w-12 h-8 md:h-10 lg:h-12 object-contain"
              alt={`${updateFeatures.title} icon`}
            />
            <h2 className="font-semibold text-lg md:text-xl lg:text-2xl leading-tight">
              {updateFeatures.title}
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              {updateFeatures.description}
            </p>
          </div>
        ))}
      </div>
      
      {/* Location Input Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-6 lg:gap-10 w-full">
        <div className="relative w-full">
          <img 
            src={loca} 
            alt="Location icon" 
            className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 z-10" 
          />
          <input
            type="text"
            placeholder="My location"
            className="w-full pl-10 pr-4 py-3 md:py-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-transparent transition-all duration-200"
          />
        </div>
        <div className="relative w-full">
          <img 
            src={destination} 
            alt="Destination icon" 
            className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 z-10" 
          />
          <input
            type="text"
            placeholder="Destination"
            className="w-full pl-10 pr-4 py-3 md:py-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>
      
      {/* Find Routes Button */}
      <button className="bg-[#003366] hover:bg-[#001F4D] py-3 md:py-4 px-8 md:px-12 lg:px-16 text-white rounded-lg cursor-pointer font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg text-base md:text-lg">
        Find routes
      </button>

      <div className="w-full rounded-lg overflow-hidden shadow-lg">
        <img
          src={map}
          alt="Interactive map showing routes and locations"
          className="w-full h-[15rem] sm:h-[20rem] md:h-[25rem] lg:h-[30rem] object-cover"
        />
      </div>
      
      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 w-full px-0 sm:px-4 md:px-6 lg:px-12">
        <button className="bg-[#003366] hover:bg-[#001F4D] py-2 w-full text-white rounded-lg cursor-pointer shadow-sm transition-all duration-300 flex flex-col items-center justify-center gap-2 group hover:shadow-lg hover:transform hover:scale-105">
          <img 
            src={route} 
            alt="Compare routes icon" 
            className="w-6 md:w-7 lg:w-8 h-6 md:h-7 lg:h-8 group-hover:scale-110 transition-transform duration-200"
          />
          <span className="text-sm md:text-base lg:text-lg font-medium">
            Compare routes
          </span>
        </button>
        
        <button className="bg-[#003366] hover:bg-[#001F4D] py-2 w-full text-white rounded-lg cursor-pointer shadow-sm transition-all duration-300 flex flex-col items-center justify-center gap-2 md:gap-3 group hover:shadow-lg hover:transform hover:scale-105">
          <img 
            src={find} 
            alt="Find parking icon" 
            className="w-6 md:w-7 lg:w-8 h-6 md:h-7 lg:h-8 group-hover:scale-110 transition-transform duration-200"
          />
          <span className="text-sm md:text-base lg:text-lg font-medium">
            Find parking
          </span>
        </button>
        
        <button className="bg-[#003366] hover:bg-[#001F4D] py-2 w-full text-white rounded-lg cursor-pointer shadow-sm transition-all duration-300 flex flex-col items-center justify-center gap-2 md:gap-3 group hover:shadow-lg hover:transform hover:scale-105">
          <img 
            src={warning} 
            alt="Traffic disruption icon" 
            className="w-6 md:w-7 lg:w-8 h-6 md:h-7 lg:h-8 group-hover:scale-110 transition-transform duration-200"
          />
          <span className="text-sm md:text-base lg:text-lg font-medium">
            Disruptions
          </span>
        </button>
        
        <button className="bg-[#003366] hover:bg-[#001F4D] py-4 w-full text-white rounded-lg cursor-pointer shadow-sm transition-all duration-300 flex flex-col items-center justify-center gap-2 md:gap-3 group hover:shadow-lg hover:transform hover:scale-105">
          <img 
            src={disallowed} 
            alt="Report incident icon" 
            className="w-6 md:w-7 lg:w-8 h-6 md:h-7 lg:h-8 group-hover:scale-110 transition-transform duration-200"
          />
          <span className="text-sm md:text-base lg:text-lg font-medium">
            Report Incident
          </span>
        </button>
      </div>
    </main>
  );
};

export default Features;