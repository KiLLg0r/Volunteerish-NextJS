import styles from "./Error.module.scss";

const Error = ({ error }) => {
  return (
    <div className={styles.errorMessage} role="alert">
      {error}
    </div>
  );
};

export default Error;
