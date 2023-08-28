import React, { createContext, useState } from 'react';
import api from '../axiosConfig';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(0);

  const login = (token) => {
    setUser(token);
  };

  const logout = () => {
    setUser(null);
  };

  const getUser = async (tokein) => {
    setToken(tokein);
    api.get(`/`, 
    {headers: {
      Authorization: `Bearer ${tokein}`
    }}).then((res) => {
      console.log(res);
      const userSER = JSON.stringify(res.data);
      localStorage.setItem("user", userSER);
      localStorage.setItem("token", JSON.stringify(tokein));
      login(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, getUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };