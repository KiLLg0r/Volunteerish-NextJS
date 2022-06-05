import { withNavigation, withProtected } from "../../utilities/routes";
import { useTheme as useNextTheme } from "next-themes";
import { useTheme, Switch, Spacer, Row, Container, Col } from "@nextui-org/react";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";
import { useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import styles from "../styles/Settings.module.scss";

const App = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  const { FontSize, setFontSize } = useAuth();
  const selectFontSizeRef = useRef(null);

  const changeFontSize = (e) => {
    e.preventDefault();

    const selectedValue = selectFontSizeRef.current.value;
    localStorage.setItem("fontSize", selectedValue);
  };

  useEffect(() => {
    const unsubscribe = window.addEventListener("storage", () => {
      setFontSize(localStorage.getItem("fontSize"));
    });

    return unsubscribe;
  }, [setFontSize]);

  return (
    <Container sm className={styles.appSettings}>
      <h1 className={styles.title}>App settings</h1>
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
        <select name="language">
          <option value="EN">English</option>
          <option value="RO">Romanian</option>
        </select>
      </Row>
      <Spacer />
      <Row align="center" className={styles.fontSize}>
        <label>Font size: </label>
        <select name="fontSize" onChange={changeFontSize} ref={selectFontSizeRef}>
          <option value="14px" onClick={(e) => console.log(e.target.value)}>
            Small
          </option>
          <option value="16px" onClick={(e) => console.log(e.target.value)}>
            Normal
          </option>
          <option value="18px" onClick={(e) => console.log(e.target.value)}>
            Big
          </option>
          <option value="20px" onClick={(e) => console.log(e.target.value)}>
            Very big
          </option>
        </select>
      </Row>
    </Container>
  );
};

export default withProtected(withNavigation(App));
