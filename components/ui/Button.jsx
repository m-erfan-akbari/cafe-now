import styles from "./Button.module.css";

export default function Button({
  children,
  type = "primary",
  size = "lg",
  rounded = "r-1",
  ...props
}) {
  // types: primary, secondary
  // sizes: lg, md
  // rounded: r-0, r-1, r-2, r-3 ,r-full
  return (
    <button
      className={`${styles.button} ${styles[type]} ${styles[size]} ${styles[rounded]} ${props.className}`}
      {...props}
    >
      {children}
    </button>
  );
}
