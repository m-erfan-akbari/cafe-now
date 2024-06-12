import styles from "./page.module.css";

export default function layout({ children }) {
  return (
    <div>
      <div className={styles.layout}>
        <div className={styles.overlay}></div>
      </div>
      {children}
    </div>
  );
}
