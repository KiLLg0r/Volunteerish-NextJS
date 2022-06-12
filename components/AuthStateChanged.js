import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import auth from "../config/firebase";
import { onIdTokenChanged } from "firebase/auth";
import Loading from "./Loading";
import nookies from "nookies";

const AuthStateChanged = ({ children }) => {
  const { setCurrentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onIdTokenChanged(auth, async (user) => {
      if (!user) {
        setCurrentUser(null);
        nookies.set(undefined, "token", "", { path: "/" });
      } else {
        const token = await user.getIdToken();
        setCurrentUser(user);
        nookies.set(undefined, "token", token, { path: "/" });
      }
      setLoading(false);
    });
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  if (loading) return <Loading />;

  return <>{children}</>;
};

export default AuthStateChanged;
