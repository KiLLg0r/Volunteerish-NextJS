import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import auth from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "./Loading";

const AuthStateChanged = ({ children }) => {
  const { setCurrentUser, getUserData, setUserData } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) getUserData(user.uid);
      setLoading(false);
    });

    return unsubscribe;
    //eslint-disable-next-line
  }, []);

  if (loading) return <Loading />;

  return children;
};

export default AuthStateChanged;
