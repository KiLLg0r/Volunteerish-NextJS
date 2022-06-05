import React, { useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  sendEmailVerification,
  updatePassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getFirestore, getDoc } from "firebase/firestore";
import auth, { app } from "../config/firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const [db, setDB] = useState(getFirestore(app));
  const [FontSize, setFontSize] = useState("");

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
    setFontSize(localStorage.getItem("fontSize"));
    if (FontSize === null) document.documentElement.style.fontSize = FontSize;
  }, [FontSize]);

  const value = {
    currentUser,
    userData,
    db,
    loading,
    FontSize,
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
