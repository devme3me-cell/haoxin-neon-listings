import { useCallback } from "react";

type EasingFunction = (t: number) => number;

const easings: Record<string, EasingFunction> = {
  easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),
  easeInOutQuint: (t) => (t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2),
};

interface SmoothScrollOptions {
  duration?: number;
  easing?: keyof typeof easings;
  offset?: number;
}

export const useSmoothScroll = () => {
  const scrollToElement = useCallback(
    (targetId: string, options: SmoothScrollOptions = {}) => {
      const { duration = 800, easing = "easeInOutCubic", offset = 80 } = options;

      const target = document.getElementById(targetId);
      if (!target) return;

      const startPosition = window.pageYOffset;
      const targetPosition = target.getBoundingClientRect().top + startPosition - offset;
      const distance = targetPosition - startPosition;
      const easingFn = easings[easing];

      let startTime: number | null = null;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easingFn(progress);

        window.scrollTo(0, startPosition + distance * easedProgress);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    },
    []
  );

  return { scrollToElement };
};
