import Head from "next/head";
import { Container } from "@nextui-org/react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const { currentUser } = useAuth();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Volunteerish - We always help and helping everyone</title>
        <meta
          name="description"
          content="Volunteerish is a web application that connects directly, without intermediaries, people who need help with those who are willing to do good."
        />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      </Head>
      <Container
        lg
        css={{
          backgroundColor: "$background",
          minHeight: "100vh",
          width: "auto",
          paddingBlock: "1rem",
          paddingTop: currentUser && "1rem",
          paddingBottom: currentUser && "5rem",
          paddingBottom: router.asPath === "/create-new-account" && "1rem",

          "@xs": {
            paddingTop: currentUser ? "5rem" : "1rem",
            paddingTop:
              router.asPath === "/help" ||
              router.asPath === "/about" ||
              router.asPath === "/login" ||
              router.asPath === "/register"
                ? "1rem"
                : "5rem",
            paddingBlock: router.asPath === "/create-new-account" && "1rem",
            paddingBottom: "0",
          },
        }}
      >
        {children}
      </Container>
    </>
  );
};

export default Layout;
