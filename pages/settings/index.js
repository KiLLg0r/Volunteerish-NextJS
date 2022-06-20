import { withProtected, withNavigation } from "../../utilities/routes";
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
import { useAuth } from "../../context/AuthContext";

function Settings({ auth }) {
  const size = useWindowSize();

  const MobileInterface = () => {
    return (
      <>
        <h2 className={styles.title}>Settings</h2>
        <div className={styles.editProfile}>
          <div className={styles.userIMG}>
            <Image
              src={auth.currentUser.photoURL}
              alt="User profile image"
              height={125}
              width={125}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={styles.userName}>{auth.currentUser.displayName}</div>
          <Link href="/settings/account">
            <Button color="gradient" auto css={{ marginInline: "auto", borderRadius: "5rem" }}>
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
    const [open, setOpen] = useState(JSON.parse(localStorage.getItem("settingsPage")) || [(true, false, false, false)]);
    const { logout } = useAuth();

    const RenderAppSettings = () => {
      return open[0] ? <App /> : null;
    };

    const RenderProfile = () => {
      return open[1] ? <Account /> : null;
    };

    const RenderHelp = () => {
      return open[2] ? <Help /> : null;
    };

    const RenderAbout = () => {
      return open[3] ? <About /> : null;
    };

    return (
      <Grid.Container>
        <Grid sm={2}>
          <Col>
            <Row
              align="center"
              className={`${styles.settingsLink} ${open[0] && styles.active}`}
              onClick={() => {
                setOpen([true, false, false, false]);
                localStorage.setItem("settingsPage", JSON.stringify([true, false, false, false]));
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
                localStorage.setItem("settingsPage", JSON.stringify([false, true, false, false]));
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
                localStorage.setItem("settingsPage", JSON.stringify([false, false, true, false]));
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
                localStorage.setItem("settingsPage", JSON.stringify([false, false, false, true]));
              }}
            >
              <Col>About</Col>
              <BsChevronRight />
            </Row>
            <Row>
              <Button onPress={logout} color="error" bordered css={{ width: "100%" }} size="lg">
                Log out
              </Button>
            </Row>
          </Col>
        </Grid>
        <Grid sm={10}>
          <Col>
            <Row>
              <RenderAppSettings />
              <RenderProfile />
              <RenderHelp />
              <RenderAbout />
            </Row>
          </Col>
        </Grid>
      </Grid.Container>
    );
  };

  return <section className={styles.settings}>{size.width < 650 ? <MobileInterface /> : <DesktopInterface />}</section>;
}

export default withProtected(withNavigation(Settings));
