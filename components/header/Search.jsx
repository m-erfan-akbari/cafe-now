"use client";
import styles from "./Search.module.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Search() {
  const [value, setValue] = useState("");
  const router = useRouter();

  function handleSearch() {
    if (!value) return;
    router.push(`/order/${value}`);
  }

  return (
    <div className={styles.container}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={styles.search}
        placeholder='پیگیری سفارش'
      />

      <FaMagnifyingGlass className={styles.icon} onClick={handleSearch} />
    </div>
  );
}
