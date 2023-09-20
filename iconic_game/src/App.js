import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";
import PrivateRoute from "./Layout/PrivateRoute";
import Login from "./components/Auth/Login";
// Import your components

function App() {
  // Replace with your authentication logic (e.g., check if the user is logged in)

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Use PrivateRoute to protect routes that require authentication */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
