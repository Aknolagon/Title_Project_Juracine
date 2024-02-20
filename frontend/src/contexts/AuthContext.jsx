import axios from "axios";
import jwtDecode from "jwt-decode";
import PropTypes from "prop-types";
import React, { createContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const jwtToken = localStorage.getItem("token");

      if (jwtToken) {
        try {
          const decodeToken = jwtDecode(jwtToken);
          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/users/${decodeToken.user}`
          );
          setUser(res.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchData();
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const authUseMemo = useMemo(() => {
    return {
      user,
      handleLogOut,
      setUser: (newUser) => {
        setUser(newUser);
      },
    };
  }, [user, handleLogOut]);

  return (
    <AuthContext.Provider value={authUseMemo}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
