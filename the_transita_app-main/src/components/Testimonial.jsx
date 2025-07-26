import React from "react";
import aprostrophe from "../assets/images/aprostophe.png";
import { testimonialData } from "../data/db";

const Testimonial = () => {
  // Double the testimonials for smooth loop
  const loopedTestimonials = [...testimonialData, ...testimonialData];

  return (
    <main className="max-w-[1250px] mx-auto py-10 pb-20 px-4 sm:px-6 flex flex-col gap-10 items-center overflow-hidden">
      <h1 className="text-2xl sm:text-3xl font-bold text-center">What our customers say</h1>

      <div className="w-full py-2 overflow-hidden">
        <div className="flex gap-4 sm:gap-6 md:gap-10 scroll-animation hover:[animation-play-state:paused] active:[animation-play-state:paused] whitespace-nowrap">
          {loopedTestimonials.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[280px] sm:w-70 md:w-80 bg-white rounded-xl shadow-lg sm:shadow-xl px-5 py-4 whitespace-normal"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-base sm:text-lg text-gray-800">
                  {item.subject}
                </span>
                <img src={aprostrophe} alt="quote" className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <p className="text-xs sm:text-sm text-gray-600">{item.desc}</p>
              <div className="mt-3 sm:mt-4 flex gap-2 sm:gap-3 items-center">
                <img 
                  src={item.img} 
                  alt="" 
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" 
                />
                <div>
                  <h2 className="font-semibold text-gray-900 text-xs sm:text-sm">
                    {item.name}
                  </h2>
                  <span className="text-xs text-gray-500">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Testimonial;