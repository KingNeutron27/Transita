import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Token from "./Pages/Token";
import Verified from "./components/Verified";
import Login from "./Pages/Login";
import Resetpassword from "./Pages/Resetpassword";
import InsertResetPassword from "./Pages/InsertResetPassword";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/token" element={<Token />} />
          <Route path="/verified" element={<Verified />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resetpassword" element={<Resetpassword />} />
          <Route path="/enterResetPassword" element={<InsertResetPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
