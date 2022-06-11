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
import { doc, getDoc } from "firebase/firestore";
import auth, { db } from "../config/firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [FontSize, setFontSize] = useState(new Set(["16px"]));
  const [Language, setLanguage] = useState(new Set(["English"]));
  const [users, setUsers] = useState([]);

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

  async function getUserData(uid) {
    if (uid) {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) setUserData(userSnap.data());
    }
    return null;
  }

  useEffect(() => {
    if (localStorage.getItem("fontSize") === null || localStorage.getItem("fontSize") === "undefined")
      localStorage.setItem("fontSize", "16px");
    else setFontSize(localStorage.getItem("fontSize"));

    if (localStorage.getItem("language") === null || localStorage.getItem("language") === "undefined")
      localStorage.setItem("language", "English");
    else setLanguage(localStorage.getItem("language"));

    if (FontSize.length > 0) document.documentElement.style.fontSize = FontSize;

    if (!userData) getUserData(currentUser?.uid);
  }, [FontSize, Language, currentUser, userData]);

  const value = {
    currentUser,
    userData,
    db,
    loading,
    FontSize,
    users,
    Language,
    setUsers,
    setLanguage,
    getUserData,
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
