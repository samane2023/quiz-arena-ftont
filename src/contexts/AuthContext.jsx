// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";
import { useData } from "./DataContext";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { users, addUser, updateUser } = useData();
  const [currentUserId, setCurrentUserId] = useState(null);
  const [authError, setAuthError] = useState(null);

  const currentUser = users.find((u) => u.id === currentUserId) || null;

  const login = (email, password) => {
    const user = users.find((u) => u.email === email);
    if (!user || user.password !== password) {
      throw new Error("ایمیل یا رمز عبور اشتباه است");
    }
    if (user.status === "blocked") {
      throw new Error("حساب شما مسدود شده است");
    }
    setCurrentUserId(user.id);
    setAuthError(null);
  };

  const register = ({ email, username, password }) => {
    const exists = users.some((u) => u.email === email);
    if (exists) {
      throw new Error("این ایمیل قبلاً ثبت شده است");
    }
    if (password.length < 8) {
      throw new Error("رمز عبور باید حداقل ۸ کاراکتر باشد");
    }

    const id = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    const newUser = {
      id,
      email,
      username,
      password,
      bio: "",
      avatarUrl: "",
      totalScore: 0,
      games: [],
      role: "user",
      status: "active",
    };
    addUser(newUser);
    setCurrentUserId(id);
    setAuthError(null);
  };

  const logout = () => {
    setCurrentUserId(null);
  };

  const updateProfile = (updates) => {
    if (!currentUser) return;
    updateUser(currentUser.id, updates);
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    login,
    register,
    logout,
    updateProfile,
    authError,
    setAuthError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth باید داخل AuthProvider استفاده شود");
  return ctx;
};
