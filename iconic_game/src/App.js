import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./Components/Auth/Register";
import PrivateRoute from "./Layout/PrivateRoute";
import Login from "./components/Auth/Login";

// Import your components

function App() {
  // Replace with your authentication logic (e.g., check if the user is logged in)

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
