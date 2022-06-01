import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import auth from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthStateChanged = ({ children }) => {
  const { setCurrentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    //eslint-disable-next-line
  }, []);

  if (loading) return <p>Loading ...</p>;

  return children;
};

export default AuthStateChanged;
