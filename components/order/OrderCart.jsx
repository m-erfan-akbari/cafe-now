"use client";
import styles from "./OrderCart.module.css";
import { useCartSelector } from "@/lib/redux/features/cart/cartSlice";
import OrderCartItem from "./OrderCartItem";
import { IoCartOutline } from "react-icons/io5";
import { watingTimeCalc } from "@/lib/constants";
import Image from "next/image";
import Button from "../ui/Button";
import { FaLongArrowAltRight } from "react-icons/fa";
import Link from "next/link";
import sadCoffee from "@/public/images/sad-coffee.png";

export default function OrderCart() {
  const cart = useCartSelector();
  const { products, totalAmount } = cart;

  const totalCount = products.reduce((acc, cur) => acc + cur.count, 0);
  const waitingTime = watingTimeCalc(totalCount);

  const isCartEmpty = cart.products.length === 0;

  return (
    <div className={styles.container}>
      {isCartEmpty ? (
        <div className={styles.empty_container}>
          <div className={styles.image_container}>
            <Image src={sadCoffee} alt='empty cart picture' fill property />
          </div>

          <h3>سبد خرید خالی می‌باشد!</h3>

          <Link href='/menu'>
            <Button size='md'>
              <FaLongArrowAltRight />
              &nbsp;&nbsp;بازگشت به منو
            </Button>
          </Link>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
