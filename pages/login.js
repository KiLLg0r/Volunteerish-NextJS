import LoginSvg from "../public/svg/login.svg";

import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import styles from "./styles/Auth.module.scss";

import { validateError } from "../utilities/functions";
import { withPublic } from "../utilities/routes";

import { Button, Input, Spacer } from "@nextui-org/react";
import AuthContainer, { AuthLeftSide, AuthRightSide } from "../components/AuthContainer";

const Login = ({ auth }) => {
  const { login } = auth;
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      <AuthLeftSide>
        <div className={styles.authLeftContainer}>
          <h1 className={`${styles.title} ${styles.appName} `}>Volunteerish</h1>
          <LoginSvg className={styles.authSVG} />
        </div>
      </AuthLeftSide>
      <AuthRightSide>
        <h1 className={styles.title}>Log in</h1>
        <form className="contact-form" onSubmit={handleSubmit}>
          <Input
            clearable
            label="Email"
            placeholder="Email"
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
            label="Password"
            placeholder="Password"
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
          <Spacer y={error.password.length ? 3 : 2} />
          <Button disabled={loading} type="submit" css={{ width: "100%", backgroundColor: "$red500" }}>
            Log in
          </Button>
        </form>
        <div className={styles.linkText}>
          Need an account? <Link href="/register">Sign up</Link>
        </div>
      </AuthRightSide>
    </AuthContainer>
  );
};

export default withPublic(Login);
