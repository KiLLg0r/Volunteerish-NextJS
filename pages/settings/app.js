import { withNavigation, withProtected } from "../../utilities/routes";
import { useTheme as useNextTheme } from "next-themes";
import { useTheme, Switch, Spacer, Row, Container, Dropdown, Col } from "@nextui-org/react";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";
import { useEffect, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";

import EN from "../../public/svg/flags/us.svg";
import FR from "../../public/svg/flags/fr.svg";
import DE from "../../public/svg/flags/de.svg";
import ES from "../../public/svg/flags/es.svg";
import RO from "../../public/svg/flags/ro.svg";
import UA from "../../public/svg/flags/ua.svg";
import RU from "../../public/svg/flags/ru.svg";

import styles from "../styles/Settings.module.scss";

export const App = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  const { setFontSize, FontSize, setLanguage, Language } = useAuth();

  const languageSelectedValue = useMemo(() => Array.from(Language).join("").replaceAll(",", ""), [Language]);

  const fontSizeSelectedValue = useMemo(() => Array.from(FontSize).join("").replaceAll(",", ""), [FontSize]);

  useEffect(() => {
    if (FontSize !== fontSizeSelectedValue) localStorage.setItem("fontSize", fontSizeSelectedValue);
    if (Language !== languageSelectedValue) localStorage.setItem("language", languageSelectedValue);
  }, [FontSize, Language, fontSizeSelectedValue, languageSelectedValue]);

  return (
    <Container sm className={styles.appSettings}>
      <h2 className={styles.title}>App settings</h2>
      <Row align="center" className={styles.darkMode}>
        <span>Dark mode: </span>
        <Spacer x={0.5} />
        <Switch
          checked={isDark}
          onChange={(e) => {
            setTheme(e.target.checked ? "dark" : "light");
          }}
          color="error"
          iconOn={<BsMoonFill />}
          iconOff={<BsFillSunFill />}
        />
      </Row>
      <Spacer />
      <Row align="center" className={styles.languages}>
        <label>Language: </label>
        <Dropdown>
          <Dropdown.Button flat color="error">
            {languageSelectedValue}
          </Dropdown.Button>
          <Dropdown.Menu
            aria-label="Language selection"
            color="error"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={Language}
            onSelectionChange={setLanguage}
          >
            <Dropdown.Item key="English">
              <Row align="center" gap={1}>
                <EN className={styles.countryFlag} data-text="US flag" />
                <Col>English</Col>
              </Row>
            </Dropdown.Item>
            <Dropdown.Item key="Français">
              <Row align="center" gap={1}>
                <FR className={styles.countryFlag} data-text="France flag" />
                <Col>Français</Col>
              </Row>
            </Dropdown.Item>
            <Dropdown.Item key="Deutsch">
              <Row align="center" gap={1}>
                <DE className={styles.countryFlag} data-text="Germany flag" />
                <Col>Deutsch</Col>
              </Row>
            </Dropdown.Item>
            <Dropdown.Item key="Español">
              <Row align="center" gap={1}>
                <ES className={styles.countryFlag} data-text="Spain flag" />
                <Col>Español</Col>
              </Row>
            </Dropdown.Item>
            <Dropdown.Item key="Română">
              <Row align="center" gap={1}>
                <RO className={styles.countryFlag} data-text="Romania flag" />
                <Col>Română</Col>
              </Row>
            </Dropdown.Item>
            <Dropdown.Item key="Український">
              <Row align="center" gap={1}>
                <UA className={styles.countryFlag} data-text="Ukraine flag" />
                <Col>Український</Col>
              </Row>
            </Dropdown.Item>
            <Dropdown.Item key="Русский">
              <Row align="center" gap={1}>
                <RU className={styles.countryFlag} data-text="Russia flag" />
                <Col>Русский</Col>
              </Row>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Row>
      <Spacer />
      <Row align="center" className={styles.fontSize}>
        <label>Font size: </label>
        <Dropdown>
          <Dropdown.Button flat color="error">
            {fontSizeSelectedValue}
          </Dropdown.Button>
          <Dropdown.Menu
            aria-label="Language selection"
            color="error"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={FontSize}
            onSelectionChange={setFontSize}
          >
            <Dropdown.Item key="14px" css={{ fontSize: "14px" }}>
              Small
            </Dropdown.Item>
            <Dropdown.Item key="16px" css={{ fontSize: "16px" }}>
              Normal
            </Dropdown.Item>
            <Dropdown.Item key="18px" css={{ fontSize: "18px" }}>
              Big
            </Dropdown.Item>
            <Dropdown.Item key="20px" css={{ fontSize: "20px" }}>
              Very big
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Row>
    </Container>
  );
};

export default withProtected(withNavigation(App));
