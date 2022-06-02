import Head from "next/head";
import { useTheme, Container } from "@nextui-org/react";

const Layout = ({ children }) => {
  const { theme } = useTheme();

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
      <Container css={{ backgroundColor: "$background", minHeight: "100vh" }}>{children}</Container>
    </>
  );
};

export default Layout;
