import Link from "next/link";
import styles from "./NavbarListItem.module.css";

export default function NavbarListItem({ children, active, href }) {
  return (
    <Link href={href}>
      <li className={`${styles.item} ${active && styles.active}`}>
        {children}
      </li>
    </Link>
  );
}
