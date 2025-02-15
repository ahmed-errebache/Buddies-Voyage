import { useState, useEffect } from "react";

export default function FlashMessage({ message, type = "success", duration = 5000 }) {
  const [visible, setVisible] = useState(!!message);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), duration);

      return () => clearTimeout(timer); // Nettoie le timeout au démontage
    }
  }, [message, duration]);

  if (!visible) return null; // Ne pas afficher si le message est caché

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-2 rounded-md shadow-lg transition-opacity duration-1000 ${
        visible ? "opacity-100" : "opacity-0"
      } ${type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
    >
      {message}
    </div>
  );
}
