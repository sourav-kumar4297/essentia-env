import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import GlobalLoader from "./GlobalLoader";

const RouteChangeLoader = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // 🔥 loader duration (adjustable)

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence>{loading && <GlobalLoader />}</AnimatePresence>
      {children}
    </>
  );
};

export default RouteChangeLoader;
