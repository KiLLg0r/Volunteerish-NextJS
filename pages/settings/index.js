import { withProtected, withNavigation } from "../../utilities/routes";
import SettingsMenu from "../../components/SettingsMenu";
import { Button, Col, Grid, Row, Image } from "@nextui-org/react";
import { BsChevronRight } from "react-icons/bs";
import Link from "next/link";
import { useWindowSize } from "../../utilities/hooks";
import { useState } from "react";

import { App } from "./app";
import { Account } from "./account";
import { Help } from "../help";
import { About } from "../about";

import styles from "../styles/Settings.module.scss";
import { useAuth } from "../../context/AuthContext";
import languages from "../../utilities/languages.json";

function Settings({ auth }) {
  const size = useWindowSize();
  const { Language } = auth;

  const MobileInterface = () => {
    return (
      <>
        <h2 className={styles.title}>{languages[Language].settings.title}</h2>
        <div className={styles.editProfile}>
          <div className={styles.userIMG}>
            <Image
              src={auth.currentUser.photoURL}
              alt="User profile image"
              height={125}
              width={125}
              objectFit="cover"
              showSkeleton
              maxDelay={5000}
            />
          </div>
          <div className={styles.userName}>{auth.currentUser.displayName}</div>
          <Link href="/settings/account">
            <Button color="gradient" auto css={{ marginInline: "auto", borderRadius: "5rem" }}>
              <Row gap={1} align="center">
                <Col>{languages[Language].settings.editProfile}</Col>
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
              <Col>{languages[Language].settings.app.title}</Col>
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
              <Col>{languages[Language].settings.account.title}</Col>
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
              <Col>{languages[Language].settings.help.title}</Col>
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
              <Col>{languages[Language].settings.about.title}</Col>
              <BsChevronRight />
            </Row>
            <Row>
              <Button onPress={logout} color="error" bordered css={{ width: "100%" }} size="lg">
                {languages[Language].logout}
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
