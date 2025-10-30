import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Token from "./Pages/Token";
import Verified from "./components/Verified";
import Login from "./Pages/Login";
import Resetpassword from "./Pages/Resetpassword";
import InsertResetPassword from "./Pages/InsertResetPassword";
import MySignin from "./Pages/MySignin";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./FirebaseConfig";


const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Define public routes that don't require authentication
  const publicRoutes = ['/login', '/signup', '/resetpassword', '/enterResetPassword', '/mysign'];

  // App.js - Enhanced auth state handling
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    
    setUser(currentUser);
    setLoading(false);

    const currentPath = location.pathname;

    if (currentUser) {
      if (publicRoutes.includes(currentPath)) {
        navigate('/', { replace: true });
      }
    } else {
      if (!publicRoutes.includes(currentPath)) {
        navigate('/login', { replace: true });
      }
    }
  }, (error) => {
    console.error('Auth state error:', error);
    setLoading(false);
    toast.error('Authentication error. Please try again.');
    navigate('/login', { replace: true });
  });

  return () => {
    unsubscribe();
  };
}, [navigate, location.pathname]);

  // Show loading spinner while determining auth state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home user={user} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/token" element={<Token />} />
      <Route path="/verified" element={<Verified />} />
      <Route path="/login" element={<Login />} />
      <Route path="/resetpassword" element={<Resetpassword />} />
      <Route path="/enterResetPassword" element={<InsertResetPassword />} />
      <Route path="/mysign" element={<MySignin />} />
    </Routes>
  );
};


export default App;