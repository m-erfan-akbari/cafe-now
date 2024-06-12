import styles from "./Modal.module.css";
import useClickOutside from "@/hooks/useClickOutside";
import { IoMdCloseCircle } from "react-icons/io";

export default function Modal({ children, close = () => {}, classNames = "" }) {
  const modalRef = useClickOutside(close);

  return (
    <div className={styles.overlay}>
      <div className={`${styles.modal_container} ${classNames}`} ref={modalRef}>
        <IoMdCloseCircle onClick={close} className={styles.close} />
        {children}
      </div>
    </div>
  );
}
