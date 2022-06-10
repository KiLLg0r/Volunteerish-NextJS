import { withNavigation, withProtected } from "../../utilities/routes";
import { useTheme as useNextTheme } from "next-themes";
import { useTheme, Switch, Spacer, Row, Container, Dropdown } from "@nextui-org/react";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";
import { useRef, useEffect, useState, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";

import styles from "../styles/Settings.module.scss";

export const App = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  const { setFontSize, FontSize } = useAuth();

  const [languageSelected, setLanguageSelected] = useState(new Set(["English"]));
  const [fontSizeSelected, setFontSizeSelected] = useState(new Set([FontSize !== "[object Set]" ? FontSize : "16px"]));

  const languageSelectedValue = useMemo(
    () => Array.from(languageSelected).join(", ").replaceAll("_", " "),
    [languageSelected],
  );

  const fontSizeSelectedValue = useMemo(() => {
    Array.from(fontSizeSelected).join(", ").replaceAll("_", " ");
    console.log(fontSizeSelected);
  }, [fontSizeSelected]);

  useEffect(() => {
    return window.addEventListener("storage", () => {
      setFontSize(localStorage.getItem("fontSize"));
    });
  }, [setFontSize]);

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
            selectedKeys={languageSelected}
            onSelectionChange={languageSelectedValue}
          >
            <Dropdown.Item key="English">English</Dropdown.Item>
            <Dropdown.Item key="Français">Français</Dropdown.Item>
            <Dropdown.Item key="Deutsch">Deutsch</Dropdown.Item>
            <Dropdown.Item key="Español">Español</Dropdown.Item>
            <Dropdown.Item key="Română">Română</Dropdown.Item>
            <Dropdown.Item key="Український">Український</Dropdown.Item>
            <Dropdown.Item key="Русский">Русский</Dropdown.Item>
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
            aria-label="Font size selection"
            color="error"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={fontSizeSelected}
            onSelectionChange={fontSizeSelectedValue}
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
        {/* <select name="fontSize" onChange={changeFontSize} ref={selectFontSizeRef} defaultValue={FontSize}>
          <option value="14px" style={{ fontSize: "14px" }}>
            Small
          </option>
          <option value="16px" style={{ fontSize: "16px" }}>
            Normal
          </option>
          <option value="18px" style={{ fontSize: "18px" }}>
            Big
          </option>
          <option value="20px" style={{ fontSize: "20px" }}>
            Very big
          </option>
        </select> */}
      </Row>
    </Container>
  );
};

export default withProtected(withNavigation(App));
