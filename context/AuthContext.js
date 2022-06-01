import React, { useContext, useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  sendEmailVerification,
  updatePassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, onSnapshot, getFirestore, getDoc } from "firebase/firestore";
import app from "../config/firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const [db, setDB] = useState(getFirestore(app));
  const auth = getAuth(app);

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
    const getData = async (uid) => {
      const userDoc = doc(db, "users", uid);
      const userDocSnap = await getDoc(userDoc);

      if (userDocSnap.exists()) return userDocSnap.data();
    };

    const unsubscribe = () => {
      onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        if (typeof user != "undefined")
          getData(user.uid).then((result) => {
            setUserData(result);
          });
        setLoading(false);
      });
      if (typeof currentUser != "undefined")
        onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
          setUserData(doc.data());
        });
    };

    return unsubscribe;
  }, [auth, currentUser, db]);

  const value = {
    currentUser,
    userData,
    db,
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
