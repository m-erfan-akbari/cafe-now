import styles from "./ProductCounter.module.css";
import { addToCart } from "@/lib/redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { HiPlus, HiMinus, HiOutlineTrash } from "react-icons/hi";

export default function ProductCounter({
  product,
  countInCart,
  dark = false,
  className,
}) {
  const dispatch = useDispatch();

  return (
    <div
      className={` ${className} ${styles.container} ${dark ? styles.dark : ""}`}
    >
      <HiPlus
        className={`${styles.btn} ${styles.plus}`}
        onClick={() => dispatch(addToCart({ ...product, count: 1 }))}
      />

      <span className={styles.counter}>{countInCart}</span>

      {countInCart === 1 ? (
        <HiOutlineTrash
          className={`${styles.btn} ${styles.trash}`}
          onClick={() => dispatch(addToCart({ ...product, count: -1 }))}
        />
      ) : (
        <HiMinus
          className={`${styles.btn} ${styles.negative}`}
          onClick={() => dispatch(addToCart({ ...product, count: -1 }))}
        />
      )}
    </div>
  );
}
