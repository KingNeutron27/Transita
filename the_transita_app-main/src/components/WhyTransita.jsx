import React from "react";
import why1 from "../assets/images/why1.jpg";
import why2 from "../assets/images/why2.jpg";
import why3 from "../assets/images/why3.jpg";
import why4 from "../assets/images/why4.jpg";

const WhyTransita = () => {
  return (
    <main className="max-w-[1250px] px-4 sm:px-6 md:px-8 lg:px-12 mx-auto flex flex-col gap-8 md:gap-12 lg:gap-8 text-left py-12 md:py-16 lg:py-20 font-sans">
      {/* Title Section */}
      <div className="text-center md:text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-[#003366] leading-tight">
          Why Transita is the best choice for you
        </h1>
      </div>

      {/* Main Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Left Column - Stacked on mobile, 2/3 on desktop */}
        <div className="lg:col-span-2 flex flex-col gap-6 md:gap-8">
          {/* Top Row - Two Cards Side by Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {/* Card 1 */}
            <div className="relative group overflow-hidden rounded-2xl shadow-lg">
              <div
                className="h-64 sm:h-72 md:h-80 bg-cover bg-center transition-all duration-700 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url(${why1})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end text-white">
                  <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 leading-tight">
                    Built for city commuters
                  </h2>
                  <p className="text-sm md:text-base leading-relaxed opacity-90">
                    We understand the chaos of urban travel. Our site is tailored for real-world city movement — fast, flexible, and frustration-free.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative group overflow-hidden rounded-2xl shadow-lg">
              <div
                className="h-64 sm:h-72 md:h-80 bg-cover bg-center transition-all duration-700 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url(${why2})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end text-white">
                  <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 leading-tight">
                    Real-Time, Not Guesswork
                  </h2>
                  <p className="text-sm md:text-base leading-relaxed opacity-90">
                    No outdated info here. From traffic to parking, we give you up-to-the-minute data you can actually trust.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row - Full Width Card */}
          <div className="relative group overflow-hidden rounded-2xl shadow-lg">
            <div
              className="w-full h-64 md:h-80 lg:h-96 bg-cover bg-center transition-all duration-700 ease-out group-hover:scale-110"
              style={{ backgroundImage: `url(${why4})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 p-4 md:p-6 lg:p-8 flex flex-col justify-end text-white">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 lg:mb-6 leading-tight">
                  Smarter commute planning
                </h2>
                <p className="text-sm md:text-base lg:text-lg leading-relaxed opacity-90 max-w-2xl">
                  Compare routes, switch modes, beat delays. We don't just guide you — we help you choose the best possible way to move.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Full height on desktop */}
        <div className="relative group overflow-hidden rounded-2xl shadow-lg">
          <div
            className="h-64 sm:h-80 md:h-96 lg:h-full lg:min-h-[32rem] bg-cover bg-center transition-all duration-700 ease-out group-hover:scale-110"
            style={{ backgroundImage: `url(${why3})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute inset-0 p-4 md:p-6 lg:p-8 flex flex-col justify-end text-white">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 lg:mb-6 leading-tight">
                Simple powerful experience
              </h2>
              <p className="text-sm md:text-base lg:text-lg leading-relaxed opacity-90 max-w-sm">
                Clean design, intuitive clicks. Everything just works — so you can focus on getting there.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WhyTransita;