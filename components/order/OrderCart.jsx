"use client";
import styles from "./OrderCart.module.css";
import { useCartSelector } from "@/lib/redux/features/cart/cartSlice";
import OrderCartItem from "./OrderCartItem";
import { IoCartOutline } from "react-icons/io5";
import { watingTimeCalc } from "@/lib/constants";

export default function OrderCart() {
  const cart = useCartSelector();
  const { products, totalAmount } = cart;

  const totalCount = products.reduce((acc, cur) => acc + cur.count, 0);
  const waitingTime = watingTimeCalc(totalCount);

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h2>سبد خرید</h2>
        <IoCartOutline className={styles.cart_icon} />
      </div>
      <div className={styles.products_container}>
        {products.length > 0 && (
          <div className={styles.total_container}>
            <h5>
              <span>تعداد کالا‌ها: </span>
              <span>{totalCount}</span>
            </h5>
            <hr />
            <h5>
              <span>مبلغ کل: </span>
              <span>{totalAmount} تومان</span>
            </h5>
            <hr />
            <h5>
              <span>مدت انتظار: </span>
              <span>حدود {Math.floor(waitingTime / 60) + 1} دقیقه</span>
            </h5>
          </div>
        )}
        {products.map((prc) => (
          <OrderCartItem key={prc.id} product={prc} />
        ))}
      </div>
    </div>
  );
}
