import React, { createContext, useReducer } from "react";
/* eslint-disable */

const UserContext = createContext();

// function UserProvider({ children }) {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     console.info(user);
//   }, [user]);

//   const updateUser = (newUserData) => {
//     console.info("newUserData:", newUserData);
//     setUser(currentUser => ({...currentUser, ...newUserData}));
//   };

// const value = useMemo(() => ({ user, updateUser }), [user, updateUser]);

const userReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      const newState = { ...state, ...action.payload };
      console.log("New State:", newState);
      return newState;
    default:
      return state;
  }
};

function UserProvider({ children }) {
  const [user, dispatch] = useReducer(userReducer, null);

  const updateUser = (newUserData) => {
    dispatch({ type: "UPDATE_USER", payload: newUserData });
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
