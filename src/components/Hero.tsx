import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImage from "@/assets/hero-memorial.webp";
const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  return <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center dark overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0 z-0" style={{
      y: backgroundY,
      willChange: "transform"
    }}>
        <motion.img 
          src={heroImage} 
          alt="壕芯實業禮儀服務" 
          className="w-full h-[120%] object-cover" 
          fetchPriority="high"
          style={{
            opacity
          }} 
          initial={{
            scale: 1
          }} 
          animate={{
            scale: [1, 1.08, 1],
            x: [0, 15, 0],
            y: [0, -10, 0]
          }} 
          transition={{
            duration: 25,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }} 
        />
      </motion.div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background/90 via-background/60 to-transparent" />

      {/* Content */}
      <div className="container relative z-10 px-6 lg:px-12 pt-24">
        <div className="max-w-2xl">
          
          
          <motion.h1 
            className="text-4xl md:text-5xl font-heading leading-tight mb-8 font-semibold lg:text-7xl relative" 
            style={{
              background: "linear-gradient(90deg, hsl(38, 70%, 50%) 0%, hsl(45, 90%, 75%) 20%, hsl(50, 95%, 80%) 40%, hsl(45, 90%, 75%) 60%, hsl(38, 70%, 50%) 80%, hsl(45, 85%, 70%) 100%)",
              backgroundSize: "300% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 0 40px hsla(45, 80%, 60%, 0.3)",
              willChange: "background-position, opacity, transform"
            }} 
            initial={{ opacity: 1, y: 0 }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              y: [40, 0],
              opacity: [0.8, 1]
            }} 
            transition={{
              backgroundPosition: {
                duration: 6,
                ease: "linear",
                repeat: Infinity
              },
              y: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              },
              opacity: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }
            }}
          >
            壕芯實業
          </motion.h1>
          
          <p className="md:text-xl mb-6 max-w-xl animate-slide-up leading-relaxed text-sm mt-[96px] mb-[60px] pb-[25px] text-zinc-50 font-normal" style={{
          animationDelay: "0.2s"
        }}>代銷塔位、生前契約、骨灰罈、內膽等相關諮詢之代銷服務;生基、造生基、代銷生基、生基承租、科儀等服務</p>
          

          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up pb-[100px]" style={{
          animationDelay: "0.4s"
        }}>
            
            <a href="#contact" className="inline-flex items-center justify-center gap-3 border border-primary text-primary py-4 text-sm tracking-wider hover:bg-primary hover:text-primary-foreground transition-all duration-300 px-[19px]">
              立即諮詢
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-fade-in" style={{
      animationDelay: "0.6s"
    }}>
        <span className="text-xs tracking-[0.3em] text-muted-foreground pt-[100px]">SCROLL</span>
        <div className="w-px h-16 bg-gradient-to-b from-muted-foreground to-transparent" />
      </div>
    </section>;
};
export default Hero;