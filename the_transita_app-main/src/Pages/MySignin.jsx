import { useState } from "react";
import logo from "../assets/images/logo.png";
import signimg from "../assets/images/signimg.png";
import { Link } from "react-router-dom";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";

function MySignin ()  {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleInputChange = (e) => {
   const { name, value } = e.target
   setFormData(prev => ({
    ...prev,
    [name] : value
   }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      return alert('Please input all fields')
    }
   
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    return alert('Details correct')
  }

  const validatePassword = (password) => {
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      symbols: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      digit: /\d/.test(password)
    }
    return checks
  }

  const passwordChecks = validatePassword(formData.password)

  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword

  return (
    <section className="min-h-screen flex font-sans">
      {/* Left side - Form */}
      <div className="flex flex-col w-1/2 p-16">
        <div className="flex items-center gap-2 mb-8">
          <img src={logo} alt="logo" className="w-18" />
          <span className="font-semibold text-2xl">Transita</span>
        </div>
        
        <div className="text-base">
          <h1 className="text-xl mb-4">Get started in minutes - create your account</h1>
          
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="font-semibold">Full name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full name"
                className="border border-[#1B1B1B] py-2 px-4 rounded-lg"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="font-semibold">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="border border-[#1B1B1B] py-2 px-4 rounded-lg"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="font-semibold">Password</label>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="border border-[#1B1B1B] py-2 px-4 rounded-lg"
              />
            </div>

            {
              formData.password && (
                <div className="">
                  <div className="flex gap-1">
                    {[passwordChecks.length, passwordChecks.lowercase, passwordChecks.uppercase, passwordChecks.digit, passwordChecks.symbols].map((check, i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-colors w-full ${
                          check ? 'bg-green-500' : 'bg-gray-200'
                        }`}>
                      </div>
                   ))}
                  </div>
                   <div className="grid grid-cols-5 gap-1 text-xs text-gray-500 mt-5">
                      <span className={passwordChecks.length ? 'text-green-500': 'text-gray-500'}>
                        {passwordChecks.length ? <CheckCircle /> : <XCircle />} 8+ chars
                      </span>
                      <span className={passwordChecks.lowercase ? 'text-green-500': 'text-gray-500'}>
                        {passwordChecks.lowercase ? <CheckCircle /> : <XCircle />} lowercase
                      </span>
                      <span className={passwordChecks.uppercase ? 'text-green-500': 'text-gray-500'}>
                        {passwordChecks.uppercase ? <CheckCircle /> : <XCircle />} uppercase
                      </span>
                      <span className={passwordChecks.digit ? 'text-green-500': 'text-gray-500'}>
                        {passwordChecks.digit ? <CheckCircle /> : <XCircle />} digits
                      </span>
                      <span className={passwordChecks.symbols ? 'text-green-500': 'text-gray-500'}>
                        {passwordChecks.symbols ? <CheckCircle /> : <XCircle />} symbols
                      </span>
                    </div>
                </div>
              )}
            
            <div className="flex flex-col">
              <label className="font-semibold">Confirm Password</label>
              <input 
                type="password"  
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm Password"
                className="border border-[#1B1B1B] py-2 px-4 rounded-lg"
              />
            </div>

            <button 
              type="submit" 
              className="px-5 py-3 bg-[#003366] text-white font-semibold mt-6 rounded-lg hover:bg-[#002244] transition-colors"
            >
              Continue
            </button>

            <p className="text-center">
              Already have an account?{" "}
              <Link to="/login" className="underline text-[#0366c9] hover:text-[#024b94]">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
      
      {/* Right side - Image */}
      <div className="w-1/2 bg-gray-50 max-h-[120vh]">  
        <img 
          src={signimg} 
          alt="Sign up illustration" 
          className="object-cover object-center w-full h-full"
        />
      </div>
    </section>
  );
};

export default MySignin;