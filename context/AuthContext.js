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

  // useEffect(() => {
  //   const getData = async (uid) => {
  //     const userDoc = doc(db, "users", uid);
  //     const userDocSnap = await getDoc(userDoc);

  //     if (userDocSnap.exists()) return userDocSnap.data();
  //   };

  //   return onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       console.log("Changed state" + user);
  //       setCurrentUser(user);
  //       getData(user.uid).then((result) => {
  //         setUserData(result);
  //       });
  //     }
  //     setLoading(false);
  //   });
  // }, [currentUser, db]);

  const value = {
    currentUser,
    userData,
    db,
    loading,
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
