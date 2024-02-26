import PropTypes from "prop-types";
import React, { createContext, useEffect, useMemo, useState } from "react";

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

export { UserContext, UserProvider };

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
