import { withNavigation, withProtected } from "../../utilities/routes";
import { useTheme as useNextTheme } from "next-themes";
import { useTheme, Switch, Spacer, Row, Container, Dropdown, Col, Image } from "@nextui-org/react";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";
import { useEffect, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import Head from "next/head";
import languages from "../../utilities/languages.json";

import styles from "../styles/Settings.module.scss";

export const App = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  const { setFontSize, FontSize, setLanguage, Language } = useAuth();

  return (
    <Container sm className={styles.appSettings}>
      <Head>
        <title>
          {languages[Language].headTags.appSettings} | {languages[Language].headTags.title}
        </title>
      </Head>
      <h2 className={styles.title}>{languages[Language].appSettings.title}</h2>
      <Row align="center" className={styles.darkMode}>
        <span>{languages[Language].appSettings.darkMode}: </span>
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
      <div className={`${styles.selectMenu} ${styles.languageSelect}`}>
        <label className={styles.selectLabel}>{languages[Language].appSettings.language}:</label>
        <select
          onChange={(e) => {
            localStorage.setItem("language", e.target.value);
            setLanguage(e.target.value);
          }}
          className={styles.select}
          defaultValue={Language}
        >
          <option value={"en"}>English</option>
          <option value={"ro"}>Română</option>
        </select>
      </div>
      <Spacer />
      <div className={`${styles.selectMenu} ${styles.fontSizeSelect}`}>
        <label className={styles.selectLabel}>{languages[Language].appSettings.fontSize.title}:</label>
        <select
          onChange={(e) => {
            localStorage.setItem("fontSize", e.target.value);
            setFontSize(e.target.value);
          }}
          className={styles.select}
          defaultValue={FontSize}
        >
          <option value={"14px"} css={{ fontSize: "14px" }}>
            {languages[Language].appSettings.fontSize.small}
          </option>
          <option value={"16px"} css={{ fontSize: "16px" }}>
            {languages[Language].appSettings.fontSize.normal}
          </option>
          <option value={"18px"} css={{ fontSize: "18px" }}>
            {languages[Language].appSettings.fontSize.big}
          </option>
          <option value={"20px"} css={{ fontSize: "20px" }}>
            {languages[Language].appSettings.fontSize.veryBig}
          </option>
        </select>
      </div>
    </Container>
  );
};

export default withProtected(withNavigation(App));
