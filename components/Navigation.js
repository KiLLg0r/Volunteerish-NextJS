import { useRouter } from "next/router";
import { Link, Row } from "@nextui-org/react";
import { BsFillHouseFill, BsFillChatDotsFill, BsBagFill } from "react-icons/bs";
import { FaCog, FaClipboard } from "react-icons/fa";

import styles from "./styles/Navigation.module.scss";

const ActiveLink = ({ href, children }) => {
  const router = useRouter();
  const condition = router.asPath === href;
  const secondCondition = router.asPath === "/settings/app" || router.asPath === "/settings/account";

  const handleClick = (e) => {
    e.preventDefault;
    router.push(href);
  };

  return (
    <Link
      css={{
        flexDirection: "column",
        color: condition || (href === "/settings" && secondCondition) ? "$red500" : "$textSecondary",
        "@xs": {
          flexDirection: "row",
          gap: "0rem",
        },
      }}
      onClick={handleClick}
      className={`${styles.link} ${condition || (href === "/settings" && secondCondition) ? styles.active : ""}`}
    >
      {children}
    </Link>
  );
};

const Navigation = () => {
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
              <span>Home</span>
            </>
          </ActiveLink>
        </li>
        <li className={styles.link}>
          <ActiveLink href="/announces">
            <>
              <FaClipboard />
              <span>Announces</span>
            </>
          </ActiveLink>
        </li>
        <li className={styles.link}>
          <ActiveLink href="/shop">
            <>
              <BsBagFill />
              <span>Shop</span>
            </>
          </ActiveLink>
        </li>
        <li className={styles.link}>
          <ActiveLink href="/messages">
            <>
              <BsFillChatDotsFill />
              <span>Messages</span>
            </>
          </ActiveLink>
        </li>
        <li className={styles.link}>
          <ActiveLink href="/settings">
            <>
              <FaCog />
              <span>Settings</span>
            </>
          </ActiveLink>
        </li>
      </ul>
    </Row>
  );
};

export default Navigation;
