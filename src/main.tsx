import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Initialize animated favicon
const initAnimatedFavicon = () => {
  const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
  if (!favicon) return;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.crossOrigin = 'anonymous';
  
  let angle = 0;

  img.onload = () => {
    canvas.width = 32;
    canvas.height = 32;

    const animate = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, 32, 32);
      ctx.save();
      
      // Subtle breathing/pulse effect
      const scale = 1 + Math.sin(angle) * 0.06;
      const alpha = 0.9 + Math.sin(angle * 1.5) * 0.1;
      
      ctx.globalAlpha = alpha;
      ctx.translate(16, 16);
      ctx.scale(scale, scale);
      ctx.translate(-16, -16);
      
      ctx.drawImage(img, 0, 0, 32, 32);
      ctx.restore();

      favicon.href = canvas.toDataURL('image/png');
      angle += 0.03;
      
      requestAnimationFrame(animate);
    };

    animate();
  };

  img.src = favicon.href;
};

// Start favicon animation after DOM is ready
setTimeout(initAnimatedFavicon, 100);

createRoot(document.getElementById("root")!).render(<App />);
