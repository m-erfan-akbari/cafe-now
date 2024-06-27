"use client";
import { usePathname, useRouter } from "next/navigation";
import styles from "./Navbar.module.css";
import NavbarListItem from "./NavbarListItem";
import { useCartSelector } from "@/lib/redux/features/cart/cartSlice";
import { IoCartOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import CartModal from "../cart/CartModal";
import { useDispatch } from "react-redux";

export default function Navbar() {
  const [isOpenCart, setIsOpenCart] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const cart = useCartSelector();

  const totalCount = cart.products.reduce((acc, cur) => acc + cur.count, 0);

  return (
    <nav className={styles.nav_container}>
      <ul className={styles.nav_list}>
        <NavbarListItem href={"/"} active={pathname === "/"}>
          خونه
        </NavbarListItem>
        <NavbarListItem href={"/menu"} active={pathname === "/menu"}>
          منو
        </NavbarListItem>
        <NavbarListItem href={"/random"} active={pathname === "/random"}>
          گردونه
        </NavbarListItem>
        <NavbarListItem
          href={"#order-search"}
          active={pathname === "#order-search"}
        >
          پیگیری سفارش
        </NavbarListItem>
      </ul>

      <div className={styles.container}>
        <IoCartOutline
          className={styles.cart_icon}
          onMouseEnter={() => setIsOpenCart(true)}
          onMouseLeave={() => setIsOpenCart(false)}
          onClick={() => router.push("/order")}
        />
        {totalCount > 0 && (
          <div
            className={styles.counter}
            onMouseEnter={() => setIsOpenCart(true)}
            onMouseLeave={() => setIsOpenCart(false)}
            onClick={() => router.push("/order")}
          >
            {totalCount}
          </div>
        )}
      </div>

      {isOpenCart && (
        <CartModal
          open={() => setIsOpenCart(true)}
          close={() => setIsOpenCart(false)}
          cart={cart}
        />
      )}
    </nav>
  );
}
