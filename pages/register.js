import RegisterSvg from "../public/svg/register.svg";
import Input from "../components/Input";
import Error from "../components/Error";

import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";

import { validateError } from "../utilities/functions";

import styles from "./Auth.module.scss";
import auth from "../config/firebase";

// export async function getServerSideProps() {
//   const currentUser = auth.currentUser;

//   if (currentUser) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// }

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { register } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await register(emailRef.current.value, passwordRef.current.value);
      router.push("/");
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
        <RegisterSvg />
      </div>
      <div className={styles.authContent}>
        <h1 className={styles.title}>Create new account</h1>
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
          <Input
            type="password"
            ref={passwordConfirmRef}
            name="Confirm password"
            icon="password"
            waitForChanges={true}
            changed={changed}
          />
          <button type="submit" className={styles.btn} disabled={loading}>
            Create account
          </button>
        </form>
        <div className={styles.linkText}>
          Already have an account? <Link href="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
