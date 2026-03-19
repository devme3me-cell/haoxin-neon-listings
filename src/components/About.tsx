import { ArrowRight } from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
const stats = [{
  number: "10+",
  label: "年服務經驗"
}, {
  number: "1,000+",
  label: "服務家庭"
}, {
  number: "24",
  label: "小時服務"
}, {
  number: "100%",
  label: "客戶滿意"
}];
const About = () => {
  return <section id="about" className="py-24 lg:py-32">
      <div className="container px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Images */}
          <div className="relative">
            <div className="image-reveal">
              <img alt="禮儀服務" className="w-full aspect-[4/5] object-cover rounded-lg" src="https://s.web66.com.tw/_file/C15/158556/AB/13663383984661.jpg" loading="lazy" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-2/3 image-reveal hidden md:block">
              <img alt="接待大廳" className="w-full aspect-square object-cover border-8 border-background shadow-2xl" src="https://arielhsu.tw/wp-content/uploads/20201105021040_100.jpg" loading="lazy" />
            </div>
          </div>

          {/* Content */}
          <div className="lg:pl-12">
            <p className="section-title">ABOUT US</p>
            <h2 className="section-heading mb-8">關於我們</h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              壕芯實業主要以服務殯葬禮儀、代銷殯葬商品、生基科儀、法會等服務，累積多年經驗，擁有為數不少的客群，秉持著「以客為尊」的企業精神服務每一位客戶，提供高規格高品質的優良服務，長期受到客戶的信任與肯定。
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              公司管理嚴謹，強調以客為尊，重視員工的素質，對未來充滿企圖心及願景，嚴守主要核心價值：責任與尊重。
            </p>

            <ul className="space-y-4 mb-12">
              {["代銷塔位、生前契約諮詢", "生基、造生基、生基承租"].map(item => <li key={item} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-warm-gold rounded-full" />
                  <span className="text-foreground">{item}</span>
                </li>)}
            </ul>

            <a href="#contact" className="inline-flex items-center gap-3 text-sm tracking-wider font-medium group">
              了解更多
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-24 pt-16 border-t border-border">
          {stats.map(stat => <div key={stat.label} className="text-center">
              <div className="text-4xl lg:text-5xl font-heading font-light text-foreground mb-2">{stat.number}</div>
              <div className="text-sm tracking-wider text-muted-foreground">{stat.label}</div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default About;