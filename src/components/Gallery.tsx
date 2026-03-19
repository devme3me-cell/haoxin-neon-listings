import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { serviceItems } from "@/data/serviceData";

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 lg:py-32 bg-secondary/30">
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
          <p className="section-title">OUR SERVICES</p>
          <h2 className="section-heading mb-8">服務項目</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            誠摯服務，用心至上
          </p>
        </motion.div>

        {/* Services Grid - Centered */}
        <div className="flex flex-wrap justify-center gap-4">
          {serviceItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.75rem)] lg:w-[calc(20%-0.8rem)]"
            >
              <Link
                to={`/service/${item.id}`}
                className="group relative block bg-background border border-border rounded-xl hover:border-warm-gold hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all duration-300 overflow-hidden"
              >
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-4 text-center">
                  <h4 className="text-lg font-heading group-hover:text-primary transition-colors duration-300">
                    {item.name}
                  </h4>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
