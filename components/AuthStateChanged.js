import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import auth from "../config/firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import Loading from "./Loading";

const AuthStateChanged = ({ children }) => {
  const { currentUser, setCurrentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user && !user.photoURL)
        updateProfile(user, {
          photoURL:
            "https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/placeholder.jpg?alt=media&token=8960960f-36a2-4a20-8115-c692d95e9fda",
        });
    });
    //eslint-disable-next-line
  }, []);

  if (loading) return <Loading />;

  return children;
};

export default AuthStateChanged;
