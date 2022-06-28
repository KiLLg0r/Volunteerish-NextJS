import { useRouter } from "next/router";
import { Link, Row } from "@nextui-org/react";
import { BsFillHouseFill, BsFillChatDotsFill, BsBagFill } from "react-icons/bs";
import { FaCog, FaClipboard } from "react-icons/fa";
import languages from "../utilities/languages.json";

import styles from "./styles/Navigation.module.scss";
import { useAuth } from "../context/AuthContext";

const ActiveLink = ({ href, children }) => {
  const router = useRouter();
  const condition = router.pathname === href || (router.pathname.includes(href) && href !== "/");

  const handleClick = () => {
    router.push(href);
  };

  const settingsPageClick = () => {
    localStorage.setItem("settingsPage", JSON.stringify([true, false, false, false]));
    router.push(href);
  };

  return (
    <Link
      css={{
        flexDirection: "column",
        color: condition ? "$red500" : "$textSecondary",
        "@xs": {
          flexDirection: "row",
          gap: "0rem",
        },
      }}
      onClick={href === "/settings" ? settingsPageClick : handleClick}
      className={`${styles.link} ${condition ? styles.active : ""}`}
    >
      {children}
    </Link>
  );
};

const Navigation = () => {
  const { Language } = useAuth();
  return (
    <Row
      fluid
      className={styles.primaryNavigation}
      css={{
        "@xs": {
          width: "100%",
          bottom: "initial",
          top: "0",
        },
      }}
    >
      <ul className={styles.navigationLinks}>
        <li className={styles.link}>
          <ActiveLink href="/">
            <>
              <BsFillHouseFill />
              <span>{languages[Language].nav.home}</span>
            </>
          </ActiveLink>
        </li>
        <li className={styles.link}>
          <ActiveLink href="/announces">
            <>
              <FaClipboard />
              <span>{languages[Language].nav.announces}</span>
            </>
          </ActiveLink>
        </li>
        <li className={styles.link}>
          <ActiveLink href="/shop">
            <>
              <BsBagFill />
              <span>{languages[Language].nav.shop}</span>
            </>
          </ActiveLink>
        </li>
        <li className={styles.link}>
          <ActiveLink href="/messages">
            <>
              <BsFillChatDotsFill />
              <span>{languages[Language].nav.messages}</span>
            </>
          </ActiveLink>
        </li>
        <li className={styles.link}>
          <ActiveLink href="/settings">
            <>
              <FaCog />
              <span>{languages[Language].nav.settings}</span>
            </>
          </ActiveLink>
        </li>
      </ul>
    </Row>
  );
};

export default Navigation;
