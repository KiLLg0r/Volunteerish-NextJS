import LoginSvg from "../public/svg/login.svg";

import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import styles from "./styles/Auth.module.scss";

import { validateError } from "../utilities/functions";
import { withPublic } from "../utilities/routes";
import languages from "../utilities/languages.json";
import { Button, Input, Row, Spacer, Modal, Grid } from "@nextui-org/react";
import AuthContainer, { AuthLeftSide, AuthRightSide } from "../components/AuthContainer";

const Login = ({ auth }) => {
  const { login, Language, sendUserPasswordResetEmail } = auth;
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError({
        email: "",
        password: "",
      });
      setLoading(true);
      await login(email, password);
      router.push("/");
    } catch (error) {
      const errorValidated = validateError(error.code);
      if (errorValidated.type === "password")
        setError({
          email: "",
          password: errorValidated.error,
        });
      if (errorValidated.type === "email")
        setError({
          email: errorValidated.error,
          password: "",
        });
    }
    setLoading(false);
  }

  return (
    <AuthContainer>
      <Head>
        <title>
          {languages[Language].headTags.login} | {languages[Language].headTags.title}
        </title>
      </Head>
      <AuthLeftSide>
        <div className={styles.authLeftContainer}>
          <h1 className={`${styles.title} ${styles.appName} `}>Volunteerish</h1>
          <LoginSvg className={styles.authSVG} />
        </div>
      </AuthLeftSide>
      <AuthRightSide>
        <h1 className={styles.title}>{languages[Language].login.title}</h1>
        <form className="contact-form" onSubmit={handleSubmit}>
          <Input
            clearable
            label={languages[Language].email}
            placeholder={languages[Language].email}
            fullWidth
            onChange={(e) => {
              setEmail(e.target.value);
              setError({
                email: "",
                password: "",
              });
            }}
            size="lg"
            status={error.email.length > 0 && "error"}
            helperText={error.email.length > 0 && error.email}
            helperColor={error.email.length > 0 && "error"}
            required
          />
          <Spacer y={error.email.length ? 2 : 1} />
          <Input.Password
            clearable
            label={languages[Language].password}
            placeholder={languages[Language].password}
            fullWidth
            onChange={(e) => {
              setPassword(e.target.value);
              setError({
                email: "",
                password: "",
              });
            }}
            size="lg"
            status={error.password.length > 0 && "error"}
            helperText={error.password.length > 0 && error.password}
            helperColor={error.password.length > 0 && "error"}
            required
          />
          <Spacer y={0.5} />
          <Row justify="flex-end">
            <Button color="error" light onPress={() => setForgotPassword(true)} auto>
              {languages[Language].login.forgotPass}
            </Button>
          </Row>
          <Spacer y={error.password.length ? 3 : 2} />
          <Button disabled={loading} type="submit" css={{ width: "100%", backgroundColor: "$red500" }}>
            {languages[Language].login.title}
          </Button>
        </form>
        <div className={styles.linkText}>
          {languages[Language].login.link} <Link href="/register">{languages[Language].login.link2}</Link>
        </div>
      </AuthRightSide>
      <Modal
        closeButton
        aria-labelledby="Forgot password modal"
        open={forgotPassword}
        onClose={() => setForgotPassword(false)}
        blur
        css={{ backgroundColor: "var(--nextui-colors-background)" }}
      >
        <Modal.Header>
          <h3 style={{ color: "var(--nextui-colors-red500)" }}>{languages[Language].modal.forgotPass.title}</h3>
        </Modal.Header>
        <Modal.Body>
          <h6 style={{ textAlign: "center" }}>{languages[Language].modal.forgotPass.body}</h6>
          <Input
            type="email"
            label={languages[Language].email}
            placeholder={languages[Language].email}
            onChange={(e) => setForgotPasswordEmail(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Grid.Container gap={1}>
            <Grid xs>
              <Button auto flat color="error" onPress={() => setForgotPassword(false)} css={{ width: "100%" }}>
                {languages[Language].modal.forgotPass.buttons.cancel}
              </Button>
            </Grid>
            <Grid xs>
              <Button
                auto
                color="success"
                onPress={() => {
                  setForgotPassword(false);
                  sendUserPasswordResetEmail(forgotPasswordEmail);
                }}
                css={{ width: "100%" }}
              >
                {languages[Language].modal.forgotPass.buttons.send}
              </Button>
            </Grid>
          </Grid.Container>
        </Modal.Footer>
      </Modal>
    </AuthContainer>
  );
};

export default withPublic(Login);
