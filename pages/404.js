import Link from "next/link";
import FourOhFourSVG from "../public/svg/404.svg";
import styles from "./styles/FourOhFour.module.scss";

const FourOhFour = () => {
  return (
    <section className={styles.fourOhFourSection}>
      <FourOhFourSVG />
      <Link href="/" replace>
        <a>Go home</a>
      </Link>
    </section>
  );
};

export default FourOhFour;
