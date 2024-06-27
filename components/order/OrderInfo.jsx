"use client";
import styles from "./OrderInfo.module.css";
import { FaUserEdit, FaPhoneAlt, FaLongArrowAltRight } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineCoffeeMaker } from "react-icons/md";
import Link from "next/link";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import { useState } from "react";
import { createOrder } from "@/lib/productActions";
import {
  useCartSelector,
  clearCart,
} from "@/lib/redux/features/cart/cartSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function OrderInfo() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();
  const cart = useCartSelector();
  const router = useRouter();

  const isCartEmpty = cart.products.length === 0;

  async function handleCreateOrder() {
    if (!name) return toast.error("نام را وارد نمائید!");
    if (!number) return toast.error("شماره تماس را وارد نمائید!");
    if (number.length !== 11)
      return toast.error("شماره تماس باید یازده رقم باشد!");
    if (!address) return toast.error("آدرس را وارد نمائید!");

    const products = cart.products;
    if (products?.length < 1) return toast.error("سبد خرید خالی می‌باشد!");

    const orderInfo = {
      name,
      number,
      address,
      products,
    };

    const data = await createOrder({ order: orderInfo });
    if (data?.status === "success") {
      toast.success(`${data.message}`);
      router.push(`/order/${data.data.id}`);
      dispatch(clearCart());
    } else {
      toast.error(`${data.message}`);
    }
  }

  if (isCartEmpty) return <></>;

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h2>اطلاعات تحویل گیرنده</h2>
        <FaUserEdit className={styles.icon} />
      </div>

      <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
        <div className={styles.input_container}>
          <label htmlFor='name' className={styles.input_title}>
            <span>نام</span>
            <FaUserEdit />
          </label>
          <input
            type='text'
            id='name'
            name='name'
            placeholder='مثال: محمد عابدینی'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.input_container}>
          <label htmlFor='phone-number' className={styles.input_title}>
            <span>شماره تماس</span>
            <FaPhoneAlt />
          </label>
          <input
            type='number'
            id='phone-number'
            name='phone-number'
            placeholder='مثال: 09150000000'
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.input_container}>
          <label htmlFor='address' className={styles.input_title}>
            <span>آدرس</span>
            <FaLocationDot />
          </label>
          <textarea
            type='text'
            id='address'
            name='address'
            placeholder='مثال: کوثر شمالی 6 - پلاک 2 - زنگ 3'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <button
          className={`${styles.submit} ${
            isCartEmpty ? styles.btn_disable : ""
          } `}
          onClick={handleCreateOrder}
          disabled={isCartEmpty}
        >
          <span>ثبت سفارش</span>
          <MdOutlineCoffeeMaker />
        </button>
      </form>
    </div>
  );
}
