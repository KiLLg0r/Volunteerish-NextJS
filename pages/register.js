import RegisterSvg from "../public/svg/register.svg";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";

import { withProtected } from "../../utilities/routes";
import { validateError } from "../utilities/functions";

import styles from "./styles/Auth.module.scss";
import { Button, Input, Spacer } from "@nextui-org/react";
import AuthContainer, { AuthLeftSide, AuthRightSide } from "../components/AuthContainer";

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
    <AuthContainer>
      <AuthLeftSide>
        <div className={styles.authLeftContainer}>
          <h1 className={`${styles.title} ${styles.appName} `}>Volunteerish</h1>
          <RegisterSvg className={styles.authSVG} />
        </div>
      </AuthLeftSide>
      <AuthRightSide>
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
          <Spacer y={error.email.length ? 2 : 1} />
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
          <Spacer y={error.password.length ? 2 : 1} />
          <Input.Password
            clearable
            label="Confirm password"
            placeholder="Enter your password again"
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
            Create account
          </Button>
        </form>
        <div className={styles.linkText}>
          Already have an account? <Link href="/login">Log in</Link>
        </div>
      </AuthRightSide>
    </AuthContainer>
  );
};

export default withProtected(Register);
