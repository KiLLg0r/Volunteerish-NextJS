import { Row, Col, Switch, useTheme, Container, Spacer } from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";
import languages from "../utilities/languages.json";
import styles from "../pages/styles/Auth.module.scss";
import languageStyles from "../pages/styles/Settings.module.scss";
import { useAuth } from "../context/AuthContext";

export const AuthLeftSide = ({ children }) => {
  return (
    <Col
      css={{
        backgroundColor: "$background",
        borderRadius: "0.625rem",
        "@sm": {
          backgroundColor: "$backgroundSecondary",
        },
      }}
    >
      {children}
    </Col>
  );
};

export const AuthRightSide = ({ children }) => {
  return (
    <Col>
      <div className={styles.authRightContainer}>{children}</div>
    </Col>
  );
};

const AuthContainer = ({ children }) => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();
  const { Language, setLanguage } = useAuth();

  return (
    <Container fluid display="flex" direction="column" alignContent="center" css={{ minHeight: "100vh" }}>
      <Row fluid align="center" justify="flex-end" css={{ paddingBlock: "1rem" }}>
        <div className={`${languageStyles.selectMenu} ${languageStyles.languageSelect}`}>
          <label className={languageStyles.selectLabel}>{languages[Language].appSettings.language}:</label>
          <select
            onChange={(e) => {
              localStorage.setItem("language", e.target.value);
              setLanguage(e.target.value);
            }}
            className={languageStyles.select}
            defaultValue={Language}
          >
            <option value={"en"}>English</option>
            <option value={"ro"}>Română</option>
          </select>
        </div>
        <Spacer />
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
      <Row
        fluid
        gap={0}
        css={{
          flexDirection: "column",
          padding: "0",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "auto",
          marginBottom: "auto",
          "@sm": {
            flexDirection: "row",
            paddingInline: "1rem",
            paddingBlock: "2rem",
          },
        }}
      >
        {children}
      </Row>
    </Container>
  );
};

export default AuthContainer;
