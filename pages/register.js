import RegisterSvg from "../public/svg/register.svg";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";

import { withPublic } from "../utilities/routes";
import { validateError } from "../utilities/functions";
import languages from "../utilities/languages.json";
import styles from "./styles/Auth.module.scss";
import { Button, Input, Spacer } from "@nextui-org/react";
import AuthContainer, { AuthLeftSide, AuthRightSide } from "../components/AuthContainer";
import Head from "next/head";

const Register = () => {
  const { register, Language } = useAuth();
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
        passwordConfirm: languages[Language].register.notMatch,
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
    <AuthContainer>
      <Head>
        <title>
          {languages[Language].headTags.register} | {languages[Language].headTags.title}
        </title>
      </Head>
      <AuthLeftSide>
        <div className={styles.authLeftContainer}>
          <h1 className={`${styles.title} ${styles.appName} `}>Volunteerish</h1>
          <RegisterSvg className={styles.authSVG} />
        </div>
      </AuthLeftSide>
      <AuthRightSide>
        <h1 className={styles.title}>{languages[Language].register.title}</h1>
        <form className="contact-form" onSubmit={handleSubmit}>
          <Input
            clearable
            label={languages[Language].email}
            placeholder={languages[Language].register.emailPlaceholder}
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
          <Spacer y={error.email.length ? 2 : 1} />
          <Input.Password
            clearable
            label={languages[Language].password}
            placeholder={languages[Language].register.passPlaceholder}
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
          <Spacer y={error.password.length ? 2 : 1} />
          <Input.Password
            clearable
            label={languages[Language].confirmPassword}
            placeholder={languages[Language].register.confirmPassPlaceholder}
            fullWidth
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
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
          <Spacer y={error.passwordConfirm.length ? 3 : 2} />
          <Button disabled={loading} type="submit" css={{ width: "100%", backgroundColor: "$red500" }}>
            {languages[Language].register.title}
          </Button>
        </form>
        <div className={styles.linkText}>
          {languages[Language].register.link} <Link href="/login">{languages[Language].register.link2}</Link>
        </div>
      </AuthRightSide>
    </AuthContainer>
  );
};

export default withPublic(Register);
