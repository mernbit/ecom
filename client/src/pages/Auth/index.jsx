import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { useAuthContext } from "../../context/AuthContext";
import ForgotPassword from "./ForgotPassword";
const Auth = () => {
  const { isAuth } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) {
      return navigate("/");
    }
  }, [isAuth]);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
};

export default Auth;
