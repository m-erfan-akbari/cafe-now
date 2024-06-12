import { useEffect, useRef } from "react";

const useClickOutside = (closeModalCallback) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModalCallback();
      }
    };

    const handleKeyPress = (e) => {
      if (e.key === "Escape") {
        closeModalCallback();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [closeModalCallback]);

  return modalRef;
};

export default useClickOutside;
