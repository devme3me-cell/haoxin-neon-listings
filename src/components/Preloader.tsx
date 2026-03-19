import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  children: React.ReactNode;
  duration?: number;
}

const Preloader = ({ children, duration = 3000 }: PreloaderProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
            style={{ willChange: "opacity" }}
          >
            <div className="shining-text">壕芯實業</div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ 
          duration: 0.6, 
          delay: 0.2,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        style={{ willChange: isLoading ? "opacity" : "auto" }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default Preloader;
