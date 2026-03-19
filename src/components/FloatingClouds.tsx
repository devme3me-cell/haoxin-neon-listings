import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";

const FloatingClouds = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Fade out clouds quickly as user scrolls
  const containerOpacity = useTransform(scrollY, [0, 200, 500], [1, 0.3, 0]);

  // Optimized parallax with reduced calculation
  const parallaxSlow = useTransform(scrollY, [0, 1000], [0, -50]);
  const parallaxMedium = useTransform(scrollY, [0, 1000], [0, -120]);
  const parallaxFast = useTransform(scrollY, [0, 1000], [0, -200]);
  const parallaxHorizontalLeft = useTransform(scrollY, [0, 1000], [0, -80]);
  const parallaxHorizontalRight = useTransform(scrollY, [0, 1000], [0, 80]);

  // Memoize clouds data to prevent recalculation
  const clouds = useMemo(() => [
    { id: 1, size: 420, top: "5%", left: "-10%", duration: 80, delay: 0, opacity: 0.25, speed: "fast", horizontal: "left" },
    { id: 2, size: 350, top: "15%", left: "20%", duration: 95, delay: 3, opacity: 0.22, speed: "medium", horizontal: "right" },
    { id: 3, size: 390, top: "25%", left: "60%", duration: 75, delay: 6, opacity: 0.24, speed: "slow", horizontal: "left" },
    { id: 4, size: 310, top: "40%", left: "-5%", duration: 100, delay: 9, opacity: 0.2, speed: "fast", horizontal: "right" },
    { id: 5, size: 360, top: "60%", left: "30%", duration: 88, delay: 12, opacity: 0.22, speed: "medium", horizontal: "left" },
    { id: 6, size: 340, top: "75%", left: "70%", duration: 92, delay: 4, opacity: 0.24, speed: "slow", horizontal: "right" },
  ], []);

  const getParallaxY = (speed: string) => {
    switch (speed) {
      case "fast": return parallaxFast;
      case "medium": return parallaxMedium;
      default: return parallaxSlow;
    }
  };

  const getParallaxX = (direction: string) => {
    return direction === "left" ? parallaxHorizontalLeft : parallaxHorizontalRight;
  };

  // Optimized spring config for smoother animations
  const smoothTransition = {
    type: "tween",
    ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for smooth motion
  };

  return (
    <motion.div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none overflow-hidden z-[5]"
      style={{ 
        opacity: containerOpacity,
        willChange: "opacity",
        contain: "layout style paint",
      }}
    >
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ 
            x: ["0%", "120vw"],
            opacity: [0, cloud.opacity, cloud.opacity, 0],
          }}
          transition={{
            duration: cloud.duration,
            delay: cloud.delay + 2,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.15, 0.85, 1],
          }}
          style={{
            position: "absolute",
            top: cloud.top,
            left: cloud.left,
            width: cloud.size,
            height: cloud.size * 0.6,
            y: getParallaxY(cloud.speed),
            x: getParallaxX(cloud.horizontal),
            willChange: "transform, opacity",
            transform: "translateZ(0)",
          }}
        >
          <svg
            viewBox="0 0 200 120"
            className="w-full h-full drop-shadow-[0_8px_40px_rgba(120,120,120,0.35)] dark:drop-shadow-[0_4px_25px_rgba(255,255,255,0.2)]"
            style={{ filter: "blur(8px)" }}
          >
            <defs>
              <radialGradient id={`cloud-grad-${cloud.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" className="[stop-color:rgb(160,160,160)] dark:[stop-color:rgb(255,255,255)]" stopOpacity="0.9" />
                <stop offset="50%" className="[stop-color:rgb(185,185,185)] dark:[stop-color:rgb(240,240,255)]" stopOpacity="0.7" />
                <stop offset="100%" className="[stop-color:rgb(210,210,210)] dark:[stop-color:rgb(220,220,240)]" stopOpacity="0" />
              </radialGradient>
            </defs>
            <ellipse cx="100" cy="70" rx="80" ry="40" fill={`url(#cloud-grad-${cloud.id})`} />
            <ellipse cx="60" cy="60" rx="50" ry="30" fill={`url(#cloud-grad-${cloud.id})`} />
            <ellipse cx="140" cy="65" rx="45" ry="28" fill={`url(#cloud-grad-${cloud.id})`} />
          </svg>
        </motion.div>
      ))}

      {/* Simplified wispy clouds */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={`wisp-${i}`}
          className="absolute"
          style={{
            width: 500 + i * 30,
            height: 250 + i * 15,
            left: `${i * 25 - 5}%`,
            top: `${20 + i * 20}%`,
            y: i % 2 === 0 ? parallaxMedium : parallaxSlow,
            willChange: "transform, opacity",
            transform: "translateZ(0)",
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.15, 0.18, 0.15, 0],
          }}
          transition={{
            duration: 60 + i * 15,
            delay: 3 + i * 4,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
          }}
        >
          <div 
            className="w-full h-full rounded-full bg-gray-400/80 dark:bg-white/90"
            style={{ filter: "blur(45px)" }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FloatingClouds;
