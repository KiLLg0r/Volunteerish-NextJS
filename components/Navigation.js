import { useRouter } from "next/router";
import { Link, Popover, Row, useTheme } from "@nextui-org/react";
import { BsFillHouseFill, BsFillChatDotsFill, BsBagFill } from "react-icons/bs";
import { FaCog, FaClipboard } from "react-icons/fa";
import { useWindowSize } from "../utilities/hooks";
import { SettingsMenu } from "../pages/settings";
import { useState } from "react";

import styles from "./styles/Navigation.module.scss";

const ActiveLink = ({ href, children }) => {
  const router = useRouter();
  const condition = router.asPath === href;
  const secondCondition = router.asPath === "/settings/app" || router.asPath === "/settings/account";

  const [popoverOpen, setPopoverOpen] = useState(false);

  const size = useWindowSize();

  const handleClick = (e) => {
    e.preventDefault;
    router.push(href);
  };

  if (href === "/settings" && size.width > 650)
    return (
      <Link
        className={`${styles.link} ${condition && styles.active}`}
        css={{ color: secondCondition ? "$red500" : "$textSecondary" }}
      >
        <Popover
          triggerType="menu"
          onOpenChange={(isOpen) => {
            setPopoverOpen(isOpen);
          }}
        >
          <Popover.Trigger>
            <div className={`${styles.popoverBtn} ${popoverOpen && styles.open}`}>{children}</div>
          </Popover.Trigger>
          <Popover.Content>
            <div style={{ padding: "1rem" }}>
              <SettingsMenu />
            </div>
          </Popover.Content>
        </Popover>
      </Link>
    );

  return (
    <Link
      css={{
        flexDirection: "column",
        color: condition || (href === "/settings" && secondCondition) ? "$red500" : "$textSecondary",
        "@xs": {
          flexDirection: "row",
          gap: "0.25rem",
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
