import { useEffect } from 'react';

export const useAnimatedFavicon = () => {
  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (!favicon) return;

    const originalHref = favicon.href;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    let animationFrame: number;
    let angle = 0;

    img.onload = () => {
      canvas.width = 32;
      canvas.height = 32;

      const animate = () => {
        if (!ctx) return;
        
        ctx.clearRect(0, 0, 32, 32);
        ctx.save();
        
        // Subtle breathing/pulse effect
        const scale = 1 + Math.sin(angle) * 0.08;
        const alpha = 0.85 + Math.sin(angle * 2) * 0.15;
        
        ctx.globalAlpha = alpha;
        ctx.translate(16, 16);
        ctx.scale(scale, scale);
        ctx.translate(-16, -16);
        
        ctx.drawImage(img, 0, 0, 32, 32);
        ctx.restore();

        favicon.href = canvas.toDataURL('image/png');
        angle += 0.05;
        
        animationFrame = requestAnimationFrame(animate);
      };

      animate();
    };

    img.src = originalHref;

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      favicon.href = originalHref;
    };
  }, []);
};
