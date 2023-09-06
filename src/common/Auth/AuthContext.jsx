import React, { createContext, useState } from "react";

export const AuthContext = createContext();

/* This component is used to provide Authentication Context Variables and useState hooks */

export const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const setToken = (token) => {
    setAuthToken(token);
  };

  return (
    <AuthContext.Provider
      value={{ authToken, userId, isAdmin, setToken, setUserId, setIsAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
