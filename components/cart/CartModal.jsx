import useClickOutside from "@/hooks/useClickOutside";
import styles from "./CartModal.module.css";
import CartModalItem from "./CartModalItem";
import { IoBagCheckOutline } from "react-icons/io5";
import Link from "next/link";

export default function CartModal({ open, close, cart }) {
  const cartref = useClickOutside(close);

  return (
    <div
      className={styles.container}
      ref={cartref}
      onMouseOver={open}
      onMouseLeave={close}
    >
      <div className={styles.products_container}>
        {cart.products.map((prc) => (
          <div key={prc.id}>
            <CartModalItem product={prc} />
          </div>
        ))}
      </div>
      {cart.products.length > 0 && <hr className={styles.line} />}
      <div className={styles.footer}>
        <div>
          <span>جمع کل سفارش</span>
          <h6>{cart.totalAmount} تومان</h6>
        </div>
        <Link href={"/order"} onClick={close} className={styles.btn_submit}>
          <IoBagCheckOutline />
          تکمیل سفارش
        </Link>
      </div>
    </div>
  );
}
