import styles from "./SpinnerItem.module.css";
import Image from "next/image";

export default function SpinnerItem({ product, index, rotate }) {
  const { image, title } = product;
  return (
    <div
      className={styles.spinner_item}
      style={{
        transform: `rotateZ(${45 * index + rotate}deg)`,
        backgroundColor:
          index % 2 === 0
            ? `var(--color-primary)`
            : `var(--color-light-primary)`,
      }}
    >
      <div
        className={styles.image_container}
        style={{
          transform: `rotateZ(${-(45 * index) - rotate}deg)`,
        }}
      >
        <Image src={image} alt={`تصویر ${title}`} fill />
      </div>
    </div>
  );
}
