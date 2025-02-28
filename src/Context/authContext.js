// Context/authContext.js

import React, { createContext, useContext, useState } from 'react';

// Create context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component to wrap your app with auth context
export const AuthProvider = ({ children }) => {
  const [userdetails, setUserdetails] = useState(null);

  const signOut = () => {
    // Reset user details on sign-out (or add your sign-out logic here)
    setUserdetails(null);
  };

  return (
    <AuthContext.Provider value={{ userdetails, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
