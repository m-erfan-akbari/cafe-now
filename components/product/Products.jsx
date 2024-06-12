"use client";

import { useCartSelector } from "@/lib/redux/features/cart/cartSlice";
import ProductCard from "./ProductCard";
import styles from "./Products.module.css";

export default function Products({ products }) {
  const cart = useCartSelector();

  return (
    <div className={styles.container}>
      {products.map((prc) => (
        <ProductCard
          key={prc.id}
          product={prc}
          countInCart={cart.products.find((p) => p.id === prc.id)?.count || 0}
        />
      ))}
    </div>
  );
}
