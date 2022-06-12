import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import Loading from "./Loading";
import { doc, onSnapshot } from "firebase/firestore";

const UserDataChanges = ({ children }) => {
  const { currentUser, setUserData } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser)
      onSnapshot(doc(db, "users", currentUser.uid), (user) => {
        setUserData(user.data());
        setLoading(false);
      });
    setLoading(false);
  }, [currentUser, setUserData]);

  if (loading) return <Loading />;

  return children;
};

export default UserDataChanges;