import { withProtected, withNavigation, closeLinkOnDesktop } from "../../utilities/routes";
import SettingsMenu from "../../components/SettingsMenu";
import { Button, Col, Grid, Row } from "@nextui-org/react";
import { BsChevronRight } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import { useWindowSize } from "../../utilities/hooks";
import { useState } from "react";

import { App } from "./app";
import { Account } from "./account";
import { Help } from "../help";
import { About } from "../about";

import styles from "../styles/Settings.module.scss";

function Settings({ auth }) {
  const size = useWindowSize();

  const MobileInterface = () => {
    return (
      <>
        <h1 className={styles.title}>Settings</h1>
        <div className={styles.editProfile}>
          <div className={styles.userIMG}>
            <Image src={auth.currentUser.photoURL} alt="User profile image" height={125} width={125} />
          </div>
          <div className={styles.userName}>{auth.currentUser.displayName}</div>
          <Link href="/settings/account">
            <Button color="gradient" flat auto css={{ marginInline: "auto", borderRadius: "5rem" }}>
              <Row gap={1} align="center">
                <Col>Edit profile</Col>
                <BsChevronRight />
              </Row>
            </Button>
          </Link>
        </div>
        <SettingsMenu />
      </>
    );
  };

  const DesktopInterface = () => {
    const [open, setOpen] = useState([true, false, false, false]);

    return (
      <Grid.Container>
        <Grid sm={2}>
          <Col>
            <Row
              align="center"
              className={`${styles.settingsLink} ${open[0] && styles.active}`}
              onClick={() => {
                setOpen([true, false, false, false]);
              }}
            >
              <Col>App settings</Col>
              <BsChevronRight />
            </Row>
            <Row
              align="center"
              className={`${styles.settingsLink} ${open[1] && styles.active}`}
              onClick={() => {
                setOpen([false, true, false, false]);
              }}
            >
              <Col>Profile</Col>
              <BsChevronRight />
            </Row>
            <Row
              align="center"
              className={`${styles.settingsLink} ${open[2] && styles.active}`}
              onClick={() => {
                setOpen([false, false, true, false]);
              }}
            >
              <Col>Help &#38; support</Col>
              <BsChevronRight />
            </Row>
            <Row
              align="center"
              className={`${styles.settingsLink} ${open[3] && styles.active}`}
              onClick={() => {
                setOpen([false, false, false, true]);
              }}
            >
              <Col>About</Col>
              <BsChevronRight />
            </Row>
          </Col>
        </Grid>
        <Grid sm={10}>
          <Col css={{ paddingInline: "1rem" }}>
            <Row css={{ display: !open[0] && "none" }}>
              <App />
            </Row>
            <Row css={{ display: !open[1] && "none" }}>
              <Account />
            </Row>
            <Row css={{ display: !open[2] && "none" }}>
              <Help />
            </Row>
            <Row css={{ display: !open[3] && "none" }}>
              <About />
            </Row>
          </Col>
        </Grid>
      </Grid.Container>
    );
  };

  return <section className={styles.settings}>{size.width < 650 ? <MobileInterface /> : <DesktopInterface />}</section>;
}

export default withProtected(withNavigation(Settings));
