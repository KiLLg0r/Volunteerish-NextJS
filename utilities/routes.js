import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import Loading from "../components/Loading";

export const withPublic = (Component) => {
  return function WithPublic(props) {
    const auth = useAuth();
    const router = useRouter();

    if (auth.currentUser) {
      router.replace("/");
      return <Loading />;
    }

    return <Component {...props} auth={auth} />;
  };
};

export const withProtected = (Component) => {
  return function WithProtected(props) {
    const auth = useAuth();
    const router = useRouter();

    if (!auth.currentUser) {
      router.replace("/login");
      return <Loading />;
    }

    return <Component {...props} auth={auth} />;
  };
};
