import useClickOutside from "@/hooks/useClickOutside";
import styles from "./CartModal.module.css";
import CartModalItem from "./CartModalItem";
import { IoBagCheckOutline } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import Button from "../ui/Button";

export default function CartModal({ open, close, cart }) {
  const cartref = useClickOutside(close);

  const isCartEmpty = cart.products.length === 0;

  return (
    <div
      className={styles.container}
      ref={cartref}
      onMouseOver={open}
      onMouseLeave={close}
    >
      {isCartEmpty ? (
        <div className={styles.empty_container}>
          <div className={styles.image_container}>
            <Image
              src={"/images/sad-coffee.png"}
              alt='empty cart picture'
              fill
            />
          </div>
          <h3>سبد خرید خالی می‌باشد!</h3>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
