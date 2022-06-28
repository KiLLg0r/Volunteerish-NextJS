import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import Loading from "../components/Loading";
import Navigation from "../components/Navigation";
import { useWindowSize } from "./hooks";

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

    if (auth.currentUser.displayName === null) {
      router.replace("/create-new-account");
      return <Loading />;
    }

    if (auth.currentUser.displayName && router.asPath === "/create-new-account") {
      router.replace("/");
      return <Loading />;
    }

    return <Component {...props} auth={auth} />;
  };
};

export const withNavigation = (Component) => {
  return function WithNavigation(props) {
    const auth = useAuth();

    if (auth.currentUser) {
      return (
        <>
          <Navigation />
          <Component {...props} />
        </>
      );
    }

    return <Component {...props} />;
  };
};

export const closeLinkOnDesktop = (Component) => {
  return function CloseLinkOnDesktop(props) {
    const size = useWindowSize();
    const router = useRouter();

    if (size.width >= 650) {
      router.push("/");
      return <Loading />;
    }

    return <Component {...props} />;
  };
};
