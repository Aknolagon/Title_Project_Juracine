import React, { createContext, useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("userToken");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUser(decodedToken);
    }
  }, []);

  const updateUser = (newUserData) => {
    setUser((currentUser) => ({ ...currentUser, ...newUserData }));
  };

  const value = useMemo(() => ({ user, updateUser }), [user, updateUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserProvider, UserContext };

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
