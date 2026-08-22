import { useEffect, useState } from "react";

const useAuth = () => {
  let isAuthenticated: Boolean = false;
  const token = localStorage.getItem("token");
  if (token) isAuthenticated = true;
  return isAuthenticated;
};

export default useAuth;
