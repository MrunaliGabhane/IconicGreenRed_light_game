import React from "react";

import Header from "./Components/Layout/Header";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import PrivateRoute from "./Components/Layout/PrivateRoute";
import Leaderboard from "./Components/Game/Leaderboard";
import Footer from "./Components/Layout/Footer";

import { Route, Routes } from "react-router-dom";
import GreenLightRedLight from "./Components/Game/GreenLightRedLight";

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
        <Route
          path="/"
          element={
            <PrivateRoute>
              <GreenLightRedLight />
            </PrivateRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <PrivateRoute>
              <Leaderboard />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
