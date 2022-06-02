import styles from "./styles/Loading.module.scss";
import { useTheme } from "@nextui-org/react";

const Loading = () => {
  const { theme } = useTheme();

  return (
    <section className={styles.wrapper} style={{ backgroundColor: theme.colors.background.value }}>
      <div className={`${styles.square} ${styles.r0}`} style={{ borderColor: theme.colors.red500.value }}></div>
      <div className={`${styles.square} ${styles.r1}`} style={{ borderColor: theme.colors.red500.value }}></div>
      <div className={`${styles.square} ${styles.r2}`} style={{ borderColor: theme.colors.red500.value }}></div>
      <div className={`${styles.square} ${styles.r3}`} style={{ borderColor: theme.colors.red500.value }}></div>
      <div className={`${styles.square} ${styles.r4}`} style={{ borderColor: theme.colors.red500.value }}></div>
      <div className={`${styles.square} ${styles.r5}`} style={{ borderColor: theme.colors.red500.value }}></div>
      <div className={`${styles.square} ${styles.r6}`} style={{ borderColor: theme.colors.red500.value }}></div>
      <div className={`${styles.square} ${styles.r7}`} style={{ borderColor: theme.colors.red500.value }}></div>
      <div className={`${styles.square} ${styles.r8}`} style={{ borderColor: theme.colors.red500.value }}></div>
      <div className={`${styles.square} ${styles.r9}`} style={{ borderColor: theme.colors.red500.value }}></div>
      <div className={`${styles.square} ${styles.r10}`} style={{ borderColor: theme.colors.red500.value }}></div>
      <div className={`${styles.square} ${styles.r11}`} style={{ borderColor: theme.colors.red500.value }}></div>
      <div className={`${styles.square} ${styles.r12}`} style={{ borderColor: theme.colors.red500.value }}></div>
      <div className={`${styles.square} ${styles.r13}`} style={{ borderColor: theme.colors.red500.value }}></div>
      <div className={`${styles.square} ${styles.r14}`} style={{ borderColor: theme.colors.red500.value }}></div>
      <div className={`${styles.square} ${styles.r15}`} style={{ borderColor: theme.colors.red500.value }}></div>
      <div className={`${styles.square} ${styles.r16}`} style={{ borderColor: theme.colors.red500.value }}></div>
      <div className={`${styles.square} ${styles.r17}`} style={{ borderColor: theme.colors.red500.value }}></div>
    </section>
  );
};

export default Loading;
