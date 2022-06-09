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
import { doc, getDoc, getFirestore } from "firebase/firestore";
import auth, { app } from "../config/firebase";

const AuthContext = React.createContext();
const db = getFirestore(app);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
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

  async function getUserData(uid) {
    if (uid) {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) return userSnap.data();
    }
    return null;
  }

  useEffect(() => {
    setFontSize(localStorage.getItem("fontSize"));
    if (FontSize?.length > 0) document.documentElement.style.fontSize = FontSize;

    if (!userData) getUserData(currentUser?.uid).then((result) => setUserData(result));
  }, [FontSize, currentUser, userData]);

  const value = {
    currentUser,
    userData,
    db,
    loading,
    FontSize,
    setUserData,
    setFontSize,
    setCurrentUser,
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
