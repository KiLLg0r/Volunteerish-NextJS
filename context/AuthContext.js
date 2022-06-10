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
import { doc, getDoc, getFirestore, getDocs, collection, query, orderBy } from "firebase/firestore";
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
      if (userSnap.exists()) return userSnap.data();
    }
    return null;
  }

  useEffect(() => {
    setFontSize(localStorage.getItem("fontSize"));
    if (FontSize?.length > 0) document.documentElement.style.fontSize = FontSize;

    if (!userData) getUserData(currentUser?.uid).then((result) => setUserData(result));

    const getUsers = async () => {
      const q = query(collection(db, "users"), orderBy("points", "desc"));
      const usersSnapshot = await getDocs(q);
      let usersDocs = [];

      usersSnapshot.forEach((user) => {
        usersDocs.push({
          id: user.id,
          data: user.data(),
        });
      });

      setUsers(usersDocs);

      console.log(usersDocs);
    };

    getUsers().catch((error) => console.log(error));
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
