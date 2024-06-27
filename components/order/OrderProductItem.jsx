import styles from "./OrderProductItem.module.css";
import Image from "next/image";

export default function OrderProductItem({ product }) {
  const { id, name, count, image, total } = product;

  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <Image src={image} alt={`تصویر ${name}`} fill />
      </div>
      <h3 className={styles.title}>{name}</h3>

      <p>{count} عدد</p>

      <p>{total} تومان</p>
    </div>
  );
}
