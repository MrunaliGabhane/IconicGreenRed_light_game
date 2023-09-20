import React from "react";
import { Navigate, useLocation } from "react-router-dom";
const PrivateRoute = ({ children }) => {
  const isAuth = localStorage.getItem("accessToken");
  const location = useLocation();
  // console.log(location)
  if (!isAuth) {
    return <Navigate to="/login" state={location.pathname} replace />;
  }
  return children;
};
export default PrivateRoute;
