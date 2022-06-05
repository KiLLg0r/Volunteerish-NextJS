import { useTheme as useNextTheme } from "next-themes";
import { useTheme, Spacer, Row, Col, Button } from "@nextui-org/react";
import {
  BsChevronRight,
  BsFillPhoneFill,
  BsFillFilePersonFill,
  BsFillInfoCircleFill,
  BsFillQuestionCircleFill,
} from "react-icons/bs";
import { withProtected, withNavigation } from "../../utilities/routes";

import styles from "../styles/Settings.module.scss";
import Link from "next/link";

const SettingRow = ({ icon, title, subtitle, href }) => {
  return (
    <>
      <Link href={href} replace>
        <a>
          <Row align="center" justify="flex-start">
            <Col span={2}>
              <Row align="center" justify="center">
                {icon}
              </Row>
            </Col>
            <Col span={10}>
              <Row>
                <div className={styles.settingTitle}>{title}</div>
              </Row>
              <Row>
                <div className={styles.settingSubtitle}>{subtitle}</div>
              </Row>
            </Col>
            <Col span={2}>
              <Row align="center" justify="center">
                <BsChevronRight />
              </Row>
            </Col>
          </Row>
        </a>
      </Link>

      <Spacer />
    </>
  );
};

function Settings({ auth }) {
  const { logout } = auth;

  return (
    <section className={styles.settings}>
      <h1 className={styles.title}>Settings</h1>
      <SettingRow
        icon={<BsFillPhoneFill />}
        title="App settings"
        subtitle="Settings on language, dark way and font size"
        href="/settings/app"
      />
      <SettingRow
        icon={<BsFillFilePersonFill />}
        title="Account"
        subtitle="Settings on name, email, address"
        href="/settings/account"
      />
      <SettingRow
        icon={<BsFillInfoCircleFill />}
        title="About"
        subtitle="Information about platform"
        href="/settings/about"
      />
      <SettingRow
        icon={<BsFillQuestionCircleFill />}
        title="Help and Support"
        subtitle="FAQ and support information"
        href="/settings/help"
      />
      <Spacer />
      <Button onPress={logout} color="error" bordered css={{ width: "100%" }}>
        Log out
      </Button>
    </section>
  );
}

export default withProtected(withNavigation(Settings));
