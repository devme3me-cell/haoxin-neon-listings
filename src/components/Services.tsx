import serviceProfessional from "@/assets/service-professional.webp";
import serviceIntegrity from "@/assets/service-integrity.webp";
import serviceCaring from "@/assets/service-caring.webp";
const services = [{
  number: "01",
  title: "專業服務",
  description: "壕芯實業提供專業的代銷服務，涵蓋塔位、生前契約、骨灰罈及內膽等多元產品。我們以豐富的經驗與專業知識，協助您做出最適切的選擇，為摯愛規劃完善的身後安排。",
  image: serviceProfessional
}, {
  number: "02",
  title: "誠信至上",
  description: "壕芯實業秉持誠信經營的核心理念，所有產品價格公開透明，絕無隱藏費用。我們重視每一位客戶的信任，以真誠的態度提供專業諮詢，讓您安心託付、無後顧之憂。",
  image: serviceIntegrity
}, {
  number: "03",
  title: "用心傾聽",
  description: "壕芯實業深知每位客戶的需求與心情皆不同，我們用心傾聽您的想法與期望，提供最貼心的建議與服務。無論是諮詢或規劃，我們都將陪伴您走過每一步，給予最溫暖的支持。",
  image: serviceCaring
}];
const Services = () => {
  return <section id="services" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24">
          <p className="section-title">專業 · 誠信 · 用心</p>
          <h2 className="section-heading">壕芯實業</h2>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => <div key={service.number} className="group bg-background p-8 card-hover rounded-lg" style={{
          animationDelay: `${index * 0.1}s`
        }}>
              {/* Number */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs tracking-wider text-muted-foreground">
                  {service.number}
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Image */}
              <div className="image-reveal aspect-square mb-6 bg-muted">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" loading="lazy" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-heading font-medium mb-4 tracking-wide">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>)}
        </div>
      </div>
    </section>;
};
export default Services;
