"use client";
import styles from "./Spinner.module.css";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/productActions";
import Image from "next/image";
import Button from "../ui/Button";
import SpinnerItem from "./SpinnerItem";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/redux/features/cart/cartSlice";

export default function Spinner() {
  const [data, setData] = useState({
    products: [],
    isLoading: false,
    error: null,
  });

  const [rotate, setRotate] = useState(0);
  const [currentCoffee, setCurrentCoffee] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getItems() {
      setData({
        products: null,
        isLoading: true,
        error: null,
      });

      try {
        const res = await getProducts();

        if (res.error) {
          throw new Error(res.error);
        }

        setData({
          products: res.products,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setData({
          products: null,
          isLoading: false,
          error: error,
        });
      }
    }
    getItems();
  }, []);

  useEffect(() => {
    if (data.products && rotate !== 0) {
      setTimeout(() => {
        const curCoffeeNumber = 8 - Math.floor(((rotate % 360) + 22) / 45);
        setCurrentCoffee(
          data.products.at(curCoffeeNumber - 1 !== -1 ? curCoffeeNumber - 1 : 7)
        );
      }, 4100);
    }
  }, [rotate, data]);

  if (data.isLoading) {
    return <h4>در حال بارگیری...</h4>;
  }

  if (data.error) {
    return <h4>{data.error}</h4>;
  }

  function handleSpin() {
    const randomRotate = Math.round(Math.random() * 720) + 1234;
    setRotate((r) => r + randomRotate);
  }

  function handleAddToCart() {
    dispatch(addToCart({ ...currentCoffee, count: 1 }));
  }

  return (
    <section className={styles.container} id='spinner'>
      <div className={styles.right_container}>
        <h2 className={styles.title}>بچرخون، انتخاب کن!</h2>
        <div className={styles.image_container}>
          {currentCoffee && (
            <Image
              src={currentCoffee?.image}
              alt={`تصویر ${currentCoffee?.title}`}
              fill
            />
          )}
        </div>
        {rotate ? (
          <Button
            size='md'
            onClick={handleAddToCart}
            disabled={!currentCoffee}
            style={{ cursor: `${currentCoffee ? "pointer" : "not-allowed"}` }}
          >
            افزودن به سبد
          </Button>
        ) : (
          <Button size='md' onClick={handleSpin}>
            چرخش
          </Button>
        )}
      </div>
      <div className={styles.spinner}>
        <button className={styles.spin_button} onClick={handleSpin}>
          چرخش
        </button>
        {data.products.length > 0 &&
          data.products
            .filter((_, index) => index < 8)
            .map((p, index) => (
              <SpinnerItem
                key={p.id}
                product={p}
                index={index}
                rotate={rotate}
              />
            ))}
      </div>
    </section>
  );
}
