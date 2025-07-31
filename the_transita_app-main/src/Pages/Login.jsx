import { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, User } from "lucide-react";
import signimg from "../assets/images/signimg.png";
import logo from "../assets/images/logo.png";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { loginWithFirebase, loginWithGoogle, handleGoogleRedirectResult } from "../FirebaseConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate()

  // Handle Google redirect result 
  useEffect(() => {
    const handleRedirect = async () => {
      try {
        await handleGoogleRedirectResult();
      } catch (error) {
        console.error('Error handling redirect:', error);
      }
    };

    handleRedirect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const userAuth = async (e) => {
    e.preventDefault(); 
    const { email, password } = formData;
    
    if (!email || !password) {
      return toast.error('Please fill all inputs');
    }
    
    try {
      setLoading(true);
      await loginWithFirebase(email, password);
      
      // Clear form after successful login
      setFormData({
        email: '',
        password: '',
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      await loginWithGoogle();
    } catch (error) {
      console.error('Google login failed:', error);
    } finally {
      setGoogleLoading(false);
    }
  };


  return (
    <main className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Left side - Form */}
      <div className="flex flex-col w-full lg:w-1/2 p-4 sm:p-6 md:p-8 lg:p-16 justify-center order-2 lg:order-1">
        <div className="max-w-md w-full mx-auto">
          <div className="hidden lg:flex items-center gap-3 mb-8 md:mb-12">
            <img src={logo} alt="Transita logo" className="h-10 md:h-12" />
            <span className="font-semibold text-2xl md:text-3xl text-gray-800">
              Transita
            </span>
          </div>
          
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Welcome back
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Please sign in to your account to continue
            </p>
          </div>
          
          <form onSubmit={userAuth} className="space-y-4 sm:space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  disabled={loading || googleLoading}
                  className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  disabled={loading || googleLoading}
                  className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading || googleLoading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
              </div>
            </div>

            {/* Remember me and Forgot password */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading || googleLoading}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <span className="text-sm text-gray-700">Remember me</span>
              </label>
              <button 
                type="button"
                disabled={loading || googleLoading}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Forgot password?
              </button>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button 
                type="submit"
                disabled={loading || googleLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 sm:py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-200 shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              
              <button 
                type="button"
                onClick={() => navigate('/signup')}
                disabled={loading || googleLoading}
                className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-2.5 sm:py-3 px-6 rounded-xl transition-all duration-200 hover:bg-gray-50 flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <User className="w-4 h-4" />
                Create Account
              </button>
            </div>
          </form>

          {/* Social Login Divider */}
          <div className="relative my-4 sm:my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-br from-slate-50 to-blue-50 text-gray-500 text-xs sm:text-sm">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <button 
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading || googleLoading}
              className="flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {googleLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-400 border-t-transparent"></div>
              ) : (
                <FcGoogle className="w-4 h-4 sm:w-5 sm:h-5"/>
              )}
              <span className="text-xs sm:text-sm font-medium text-gray-700">
                {googleLoading ? 'Loading...' : 'Google'}
              </span>
            </button>
            
            <button 
              type="button"
              disabled={loading || googleLoading}
              className="flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaFacebook className="w-4 h-4 sm:w-5 sm:h-5" fill="#1877F2" />
              <span className="text-xs sm:text-sm font-medium text-gray-700">Facebook</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Right side - Image */}
      <div className="w-full lg:w-1/2 relative order-1 lg:order-2">
        {/* Mobile Logo */}
        <div className="flex lg:hidden items-center justify-center gap-2 py-4 bg-gradient-to-r from-blue-600 to-blue-700">
          <img src={logo} alt="Transita logo" className="h-10 sm:h-12" />
          <span className="text-white font-bold text-base sm:text-lg">Transita</span>
        </div>
        
        <div className="relative h-64 sm:h-80 md:h-96 lg:h-full">
          <img 
            src={signimg} 
            alt="illustration" 
            className="object-cover object-center w-full h-full lg:max-h-[120vh]" 
          />
        </div>
      </div>
    </main>
  );
};

export default Login;