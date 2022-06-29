import Head from "next/head";
import { Container } from "@nextui-org/react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import languages from "../utilities/languages.json";

const Layout = ({ children }) => {
  const { currentUser, Language } = useAuth();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{languages[Language]?.headTags?.title}</title>
        <meta
          name="description"
          content="Volunteerish is a web application that connects directly, without intermediaries, people who need help with those who are willing to do good."
        />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta charSet="UTF-8" />
      </Head>
      <Container
        lg
        css={{
          backgroundColor: "$background",
          minHeight: "100vh",
          paddingTop: currentUser && "1rem",
          paddingBottom: router.query.id && "0",
          paddingBottom:
            (router.asPath === "/" ||
              router.asPath === "/announces" ||
              router.asPath === "/shop" ||
              router.asPath === "/messages" ||
              router.asPath === "/settings" ||
              router.asPath === "/settings/account" ||
              router.asPath === "/settings/app" ||
              router.asPath === "/announces/closed-announces" ||
              router.asPath === "/announces/helped-announces") &&
            "5rem",

          "@xs": {
            paddingTop: currentUser ? "5rem" : "1rem",
            paddingTop:
              router.asPath === "/help" ||
              router.asPath === "/about" ||
              router.asPath === "/login" ||
              router.asPath === "/register" ||
              router.asPath === "/announces/add-new-announce" ||
              router.query.id
                ? "1rem"
                : "5rem",
            paddingBottom: "0",
            paddingBlock: router.asPath === "/create-new-account" && "1rem",
          },
        }}
      >
        {children}
      </Container>
    </>
  );
};

export default Layout;
