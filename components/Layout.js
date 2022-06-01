import Head from "next/head";
import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Volunteerish - We always help and helping everyone</title>
        <meta
          name="description"
          content="Volunteerish is a web application that connects directly, without intermediaries, people who need help with those who are willing to do good."
        />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      </Head>
      {children}
    </div>
  );
};

export default Layout;
