import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

// Import service images for the carousel
import serviceProfessional from "@/assets/service-professional.webp";
import serviceIntegrity from "@/assets/service-integrity.webp";
import serviceCaring from "@/assets/service-caring.webp";
import serviceKeyi from "@/assets/service-keyi.webp";
import serviceKaiyun from "@/assets/service-kaiyun.webp";
import serviceShengjiGuan from "@/assets/service-shengji-guan.webp";
import servicePaiwei from "@/assets/service-paiwei-new.webp";
import serviceShengji from "@/assets/service-shengji.webp";

const carouselItems = [
  { title: "專業服務", num: "01", image: serviceProfessional },
  { title: "誠信保障", num: "02", image: serviceIntegrity },
  { title: "用心關懷", num: "03", image: serviceCaring },
  { title: "靈骨塔位", num: "04", image: serviceKeyi },
  { title: "開運商品", num: "05", image: serviceKaiyun },
  { title: "生基造運", num: "06", image: serviceShengjiGuan },
  { title: "祖先牌位", num: "07", image: servicePaiwei },
  { title: "生命禮儀", num: "08", image: serviceShengji },
];

const StackedCarousel = () => {
  const [progress, setProgress] = useState(50);
  const [isDown, setIsDown] = useState(false);
  const startXRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const speedWheel = 0.02;
  const speedDrag = -0.1;
  
  const itemsCount = carouselItems.length;
  
  // Calculate z-index for stacking effect
  const getZIndex = useCallback((index: number, activeIndex: number) => {
    return itemsCount - Math.abs(index - activeIndex);
  }, [itemsCount]);
  
  // Calculate active item based on progress
  const active = Math.floor((Math.max(0, Math.min(progress, 100)) / 100) * (itemsCount - 1));
  
  // Handle wheel scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const wheelProgress = e.deltaY * speedWheel;
      setProgress(prev => Math.max(0, Math.min(prev + wheelProgress, 100)));
    };
    
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);
  
  // Handle mouse/touch drag
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDown(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    startXRef.current = clientX;
  };
  
  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDown) return;
    const clientX = 'touches' in e 
      ? e.touches[0].clientX 
      : e.clientX;
    const mouseProgress = (clientX - startXRef.current) * speedDrag;
    setProgress(prev => Math.max(0, Math.min(prev + mouseProgress, 100)));
    startXRef.current = clientX;
  };
  
  const handleMouseUp = () => {
    setIsDown(false);
  };
  
  // Click on item to focus
  const handleItemClick = (index: number) => {
    const newProgress = (index / itemsCount) * 100 + 10;
    setProgress(Math.max(0, Math.min(newProgress, 100)));
  };

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-br from-background via-background to-secondary/20 overflow-hidden">
      <div className="container px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 0.46, 0.45, 0.94] 
          }}
          className="text-center mb-12"
        >
          <p className="section-title">EXPLORE</p>
          <h2 className="section-heading mb-8">精 選 服 務</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            滾動或拖曳探索我們的服務項目
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div 
          ref={containerRef}
          className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          {carouselItems.map((item, index) => {
            const zIndex = getZIndex(index, active);
            const activeOffset = (index - active) / itemsCount;
            const translateX = activeOffset * 800;
            const translateY = activeOffset * 200;
            const rotation = activeOffset * 120;
            const opacity = Math.max(0, (zIndex / itemsCount) * 3 - 2);
            
            return (
              <div
                key={index}
                onClick={() => handleItemClick(index)}
                className="absolute top-1/2 left-1/2 overflow-hidden rounded-xl select-none pointer-events-auto"
                style={{
                  width: 'clamp(150px, 30vw, 300px)',
                  height: 'clamp(200px, 40vw, 400px)',
                  marginTop: 'calc(clamp(200px, 40vw, 400px) * -0.5)',
                  marginLeft: 'calc(clamp(150px, 30vw, 300px) * -0.5)',
                  zIndex,
                  transformOrigin: '0% 100%',
                  transform: `translate(${translateX}%, ${translateY}%) rotate(${rotation}deg)`,
                  transition: 'transform 0.8s cubic-bezier(0, 0.02, 0, 1)',
                  boxShadow: '0 10px 50px 10px rgba(0, 0, 0, 0.5)',
                }}
              >
                {/* Card Content */}
                <div 
                  className="absolute z-10 inset-0 w-full h-full"
                  style={{
                    opacity,
                    transition: 'opacity 0.8s cubic-bezier(0, 0.02, 0, 1)',
                  }}
                >
                  {/* Gradient overlay */}
                  <div 
                    className="absolute inset-0 z-10"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.5))',
                    }}
                  />
                  
                  {/* Number */}
                  <div 
                    className="absolute z-20 top-2 left-4 font-heading text-white/80"
                    style={{
                      fontSize: 'clamp(20px, 10vw, 80px)',
                      textShadow: '0 4px 4px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    {item.num}
                  </div>
                  
                  {/* Title */}
                  <div 
                    className="absolute z-20 bottom-4 left-4 text-white font-heading"
                    style={{
                      fontSize: 'clamp(16px, 3vw, 24px)',
                      textShadow: '0 4px 4px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    {item.title}
                  </div>
                </div>
                
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover pointer-events-none"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
        
        {/* Progress indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => handleItemClick(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === active 
                  ? 'bg-warm-gold w-6' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StackedCarousel;
