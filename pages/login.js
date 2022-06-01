import LoginSvg from "../public/svg/login.svg";
import Error from "../components/Error";
import Input from "../components/Input";

import { useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import styles from "./Auth.module.scss";

import { validateError } from "../utilities/functions";
import { withPublic } from "../utilities/routes";

const Login = ({ auth }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = auth;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      router.push("/dashboard");
    } catch (error) {
      setError(validateError(error.code));
    }
    setLoading(false);
  }

  const changed = (status) => {
    if (status) setError("");
  };

  return (
    <div className={styles.login}>
      <div className={styles.authHeader}>
        <h1 className={`${styles.title} ${styles.appName} `}>Volunteerish</h1>
        <LoginSvg />
      </div>
      <div className={styles.authContent}>
        <h1 className={styles.title}>Log in</h1>
        {error && <Error error={error} />}
        <form className="contact-form" onSubmit={handleSubmit}>
          <Input type="email" ref={emailRef} name="Email" icon="email" waitForChanges={true} changed={changed} />
          <Input
            type="password"
            ref={passwordRef}
            name="Password"
            icon="password"
            waitForChanges={true}
            changed={changed}
          />
          <button type="submit" className={styles.btn} disabled={loading}>
            Log in
          </button>
        </form>
        <div className={styles.linkText}>
          Need an account? <Link href="/register">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default withPublic(Login);
