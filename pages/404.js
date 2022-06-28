import Link from "next/link";
import FourOhFourSVG from "../public/svg/404.svg";
import styles from "./styles/FourOhFour.module.scss";
import Head from "next/head";
import languages from "../utilities/languages.json";
import { useAuth } from "../context/AuthContext";

const FourOhFour = () => {
  const { Language } = useAuth();
  return (
    <section className={styles.fourOhFourSection}>
      <Head>
        <title>{languages[Language].headTags.notFound}</title>
      </Head>
      <FourOhFourSVG />
      <Link href="/" replace>
        <a>{languages[Language].goHome}</a>
      </Link>
    </section>
  );
};

export default FourOhFour;
