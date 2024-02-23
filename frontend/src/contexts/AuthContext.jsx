import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { createContext, useEffect, useState, useContext } from "react";

const AuthContext = createContext();

function AuthProvider(children) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const jwtToken = localStorage.getItem("token");

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

        // Set JWT token in an HTTPOnly cookie
        document.cookie = `token=${token}; Secure; HttpOnly; SameSite=Strict`;

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

  const logout = () => {
    // Remove the HTTPOnly cookie
    document.cookie = "token=; Secure; HttpOnly; SameSite=Strict";
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={(user, login, logout)}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
