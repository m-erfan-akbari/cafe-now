import OrderCart from "@/components/order/OrderCart";
import styles from "./page.module.css";
import OrderInfo from "@/components/order/OrderInfo";

export default function page() {
  return (
    <div className={styles.container}>
      <OrderCart />
      <OrderInfo />
    </div>
  );
}
