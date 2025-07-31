import { useState, useEffect, useRef } from "react";
import bgImg from "../assets/images/headebg.jpg";
import logo from "../assets/images/logo.png";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../FirebaseConfig";
import { toast } from "react-toastify";
import { User, LogOut, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const menuItems = ["Home", "Traffic updates", "Parking finder", "Transit options"];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    // Changed from 'click' to 'mousedown' to fix desktop logout issue
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logout successful");
      setDropdownOpen(false);
      navigate("/login");
    } catch (error) {
      toast.error(`Logout failed: ${error.message}`);
    }
  };

  const getUserDisplayName = () => {
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split("@")[0];
    return "User";
  };

  const getUserAvatar = () => {
    if (user?.photoURL) return user.photoURL;
    return null;
  };

  return (
    <main
      className="relative bg-cover bg-center min-h-screen w-full flex flex-col"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url(${bgImg})`
      }}
    >
      {/* Desktop Navigation */}
      <div className="hidden lg:block py-10 px-6 xl:px-12">
        <div className="flex flex-row relative z-10">
          <div className="flex flex-row justify-between w-full items-center bg-white px-4 xl:px-8 py-4 rounded-4xl shadow-lg">
            <div className="flex flex-row items-center gap-2">
              <img src={logo} className="w-8 h-8 xl:w-10 xl:h-10 rounded-full border-2 border-white transition-transform duration-300 hover:scale-110" alt="logo" />
              <span className="font-medium text-sm xl:text-base">Transita</span>
            </div>

            <ul className="flex flex-row gap-4 xl:gap-7 items-center text-sm xl:text-lg">
              {menuItems.map((item) => (
                <li key={item} className="relative group cursor-pointer">
                  <span className="transition-all duration-300 ease-out hover:text-[#003366] hover:font-semibold group-hover:transform group-hover:-translate-y-0.5">
                    {item}
                  </span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#003366] transition-all duration-300 ease-out group-hover:w-full"></div>
                </li>
              ))}
            </ul>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 xl:gap-3 py-2 px-3 xl:px-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300 ease-out hover:shadow-md"
                >
                  <div className="flex items-center gap-2">
                    {getUserAvatar() ? (
                      <img
                        src={getUserAvatar()}
                        alt="Profile"
                        className="w-7 h-7 xl:w-8 xl:h-8 rounded-full object-cover border-2 border-gray-200"
                      />
                    ) : (
                      <div className="w-7 h-7 xl:w-8 xl:h-8 rounded-full bg-[#003366] flex items-center justify-center">
                        <User className="w-4 h-4 xl:w-5 xl:h-5 text-white" />
                      </div>
                    )}
                    <span className="text-sm xl:text-base font-medium text-gray-700 max-w-24 xl:max-w-32 truncate">
                      {getUserDisplayName()}
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 xl:w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">{getUserDisplayName()}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLogout();
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a
                className="text-white bg-[#003366] hover:bg-[#002244] py-2 px-4 xl:px-6 rounded-lg cursor-pointer transition-all duration-300 ease-out hover:shadow-lg hover:transform hover:scale-105 hover:shadow-[#003366]/25 text-sm xl:text-base"
                href="/login"
              >
                Sign In
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Header */}
      <header className="lg:hidden flex items-center justify-between p-4 sm:p-6 relative z-10">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <img src={logo} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover" alt="Transita logo" />
          <span className="text-white font-semibold text-base sm:text-lg">Transita</span>
        </div>

        <div className="flex items-center gap-3">
          {user && (
            <div className="flex items-center gap-2">
              {getUserAvatar() ? (
                <img src={getUserAvatar()} alt="Profile" className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-white/50" />
              ) : (
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
              )}
              <span className="text-white text-sm sm:text-base font-medium max-w-20 sm:max-w-24 truncate">
                {getUserDisplayName()}
              </span>
            </div>
          )}

          <button
            className="text-2xl sm:text-3xl text-white focus:outline-none relative z-50 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className="block w-6 h-6 relative">
              {menuOpen ? (
                <span className="absolute inset-0 flex items-center justify-center text-3xl">×</span>
              ) : (
                <span className="absolute inset-0 flex items-center justify-center">☰</span>
              )}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={toggleMenu} />
          <nav className="fixed top-0 right-0 h-screen w-full max-w-sm bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden">
            <div className="p-4 sm:p-6">
              <div className="flex justify-end mb-6 sm:mb-8">
                <button className="text-2xl sm:text-3xl text-gray-600 hover:text-gray-800 focus:outline-none p-2 min-w-[44px] min-h-[44px]" onClick={toggleMenu}>
                  ×
                </button>
              </div>

              {user && (
                <div className="mb-6 sm:mb-8 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    {getUserAvatar() ? (
                      <img src={getUserAvatar()} alt="Profile" className="w-12 h-12 rounded-full object-cover border-2 border-gray-200" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[#003366] flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900 truncate">{getUserDisplayName()}</p>
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}

              <ul className="space-y-4 sm:space-y-6">
                {menuItems.map((item) => (
                  <li key={item} className="hover:text-[#003366] transition-colors cursor-pointer py-3 text-base sm:text-lg border-b border-gray-100 hover:bg-gray-50 px-2 rounded" onClick={toggleMenu}>
                    {item}
                  </li>
                ))}
                {user ? (
                  <li className="pt-4">
                    <button onClick={handleLogout} className="flex items-center gap-2 w-full bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-md text-center">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </li>
                ) : (
                  <li className="pt-4">
                    <a href="/login" onClick={toggleMenu} className="inline-block bg-[#003366] hover:bg-[#002244] text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-md w-full text-center">
                      Sign In
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </>
      )}

      {/* Hero Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 xl:px-12 flex-1 flex items-end lg:items-start">
        <div className="hidden lg:grid grid-cols-2 gap-8 pt-4 xl:pt-16 w-full">
          <div className="flex flex-col gap-6 xl:gap-7 text-white">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium leading-tight xl:leading-tight lg:w-lg w-full">
              Make Your Daily Travel More Efficient.
            </h1>
            <p className="text-lg xl:text-xl leading-relaxed">
              Live insights on traffic flow, parking space availability and smart transport alternatives curated to streamline your urban journey.
            </p>
            <div>
              <button className="bg-[#003366] hover:bg-[#002244] py-3 xl:py-4 px-4 xl:px-5 rounded-lg cursor-pointer text-lg xl:text-xl transition-all duration-300 ease-out hover:shadow-lg hover:transform hover:scale-105 hover:shadow-[#003366]/25">
                Plan my commute
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Hero */}
        <div className="lg:hidden text-white space-y-4 sm:space-y-6 pb-8 sm:pb-12 w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
            Make Your Daily Travel More Efficient.
          </h1>
          <p className="text-base sm:text-lg opacity-90 leading-relaxed">
            Live insights on traffic flow, parking space availability, and smart transport alternatives - curated to streamline your urban journey.
          </p>
          <div>
            <a className="inline-block bg-[#003366] hover:bg-[#002244] text-white font-medium px-6 sm:px-8 py-3 rounded-lg transition-colors shadow-md text-base sm:text-lg" href="/signup">
              Plan my commute
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Header;
