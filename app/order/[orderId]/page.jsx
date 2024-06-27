import OrderProductItem from "@/components/order/OrderProductItem";
import styles from "./page.module.css";
import { getOrder } from "@/lib/productActions";
import Progress from "@/components/ui/Progress";
import { FaCheck, FaListCheck, FaBoxOpen } from "react-icons/fa6";
import { MdDeliveryDining } from "react-icons/md";
import { getPersianDate, unixToString } from "@/lib/formatTime";

export default async function page({ params }) {
  const orderId = params.orderId;
  const data = await getOrder(orderId.toLowerCase());
  const { data: order } = data;

  if (data.status !== "success") {
    return (
      <p className={styles.container} style={{ textAlign: "center" }}>
        {data.message}
      </p>
    );
  }

  const {
    id,
    name,
    number,
    address,
    products,
    totalProducts,
    totalAmount,
    currentStep,
    createdAt,
    acceptedAt,
    preparedAt,
    sentAt,
    deliveredAt,
  } = order || {};

  const now = Math.floor(new Date().getTime() / 1000);

  const steps = [
    {
      icon: <FaCheck />,
      title:
        now > acceptedAt
          ? `سفارش تایید شد ${unixToString(acceptedAt)}`
          : "تایید سفارش",
    },
    {
      icon: <FaListCheck />,
      title:
        now > preparedAt
          ? `آماده شد ${unixToString(preparedAt)}`
          : "در حال آماده سازی",
    },
    {
      icon: <MdDeliveryDining />,
      title:
        now > sentAt ? `تحویل پیک شد ${unixToString(sentAt)}` : "ارسال پیک",
    },
    {
      icon: <FaBoxOpen />,
      title:
        now > deliveredAt ? `تحویل شد ${unixToString(deliveredAt)}` : "تحویل",
    },
  ];

  return (
    <div className={styles.container}>
      <Progress steps={steps} currentStep={currentStep} />

      <div className={styles.item}>
        <div className={styles.title}>
          <h3>کد پیگیری </h3>
          <p>{id}</p>
        </div>
      </div>
      <hr />

      <div className={styles.item}>
        <div className={styles.title}>
          <h3>تاریخ ثبت سفارش </h3>
          <p>{getPersianDate(createdAt)}</p>
        </div>
      </div>
      <hr />

      <div className={styles.item}>
        <div className={styles.title}>
          <h3>نام گیرنده </h3>
          <p>{name}</p>
        </div>
      </div>
      <hr />

      <div className={styles.item}>
        <div className={styles.title}>
          <h3>شماره تماس </h3>
          <p>{number}</p>
        </div>
      </div>
      <hr />

      <div className={styles.item}>
        <div className={styles.title}>
          <h3>آدرس </h3>
          <p className={styles.address}>{address}</p>
        </div>
      </div>
      <hr />

      <div className={styles.item}>
        <div className={styles.title}>
          <h3>محصولات </h3>
          <p>{totalProducts} عدد</p>
        </div>
        <div>
          <OrderProductItem
            product={{
              image: "/logo.svg",
              name: "جمع کل",
              count: totalProducts,
              total: totalAmount,
            }}
          />
          {products.map((prc) => (
            <OrderProductItem key={prc.id} product={prc} />
          ))}
        </div>
      </div>
    </div>
  );
}
