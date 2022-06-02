import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import auth from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "./Loading";
import Navigation from "./Navigation";

const AuthStateChanged = ({ children }) => {
  const { currentUser, setCurrentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    //eslint-disable-next-line
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      {currentUser && <Navigation />}
      {children}
    </>
  );
};

export default AuthStateChanged;
