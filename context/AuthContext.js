import React, { useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  sendEmailVerification,
  updatePassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import auth, { db } from "../config/firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children, initialUserData, users }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(initialUserData);
  const [FontSize, setFontSize] = useState(new Set(["16px"]));
  const [Language, setLanguage] = useState(new Set(["English"]));

  function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateUserEmail(email) {
    updateEmail(currentUser, email);
  }

  function updateUserPassword(password) {
    updatePassword(currentUser, password);
  }

  function sendUserEmailVerification() {
    sendEmailVerification(currentUser);
  }

  function sendUserPasswordResetEmail(email) {
    sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    if (localStorage.getItem("fontSize") === null || localStorage.getItem("fontSize") === "undefined")
      localStorage.setItem("fontSize", "16px");
    else setFontSize(localStorage.getItem("fontSize"));

    if (localStorage.getItem("language") === null || localStorage.getItem("language") === "undefined")
      localStorage.setItem("language", "English");
    else setLanguage(localStorage.getItem("language"));

    if (FontSize.length > 0) document.documentElement.style.fontSize = FontSize;
  }, [FontSize, Language, currentUser, userData]);

  const value = {
    currentUser,
    userData,
    db,
    loading,
    FontSize,
    users,
    Language,
    setLanguage,
    setFontSize,
    setCurrentUser,
    setUserData,
    setLoading,
    register,
    login,
    logout,
    resetPassword,
    updateUserEmail,
    updateUserPassword,
    sendUserEmailVerification,
    sendUserPasswordResetEmail,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
