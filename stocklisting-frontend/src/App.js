import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import LoginForm from "./components/Auth/LoginForm";
import RegistrationForm from "./components/Auth/RegistrationForm";
import StockDashboard from "./components/Stockdashboard";
import ViewWishlist from "./components/ViewWishlist";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    // Clear the user state
    setUser(null);
  };
  return (
    <div>
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/stock-dashboard" element={<StockDashboard />} />
        <Route path="/view-wishlist" element={<ViewWishlist />} />
      </Routes>
    </div>
  );
};

export default App;
