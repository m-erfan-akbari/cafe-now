import styles from "./Header.module.css";
import Search from "./Search";

export default function Header() {
  return (
    <header className={styles.header}>
      <h3 className={styles.logo}>☕</h3>
      <Search />
    </header>
  );
}
