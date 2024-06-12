import Image from "next/image";
import styles from "./OrderCartItem.module.css";
import ProductCounter from "../product/ProductCounter";
import { HiOutlineX } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/lib/redux/features/cart/cartSlice";

export default function OrderCartItem({ product }) {
  const { id, name, count, image, total } = product;
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <Image src={image} alt={`تصویر ${name}`} fill />
      </div>
      <h3 className={styles.title}>{name}</h3>

      <p>{total} تومان</p>

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
  );
}
