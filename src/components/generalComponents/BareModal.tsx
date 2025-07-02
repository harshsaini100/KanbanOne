import { useEffect, useRef, useState } from "react";

export default function BareModal(
    { 
        show, 
        setShow, 
        children, 
        size,
    }:
    {
        show: boolean,
        setShow: any,
        children: any,
        size?: "sm" | "md" | "lg" | "xl"
      }) 
    {
  const ref = useRef<any>(null);
  const [isVisible, setIsVisible] = useState(show);

  // Manage visibility for animation
  useEffect(() => {
    if (show) setIsVisible(true);
  }, [show]);

  // Close modal on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClose();
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isVisible]);

  function handleClose() {
    setIsVisible(false);
    setTimeout(() => setShow(false), 300); // Matches transition duration
  }

  if (!show && !isVisible) return null;

  const modalTypeClass = `modal-${size || "sm"}`;

  return (
    <div
      className={`${modalTypeClass} fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        ref={ref}
        className={`h-full modal-card bg-white rounded-xl w-full shadow-lg transform transition-all duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
       
        <div className="p-6 modal-body-bare h-full">
            {children}
        </div>
     
      </div>
    </div>
  );
}
