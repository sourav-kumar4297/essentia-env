import { motion } from "framer-motion";

const GlobalLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
    >
      <motion.div
        className="w-14 h-14 border-2 border-white/20 border-t-white rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 1,
        }}
      />
    </motion.div>
  );
};

export default GlobalLoader;
