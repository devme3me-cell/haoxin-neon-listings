import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import FloatingClouds from "./FloatingClouds";

interface CloudRevealProps {
  children: React.ReactNode;
}

const CloudReveal = ({ children }: CloudRevealProps) => {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      {children}
      
      {/* Floating clouds after reveal */}
      {isRevealed && <FloatingClouds />}
      
      <AnimatePresence>
        {!isRevealed && (
          <>
            {/* Left Cloud Group */}
            <motion.div
              initial={{ x: 0, opacity: 1 }}
              animate={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 2, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="fixed inset-y-0 left-0 w-[60%] z-50 pointer-events-none"
            >
              {/* Main cloud layer */}
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-transparent" />
              
              {/* Cloud shapes */}
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: "-20%" }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <svg viewBox="0 0 800 600" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <filter id="cloud-blur-left" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
                    </filter>
                    <linearGradient id="cloud-gradient-left" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="white" stopOpacity="1" />
                      <stop offset="70%" stopColor="white" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <ellipse cx="200" cy="100" rx="300" ry="150" fill="url(#cloud-gradient-left)" filter="url(#cloud-blur-left)" />
                  <ellipse cx="150" cy="300" rx="350" ry="180" fill="url(#cloud-gradient-left)" filter="url(#cloud-blur-left)" />
                  <ellipse cx="250" cy="500" rx="320" ry="160" fill="url(#cloud-gradient-left)" filter="url(#cloud-blur-left)" />
                  <ellipse cx="100" cy="200" rx="250" ry="120" fill="white" opacity="0.8" filter="url(#cloud-blur-left)" />
                  <ellipse cx="180" cy="400" rx="280" ry="140" fill="white" opacity="0.7" filter="url(#cloud-blur-left)" />
                </svg>
              </motion.div>
              
              {/* Wispy cloud trails */}
              <motion.div
                initial={{ x: 0, opacity: 0.8 }}
                animate={{ x: "-30%" }}
                transition={{ duration: 2.5, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <div className="absolute top-[10%] right-0 w-[80%] h-32 bg-gradient-to-l from-transparent via-white/60 to-white/90 blur-xl" />
                <div className="absolute top-[30%] right-0 w-[90%] h-40 bg-gradient-to-l from-transparent via-white/70 to-white blur-2xl" />
                <div className="absolute top-[50%] right-0 w-[85%] h-36 bg-gradient-to-l from-transparent via-white/50 to-white/80 blur-xl" />
                <div className="absolute top-[70%] right-0 w-[75%] h-28 bg-gradient-to-l from-transparent via-white/60 to-white/90 blur-2xl" />
              </motion.div>
            </motion.div>

            {/* Right Cloud Group */}
            <motion.div
              initial={{ x: 0, opacity: 1 }}
              animate={{ x: "100%", opacity: 0 }}
              transition={{ duration: 2, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="fixed inset-y-0 right-0 w-[60%] z-50 pointer-events-none"
            >
              {/* Main cloud layer */}
              <div className="absolute inset-0 bg-gradient-to-l from-white via-white to-transparent" />
              
              {/* Cloud shapes */}
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: "20%" }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <svg viewBox="0 0 800 600" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <filter id="cloud-blur-right" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
                    </filter>
                    <linearGradient id="cloud-gradient-right" x1="100%" y1="0%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="white" stopOpacity="1" />
                      <stop offset="70%" stopColor="white" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <ellipse cx="600" cy="150" rx="300" ry="160" fill="url(#cloud-gradient-right)" filter="url(#cloud-blur-right)" />
                  <ellipse cx="650" cy="350" rx="320" ry="170" fill="url(#cloud-gradient-right)" filter="url(#cloud-blur-right)" />
                  <ellipse cx="580" cy="520" rx="280" ry="140" fill="url(#cloud-gradient-right)" filter="url(#cloud-blur-right)" />
                  <ellipse cx="700" cy="250" rx="260" ry="130" fill="white" opacity="0.8" filter="url(#cloud-blur-right)" />
                  <ellipse cx="620" cy="450" rx="290" ry="150" fill="white" opacity="0.7" filter="url(#cloud-blur-right)" />
                </svg>
              </motion.div>
              
              {/* Wispy cloud trails */}
              <motion.div
                initial={{ x: 0, opacity: 0.8 }}
                animate={{ x: "30%" }}
                transition={{ duration: 2.5, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <div className="absolute top-[15%] left-0 w-[80%] h-32 bg-gradient-to-r from-transparent via-white/60 to-white/90 blur-xl" />
                <div className="absolute top-[35%] left-0 w-[90%] h-40 bg-gradient-to-r from-transparent via-white/70 to-white blur-2xl" />
                <div className="absolute top-[55%] left-0 w-[85%] h-36 bg-gradient-to-r from-transparent via-white/50 to-white/80 blur-xl" />
                <div className="absolute top-[75%] left-0 w-[75%] h-28 bg-gradient-to-r from-transparent via-white/60 to-white/90 blur-2xl" />
              </motion.div>
            </motion.div>

            {/* Center fog overlay */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="fixed inset-0 z-40 pointer-events-none bg-white/30 backdrop-blur-sm"
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CloudReveal;
