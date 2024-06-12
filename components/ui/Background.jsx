import styles from "./Background.module.css";

export default function Background({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.overlay}></div>
      </div>
      <div>{children}</div>
    </div>
  );
}
