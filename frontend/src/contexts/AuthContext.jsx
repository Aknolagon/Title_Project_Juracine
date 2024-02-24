import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState, useContext } from "react";
/* eslint-disable */


export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const jwtToken = localStorage.getItem("userToken");

      if (jwtToken) {
        try {
          const decodeToken = jwtDecode(jwtToken);
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/users/${decodeToken.user}`
          );
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchData();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        { email, password }
      );

      if (response.status === 200) {
        const { token } = response.data;

        const decodeToken = jwtDecode(token);
        const userData = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/${decodeToken.user}`
        );

        setUser(userData.data);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // const logout = () => {
  //   localStorage.removeItem("userToken");
  //   localStorage.removeItem("user");
  //   setUser(null);
  // };

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
}
