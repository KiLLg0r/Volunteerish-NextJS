import { Spacer, Row, Col, Button } from "@nextui-org/react";
import {
  BsChevronRight,
  BsFillPhoneFill,
  BsFillFilePersonFill,
  BsFillInfoCircleFill,
  BsFillQuestionCircleFill,
  BsFillCartFill,
} from "react-icons/bs";
import languages from "../utilities/languages.json";

import styles from "../pages/styles/Settings.module.scss";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useWindowSize } from "../utilities/hooks";

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

const SettingsMenu = () => {
  const { logout, Language } = useAuth();
  const size = useWindowSize();

  return (
    <>
      <SettingRow
        icon={<BsFillPhoneFill className={styles.settingSVG} />}
        title={languages[Language].settings.app.title}
        subtitle={languages[Language].settings.app.subtitle}
        href="/settings/app"
      />
      {size.width >= 650 && (
        <SettingRow
          icon={<BsFillFilePersonFill className={styles.settingSVG} />}
          title={languages[Language].settings.account.title}
          subtitle={languages[Language].settings.account.subtitle}
          href="/settings/account"
        />
      )}
      <SettingRow
        icon={<BsFillCartFill className={styles.settingSVG} />}
        title={languages[Language].settings.purchases.title}
        subtitle={languages[Language].settings.purchases.subtitle}
        href="/purchases/"
      />
      <SettingRow
        icon={<BsFillInfoCircleFill className={styles.settingSVG} />}
        title={languages[Language].settings.about.title}
        subtitle={languages[Language].settings.about.subtitle}
        href="/about"
      />
      <SettingRow
        icon={<BsFillQuestionCircleFill className={styles.settingSVG} />}
        title={languages[Language].settings.help.title}
        subtitle={languages[Language].settings.help.subtitle}
        href="/help"
      />
      <Button onPress={logout} color="error" bordered css={{ width: "100%" }} size="lg">
        {languages[Language].logout}
      </Button>
    </>
  );
};

export default SettingsMenu;
