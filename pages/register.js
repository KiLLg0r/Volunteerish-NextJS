import RegisterSvg from "../public/svg/register.svg";
import Error from "../components/Error";

import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";

import { validateError } from "../utilities/functions";

import styles from "./Auth.module.scss";
import { Row, Col, Button, Input, Spacer } from "@nextui-org/react";

const Register = () => {
  const { register } = useAuth();
  const [error, setError] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return setError({
        email: "",
        password: "",
        passwordConfirm: "Passwords do not match",
      });
    }

    try {
      setError({
        email: "",
        password: "",
        passwordConfirm: "",
      });
      setLoading(true);
      await register(email, password);
      router.push("/");
    } catch (error) {
      const errorValidated = validateError(error.code);
      if (errorValidated.type === "password")
        setError({
          email: "",
          password: errorValidated.error,
          passwordConfirm: "",
        });
      if (errorValidated.type === "email")
        setError({
          email: errorValidated.error,
          password: "",
          passwordConfirm: "",
        });
    }
    setLoading(false);
  }

  return (
    <Row
      fluid
      gap={0}
      css={{
        flexDirection: "column",
        padding: "0",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        "@sm": {
          flexDirection: "row",
          paddingInline: "1rem",
          paddingBlock: "2rem",
        },
      }}
    >
      <Col
        css={{
          backgroundColor: "$background",
          borderRadius: "0.625rem",
          "@sm": {
            backgroundColor: "$backgroundSecondary",
          },
        }}
      >
        <div style={{ padding: "1rem" }}>
          <h1 className={`${styles.title} ${styles.appName} `}>Volunteerish</h1>
          <RegisterSvg style={{ width: "80%", aspectRatio: "1", display: "block", marginInline: "auto" }} />
        </div>
      </Col>
      <Col>
        <div
          style={{
            padding: "2rem",
          }}
        >
          <h1 className={styles.title}>Create new account</h1>
          <form className="contact-form" onSubmit={handleSubmit}>
            <Input
              clearable
              label="Email"
              placeholder="Enter your email"
              fullWidth
              onChange={(e) => {
                setEmail(e.target.value);
                setError({
                  email: "",
                  password: "",
                  passwordConfirm: "",
                });
              }}
              size="lg"
              status={error.email.length > 0 && "error"}
              helperText={error.email.length > 0 && error.email}
              helperColor={error.email.length > 0 && "error"}
              required
            />
            <Spacer />
            <Input.Password
              clearable
              label="Password"
              placeholder="Enter your password"
              fullWidth
              onChange={(e) => {
                setPassword(e.target.value);
                setError({
                  email: "",
                  password: "",
                  passwordConfirm: "",
                });
              }}
              size="lg"
              status={error.password.length > 0 && "error"}
              helperText={error.password.length > 0 && error.password}
              helperColor={error.password.length > 0 && "error"}
              required
            />
            <Spacer />
            <Input.Password
              clearable
              label="Confirm password"
              placeholder="Enter your password again"
              fullWidth
              onChange={(e) => {
                setPassword(e.target.value);
                setError({
                  email: "",
                  password: "",
                  passwordConfirm: "",
                });
              }}
              size="lg"
              status={error.passwordConfirm.length > 0 && "error"}
              helperText={error.passwordConfirm.length > 0 && error.passwordConfirm}
              helperColor={error.passwordConfirm.length > 0 && "error"}
              required
            />
            <Spacer y={2} />
            <Button disabled={loading} type="submit" css={{ width: "100%", backgroundColor: "$red500" }}>
              Create account
            </Button>
          </form>
          <div className={styles.linkText}>
            Already have an account? <Link href="/login">Log in</Link>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Register;
