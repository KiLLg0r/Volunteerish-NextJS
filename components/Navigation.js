import { useRouter } from "next/router";
import { Link, Row } from "@nextui-org/react";
import styles from "./styles/Navigation.module.scss";
import { BsFillHouseFill, BsFillChatDotsFill, BsBagFill } from "react-icons/bs";
import { FaCog, FaClipboard } from "react-icons/fa";

const ActiveLink = ({ href, children }) => {
  const router = useRouter();
  const condition = router.asPath === href;

  const handleClick = (e) => {
    e.preventDefault;
    console.log(router.asPath);
    router.replace(href);
  };

  return (
    <Link
      css={{
        color: condition ? "$red500" : "$textSecondary",
        flexDirection: "column",
        "@xs": {
          flexDirection: "row",
          gap: "0.25rem",
        },
      }}
      onClick={handleClick}
      className={`${styles.link} ${condition && styles.active}`}
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
          position: "static !important",
        },
      }}
    >
      <ul className={styles.navigationLinks}>
        <li className={styles.link}>
          <ActiveLink href="/">
            <BsFillHouseFill />
            <span>Home</span>
          </ActiveLink>
        </li>
        <li className={styles.link}>
          <ActiveLink href="/announces">
            <FaClipboard />
            <span>Announces</span>
          </ActiveLink>
        </li>
        <li className={styles.link}>
          <ActiveLink href="/shop">
            <BsBagFill />
            <span>Shop</span>
          </ActiveLink>
        </li>
        <li className={styles.link}>
          <ActiveLink href="/messages">
            <BsFillChatDotsFill />
            <span>Messages</span>
          </ActiveLink>
        </li>
        <li className={styles.link}>
          <ActiveLink href="/settings">
            <FaCog />
            <span>Settings</span>
          </ActiveLink>
        </li>
      </ul>
    </Row>
  );
};

export default Navigation;
