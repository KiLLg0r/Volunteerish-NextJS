import { Spacer, Row, Col, Button } from "@nextui-org/react";
import {
  BsChevronRight,
  BsFillPhoneFill,
  BsFillFilePersonFill,
  BsFillInfoCircleFill,
  BsFillQuestionCircleFill,
} from "react-icons/bs";
import { withProtected, withNavigation, closeLinkOnDesktop } from "../../utilities/routes";

import styles from "../styles/Settings.module.scss";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

const SettingRow = ({ icon, title, subtitle, href }) => {
  return (
    <>
      <Link href={href}>
        <a>
          <Row align="center" justify="flex-start">
            <Col span={2}>
              <Row align="center" justify="center">
                {icon}
              </Row>
            </Col>
            <Col span={8}>
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

export const SettingsMenu = () => {
  const { logout } = useAuth;
  return (
    <>
      <SettingRow
        icon={<BsFillPhoneFill className={styles.settingSVG} />}
        title="App settings"
        subtitle="Settings on language, dark mode ..."
        href="/settings/app"
      />
      <SettingRow
        icon={<BsFillFilePersonFill className={styles.settingSVG} />}
        title="Account"
        subtitle="Settings on name, email, address ..."
        href="/settings/account"
      />
      <SettingRow
        icon={<BsFillInfoCircleFill className={styles.settingSVG} />}
        title="About"
        subtitle="Information about platform"
        href="/about"
      />
      <SettingRow
        icon={<BsFillQuestionCircleFill className={styles.settingSVG} />}
        title="Help and Support"
        subtitle="FAQ and support information"
        href="/help"
      />
      <Button onPress={logout} color="error" bordered css={{ width: "100%" }} size="lg">
        Log out
      </Button>
    </>
  );
};

function Settings({ auth }) {
  return (
    <section className={styles.settings}>
      <h1 className={styles.title}>Settings</h1>
      <SettingsMenu auth={auth} />
    </section>
  );
}

export default closeLinkOnDesktop(withProtected(withNavigation(Settings)));
