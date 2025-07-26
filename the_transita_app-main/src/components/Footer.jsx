import logo from "../assets/images/logo.png";

const Footer = () => {
  return (
    <main className="max-w-full mx-auto">
      <div className="px-5 md:px-20 bg-[#2A5243] pt-16 md:pt-24 pb-16 md:pb-20">
        <nav className="grid grid-cols-2 md:flex md:flex-row justify-between items-start gap-12 md:gap-8">
          <div className="flex flex-col items-start gap-4 md:gap-6 col-span-2 md:col-span-1">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center">
              <img src={logo} alt="logo" className="w-10 h-10 md:w-12 md:h-12" />
            </div>
            <span className="text-white text-lg md:text-xl font-light leading-relaxed">
              Smarter. Simpler.<br />
              commute
            </span>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col gap-4 md:gap-6 text-white">
            <h2 className="text-xl md:text-2xl font-medium">Quick Links</h2>
            <ul className="flex flex-col gap-3 md:gap-4 text-base md:text-lg">
              <li className="cursor-pointer hover:underline transition-all duration-200">
                Home
              </li>
              <li className="cursor-pointer hover:underline transition-all duration-200">
                features
              </li>
              <li className="cursor-pointer hover:underline transition-all duration-200">
                about
              </li>
              <li className="cursor-pointer hover:underline transition-all duration-200">
                contact
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="flex flex-col gap-4 md:gap-6 text-white">
            <h2 className="text-xl md:text-2xl font-medium">Legal</h2>
            <ul className="flex flex-col gap-3 md:gap-4 text-base md:text-lg">
              <li className="cursor-pointer hover:underline transition-all duration-200">
                Terms of service
              </li>
              <li className="cursor-pointer hover:underline transition-all duration-200">
                Privacy policy
              </li>
              <li className="cursor-pointer hover:underline transition-all duration-200">
                Cookie settings
              </li>
            </ul>
          </div>

          {/* Empty Fourth Column for Balance */}
          <div className="hidden md:flex flex-col gap-4 md:gap-6 text-white">
          </div>
        </nav>
      </div>

      {/* Copyright Section */}
      <footer className="bg-gray-800 text-white py-10 w-full">
        <div className="flex justify-center items-center">
          <div className="flex items-center gap-1 text-sm md:text-base">
            <span>&copy;</span>
            <span>2025. All right reserved</span>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Footer;