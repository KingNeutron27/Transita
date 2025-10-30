import { Github, Linkedin, Instagram, Phone, Mail, Twitter } from "lucide-react";
import logo from "../assets/images/logo.png";

const Footer = () => {
  return (
    <main className="max-w-full mx-auto">
      {/* Main Footer Content */}
      <div className="px-5 md:px-20 bg-[#2A5243] pt-16 md:pt-24 pb-12 md:pb-16">
        <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          
          {/* Brand Section */}
          <div className="flex flex-col items-start gap-4 md:gap-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110">
              <img src={logo} alt="Transita logo" className="w-10 h-10 md:w-12 md:h-12" />
            </div>
            <span className="text-white text-lg md:text-xl font-light leading-relaxed">
              Smarter. Simpler.<br />
              commute
            </span>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4 md:gap-6 text-white">
            <h2 className="text-xl md:text-2xl font-semibold border-b-2 border-white/30 pb-2 inline-block">Quick Links</h2>
            <ul className="flex flex-col gap-3 text-base md:text-lg">
              <li className="cursor-pointer hover:translate-x-2 hover:text-gray-200 transition-all duration-200 flex items-center gap-2 group">
                <span className="w-0 h-0.5 bg-white group-hover:w-4 transition-all duration-300"></span>
                Home
              </li>
              <li className="cursor-pointer hover:translate-x-2 hover:text-gray-200 transition-all duration-200 flex items-center gap-2 group">
                <span className="w-0 h-0.5 bg-white group-hover:w-4 transition-all duration-300"></span>
                Features
              </li>
              <li className="cursor-pointer hover:translate-x-2 hover:text-gray-200 transition-all duration-200 flex items-center gap-2 group">
                <span className="w-0 h-0.5 bg-white group-hover:w-4 transition-all duration-300"></span>
                About
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="flex flex-col gap-4 md:gap-6 text-white">
            <h2 className="text-xl md:text-2xl font-semibold border-b-2 border-white/30 pb-2 inline-block">Legal</h2>
            <ul className="flex flex-col gap-3 text-base md:text-lg">
              <li className="cursor-pointer hover:translate-x-2 hover:text-gray-200 transition-all duration-200 flex items-center gap-2 group">
                <span className="w-0 h-0.5 bg-white group-hover:w-4 transition-all duration-300"></span>
                Terms of service
              </li>
              <li className="cursor-pointer hover:translate-x-2 hover:text-gray-200 transition-all duration-200 flex items-center gap-2 group">
                <span className="w-0 h-0.5 bg-white group-hover:w-4 transition-all duration-300"></span>
                Privacy policy
              </li>
              <li className="cursor-pointer hover:translate-x-2 hover:text-gray-200 transition-all duration-200 flex items-center gap-2 group">
                <span className="w-0 h-0.5 bg-white group-hover:w-4 transition-all duration-300"></span>
                Cookie settings
              </li>
            </ul>
          </div>

          {/* Contact & Social Section */}
          <div className="flex flex-col gap-4 md:gap-6 text-white">
            <h2 className="text-xl md:text-2xl font-semibold border-b-2 border-white/30 pb-2 inline-block">Connect</h2>
            
            {/* Contact Info */}
            <div className="flex flex-col gap-3 text-base md:text-lg">
              <a 
                href="tel:+2348141656446" 
                className="flex items-center gap-3 hover:text-gray-200 transition-all duration-200 group"
              >
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-green-500 transition-all duration-300">
                  <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-sm md:text-base">+234 800 111 2446</span>
              </a>
              <a 
                href="mailto:transitacare@gmail.com" 
                className="flex items-center gap-3 hover:text-gray-200 transition-all duration-200 group"
              >
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-red-500 transition-all duration-300">
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-sm md:text-base break-all">transitacare@gmail.com</span>
              </a>
            </div>

            {/* Social Links with Brand Colors */}
            <div>
              <div className="flex gap-3">
                {/* GitHub */}
                <a 
                  href="https://github.com/kingNeutron27" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-[#333] hover:shadow-lg hover:shadow-gray-900/50 group"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5 transition-colors" />
                </a>
                
                {/* LinkedIn */}
                <a 
                  href="https://linkedin.com/in/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-[#0A66C2] hover:shadow-lg hover:shadow-blue-600/50 group"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 transition-colors" />
                </a>
                
                {/* Twitter/X */}
                <a 
                  href="https://twitter.com/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-[#1DA1F2] hover:shadow-lg hover:shadow-sky-500/50 group"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5 transition-colors" />
                </a>
                
                {/* Instagram */}
                <a 
                  href="https://instagram.com/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] hover:shadow-lg hover:shadow-pink-500/50 group"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 transition-colors" />
                </a>
              </div>
            </div>
          </div>

        </nav>
      </div>

      {/* Copyright Section */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-6 md:py-8 w-full border-t border-white/10">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4">
          <div className="flex items-center gap-2 text-sm md:text-base">
            <span>&copy;</span>
            <span>2025 Transita. All rights reserved</span>
          </div> 
        </div>
      </footer>
    </main>
  );
};

export default Footer;