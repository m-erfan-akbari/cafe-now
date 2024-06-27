import styles from "./Background.module.css";

export default function Background({ children, imageSrc = `/images/bg.jpg` }) {
  return (
    <div className={styles.container}>
      <div
        className={styles.background}
        style={{
          backgroundImage: `url("${imageSrc}")`,
        }}
      >
        <div className={styles.overlay}></div>
      </div>
      <div>{children}</div>
    </div>
  );
}
