import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import Loading from "./Loading";

const UserDataChanges = ({ children }) => {
  const { currentUser, setUserData } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = onSnapshot(doc(db, "users", currentUser.uid), (user) => {
        setUserData(user.data());
        setLoading(false);
      });

      return unsubscribe;
    }
    setLoading(false);
    //eslint-disable-next-line
  }, []);

  if (loading) return <Loading />;

  return children;
};

export default UserDataChanges;
