import Image from "next/image";
import styles from "./ProductCard.module.css";
import { formatCurrency } from "@/lib/formatCurrency";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/redux/features/cart/cartSlice";
import ProductCounter from "./ProductCounter";

export default function ProductCard({ product, countInCart }) {
  const { name, price, image, description } = product;
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <Image
        src={image}
        alt={`تصویر ${name}`}
        width={200}
        height={200}
        className={styles.image}
      />

      <h4 className={styles.title}>{name}</h4>
      <h5 className={styles.price}>{formatCurrency(price)} تومان</h5>

      <div className={styles.btn_container}>
        {countInCart < 1 ? (
          <button
            className={styles.btn_add}
            onClick={() => dispatch(addToCart({ ...product, count: 1 }))}
          >
            افزودن به سبد
          </button>
        ) : (
          <ProductCounter product={product} countInCart={countInCart} />
        )}
      </div>
    </div>
  );
}
