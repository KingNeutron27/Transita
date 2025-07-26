import { useState } from "react";
import { questionData } from "../data/db";

const Questions = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="bg-gradient-to-br from-[#D0E7F3] to-[#E8F4F8] w-full py-8 md:py-16 px-4 sm:px-6 lg:px-16">
      <div className="max-w-[1250px] mx-auto flex flex-col gap-6 md:gap-10">
        {/* Header */}
        <div className="text-center space-y-2 md:space-y-4">
          <h1 className="text-2xl md:text-4xl font-bold text-[#003366] leading-tight">
            You got questions, we got answers
          </h1>
          <p className="text-sm md:text-base text-[#003366]/70 max-w-2xl mx-auto">
            Find answers to the most commonly asked questions about Transita
          </p>
        </div>

        {/* FAQ Accordion - Improved for mobile */}
        <div className="flex flex-col gap-3 md:gap-6">
          {questionData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl md:rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 ease-out w-full max-w-4xl mx-auto overflow-hidden border border-gray-100"
            >
              {/* Question Header - Clickable */}
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full p-3 md:p-6 text-left hover:bg-gray-50/30 transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-[#003366]/10"
                aria-expanded={openIndex === index}
                aria-controls={`answer-${index}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-900 leading-snug pr-2">
                    {item.title}
                  </h3>
                  
                  {/* Toggle Icon - Smaller on mobile */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-5 h-5 md:w-7 md:h-7 rounded-full bg-[#003366] flex items-center justify-center transition-transform duration-300 ease-out ${
                        openIndex === index ? 'rotate-180' : 'rotate-0'
                      }`}
                    >
                      <svg
                        className="w-2.5 h-2.5 md:w-3 md:h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>

              {/* Answer Content - Collapsible */}
              <div
                id={`answer-${index}`}
                className={`transition-all duration-300 ease-out overflow-hidden ${
                  openIndex === index 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-3 md:px-6 pb-3 md:pb-6 pt-0">
                  <div className="border-t border-gray-100 pt-3 md:pt-4">
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Questions;