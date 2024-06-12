"use client";
import { usePathname, useRouter } from "next/navigation";
import styles from "./Navbar.module.css";
import NavbarListItem from "./NavbarListItem";
import { useCartSelector } from "@/lib/redux/features/cart/cartSlice";
import { IoCartOutline } from "react-icons/io5";
import { useState } from "react";
import CartModal from "../cart/CartModal";

export default function Navbar() {
  const [isOpenCart, setIsOpenCart] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const cart = useCartSelector();

  return (
    <nav className={styles.nav_container}>
      <ul className={styles.nav_list}>
        <NavbarListItem href={"/"} active={pathname === "/"}>
          خونه
        </NavbarListItem>
        <NavbarListItem href={"/menu"} active={pathname === "/menu"}>
          منو
        </NavbarListItem>
        <NavbarListItem href={"/about-us"} active={pathname === "/about-us"}>
          درباره‌ما
        </NavbarListItem>
      </ul>

      <div className={styles.container}>
        <IoCartOutline
          className={styles.cart_icon}
          onMouseEnter={() => setIsOpenCart(true)}
          onMouseLeave={() => setIsOpenCart(false)}
          onClick={() => router.push("/order")}
        />
        {cart.products.length > 0 && (
          <div
            className={styles.counter}
            onMouseEnter={() => setIsOpenCart(true)}
            onMouseLeave={() => setIsOpenCart(false)}
            onClick={() => router.push("/order")}
          >
            {cart.products?.length}
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
