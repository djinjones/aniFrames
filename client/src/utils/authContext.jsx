import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authInfo, setAuthInfo] = useState(null);

  // Check login status and fetch authInfo when the app loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      getAuthInfo(token); // Fetch user info if logged in
    }
  }, []);

  const login = async (token, authDetails) => {
    localStorage.setItem('token', token);
    console.log(token)
    setIsLoggedIn(true);
    console.log('is logged in: ', isLoggedIn)
    setAuthInfo(authDetails);
  };

  const logout = () => {
    localStorage.removeItem('token');
    console.log('You have been logged out')
    setIsLoggedIn(false);
    setAuthInfo(null);
  };

  const getAuthInfo = async (token) => {
    try {
      const response = await axios.get('http://localhost:5173/api/users/authInfo', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAuthInfo(response.data.authInfo);
    } catch (err) {
      console.error('Error fetching auth info:', err.message);
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, authInfo, login, logout, getAuthInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
