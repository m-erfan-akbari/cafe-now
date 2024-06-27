import Image from "next/image";
import styles from "./Header.module.css";
import Search from "./Search";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href='/' className={styles.logo_container}>
        <div className={styles.image_container}>
          <Image src={"/logo.svg"} alt='logo icon' fill />
        </div>
        <h2>کافه حال</h2>
      </Link>
      <Search />
    </header>
  );
}
