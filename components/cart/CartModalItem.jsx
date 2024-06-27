import Image from "next/image";
import styles from "./CartModalItem.module.css";
import ProductCounter from "../product/ProductCounter";
import { HiOutlineX } from "react-icons/hi";
import { removeFromCart } from "@/lib/redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";

export default function CartModalItem({ product }) {
  const dispatch = useDispatch();

  const { id, name, count, image, total } = product;
  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <Image src={image} alt={`تصویر ${name}`} fill />
      </div>
      <div className={styles.text_container}>
        <h5 className={styles.name}>{name}</h5>
        <h6 className={styles.total}>
          {total} <span>تومان</span>
        </h6>
        <ProductCounter
          product={product}
          countInCart={count}
          dark={true}
          className={styles.counter}
        />
        <HiOutlineX
          className={styles.remove_icon}
          onClick={() => dispatch(removeFromCart(id))}
        />
      </div>
    </div>
  );
}
