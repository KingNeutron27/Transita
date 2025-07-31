import logo from "../assets/images/logo.png";
import signimg from "../assets/images/signimg.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, CheckCircle, XCircle } from "lucide-react";
import { signupWithFirebase } from "../FirebaseConfig"; // Removed auth import since it's not needed here
import { toast } from "react-toastify";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validatePassword = (password) => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    return checks;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const signUpAuth = async (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword } = formData;

    // Validation
    if (!fullName || !email || !password || !confirmPassword) {
      return toast.error('Please fill all inputs');
    }

    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    // Check password strength
    const passwordChecks = validatePassword(password);
    if (!passwordChecks.length || !passwordChecks.uppercase || !passwordChecks.lowercase || !passwordChecks.number) {
      return toast.error('Password must meet all requirements');
    }

    try {
      setLoading(true);
      await signupWithFirebase(fullName, email, password);
      
      // Clear form after successful signup
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const passwordChecks = validatePassword(formData.password);
  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;

  return (
    <section className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Left side - Form */}
      <div className="flex flex-col w-full lg:w-1/2 p-4 sm:p-6 md:p-8 lg:p-12 justify-center order-2 lg:order-1">
        <div className="max-w-md w-full mx-auto">
          {/* Logo - Visible only on desktop */}
          <div className="hidden lg:flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center">
              <img src={logo} alt="Transita logo" className="h-6 sm:h-8" />
            </div>
            <span className="font-semibold text-xl sm:text-2xl md:text-3xl">
              Transita
            </span>
          </div>
          
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 mb-2 bg-clip-text text-transparent">
              Create your account
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">
              Join thousands of users and get started in minutes
            </p>
          </div>
          
          <form onSubmit={signUpAuth} className="space-y-4 sm:space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Full name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  disabled={loading}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>
            
            {/* Email */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  disabled={loading}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>
            
            {/* Password */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input 
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="Create a password"
                  className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2 space-y-1.5">
                  <div className="flex gap-1">
                    {[passwordChecks.length, passwordChecks.uppercase, passwordChecks.lowercase, passwordChecks.number].map((check, index) => (
                      <div 
                        key={index}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          check ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-[0.65rem] sm:text-xs text-gray-500">
                    <div className={`flex items-center gap-1 ${passwordChecks.length ? 'text-green-600' : ''}`}>
                      {passwordChecks.length ? <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <XCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                      8+ chars
                    </div>
                    <div className={`flex items-center gap-1 ${passwordChecks.uppercase ? 'text-green-600' : ''}`}>
                      {passwordChecks.uppercase ? <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <XCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                      Uppercase
                    </div>
                    <div className={`flex items-center gap-1 ${passwordChecks.lowercase ? 'text-green-600' : ''}`}>
                      {passwordChecks.lowercase ? <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <XCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                      Lowercase
                    </div>
                    <div className={`flex items-center gap-1 ${passwordChecks.number ? 'text-green-600' : ''}`}>
                      {passwordChecks.number ? <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <XCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                      Number
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Confirm Password */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input 
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  disabled={loading}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className={`w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed ${
                    formData.confirmPassword && !passwordsMatch ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
              </div>
              {formData.confirmPassword && (
                <div className={`mt-1 flex items-center gap-1 text-[0.65rem] sm:text-xs ${passwordsMatch ? 'text-green-600' : 'text-red-600'}`}>
                  {passwordsMatch ? <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <XCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                  {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2 sm:py-2.5 px-4 rounded-lg transition-all duration-200 hover:scale-[1.02] focus:ring-2 focus:ring-blue-200 shadow mt-4 sm:mt-5 text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>

            {/* Sign in link */}
            <p className="text-center text-gray-600 text-xs sm:text-sm mt-4">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-700 transition-colors">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
      
      {/* Right side - Illustration */}
      <div className="w-full lg:w-1/2 relative order-1 lg:order-2">
        {/* Mobile Logo - Visible only on mobile */}
        <div className="flex lg:hidden items-center justify-center gap-2 sm:gap-3 py-4 bg-gradient-to-r from-blue-600 to-blue-700">
          <img src={logo} alt="Transita logo" className="h-8 sm:h-10" />
          <span className="text-white font-bold text-base sm:text-lg">Transita</span>
        </div>
        
        <div className="h-64 sm:h-80 md:h-96 lg:h-full bg-white">
          <img 
            src={signimg} 
            alt="Illustration" 
            className="object-cover w-full h-full lg:max-h-[100vh]" 
          />
        </div>
      </div>
    </section>
  );
};

export default Signup;