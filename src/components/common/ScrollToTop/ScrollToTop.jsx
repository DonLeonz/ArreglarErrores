import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Componente que hace scroll al inicio de la página cuando cambia la ruta
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
