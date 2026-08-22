import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function ProtectedRoutes() {
  console.log("Protected routes called");
  const isAuthenticated = useAuth();
  console.log("isAuthenticated = ", isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}
export default ProtectedRoutes;
