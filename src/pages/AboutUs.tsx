import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Shield, Award, Users } from "lucide-react";
import Contact from "@/components/Contact";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const fadeInUp = {
    hidden: {
      opacity: 0,
      y: 60
    },
    visible: {
      opacity: 1,
      y: 0
    }
  };
  const staggerContainer = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  const values = [{
    icon: Heart,
    title: "以誠為本",
    description: "每一份託付，都是重若千金的信任"
  }, {
    icon: Shield,
    title: "專業守護",
    description: "嚴謹守護每一處細節"
  }, {
    icon: Award,
    title: "卓越品質",
    description: "最高規格的品質控管"
  }, {
    icon: Users,
    title: "以客為尊",
    description: "成為最堅實且溫暖的後盾"
  }];
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header initial={{
      opacity: 0,
      y: -20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.6
    }} className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm tracking-wider">返回首頁</span>
            </Link>
            <Link to="/" className="flex flex-col items-center">
              <span className="text-lg font-heading font-semibold tracking-wider">
                壕芯實業
              </span>
            </Link>
            <div className="w-20" />
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 0.03
      }} transition={{
        duration: 1
      }} className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

        <div className="container mx-auto px-6 lg:px-12">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto text-center">
            <motion.p variants={fadeInUp} transition={{
            duration: 0.8
          }} className="text-sm tracking-[0.3em] text-muted-foreground mb-6">
              ABOUT US
            </motion.p>
            <motion.h1 variants={fadeInUp} transition={{
            duration: 0.8,
            delay: 0.1
          }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-light leading-tight mb-8">
              關於我們
            </motion.h1>
            <motion.div variants={fadeInUp} transition={{
            duration: 0.8,
            delay: 0.2
          }} className="w-20 h-px bg-primary mx-auto mb-8" />
            <motion.p variants={fadeInUp} transition={{
            duration: 0.8,
            delay: 0.3
          }} className="text-xl md:text-2xl font-light text-muted-foreground leading-relaxed">
              以誠為本，傳承生命的尊榮與福澤
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{
          once: true,
          margin: "-100px"
        }} variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {values.map((value, index) => <motion.div key={index} variants={fadeInUp} transition={{
            duration: 0.6,
            delay: index * 0.1
          }} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 border border-border rounded-full flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all duration-300">
                  <value.icon className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-heading mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>)}
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto space-y-24">
            {/* Section 1 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{
            once: true,
            margin: "-100px"
          }} variants={staggerContainer} className="relative">
              <motion.div variants={fadeInUp} transition={{
              duration: 0.8
            }} className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary/50 to-transparent hidden md:block" />
              <motion.h2 variants={fadeInUp} transition={{
              duration: 0.8
            }} className="text-2xl md:text-3xl font-heading mb-8 flex items-center gap-4">
                <span className="text-primary">初衷</span>
                <span className="text-muted-foreground font-light">|</span>
                <span className="text-lg font-light text-muted-foreground">
                  每一份託付，都是重若千金的信任
                </span>
              </motion.h2>
              <motion.p variants={fadeInUp} transition={{
              duration: 0.8,
              delay: 0.2
            }} className="text-lg leading-loose text-muted-foreground">
                壕芯實業深耕生命禮儀與民俗科儀領域多年。我們深知，每一項服務的背後，都承載著一個家庭的深情託付及對生命的至高敬意。憑藉深厚的實務經驗與專業底蘊，壕芯在業界建立了卓越口碑，並深獲廣大客群的長期信賴。
              </motion.p>
            </motion.div>

            {/* Section 2 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{
            once: true,
            margin: "-100px"
          }} variants={staggerContainer} className="relative">
              <motion.div variants={fadeInUp} transition={{
              duration: 0.8
            }} className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary/50 to-transparent hidden md:block" />
              <motion.h2 variants={fadeInUp} transition={{
              duration: 0.8
            }} className="text-2xl md:text-3xl font-heading mb-8 flex items-center gap-4">
                <span className="text-primary">專業領航</span>
                <span className="text-muted-foreground font-light">|</span>
                <span className="text-lg font-light text-muted-foreground">
                  嚴謹守護每一處細節
                </span>
              </motion.h2>
              <motion.p variants={fadeInUp} transition={{
              duration: 0.8,
              delay: 0.2
            }} className="text-lg leading-loose text-muted-foreground">
                作為殯葬商品代銷與生基科儀的專家，我們始終秉持「以客為尊」的核心精神。無論是預先規劃的未雨綢繆，或是人生圓滿終點的臨終服務，壕芯皆以最高規格的品質控管，確保每一處細節皆能盡善盡美。我們堅持遵循正統、誠信踏實，致力於推廣優質的殯葬周邊商品與專業科儀，成為客戶在面對生命重要時刻時，最堅實且溫暖的後盾。
              </motion.p>
            </motion.div>

            {/* Section 3 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{
            once: true,
            margin: "-100px"
          }} variants={staggerContainer} className="relative">
              <motion.div variants={fadeInUp} transition={{
              duration: 0.8
            }} className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary/50 to-transparent hidden md:block" />
              <motion.h2 variants={fadeInUp} transition={{
              duration: 0.8
            }} className="text-2xl md:text-3xl font-heading mb-8 flex items-center gap-4">
                <span className="text-primary">卓越管理</span>
                <span className="text-muted-foreground font-light">|</span>
                <span className="text-lg font-light text-muted-foreground">
                  責任與尊重的核心價值
                </span>
              </motion.h2>
              <motion.p variants={fadeInUp} transition={{
              duration: 0.8,
              delay: 0.2
            }} className="text-lg leading-loose text-muted-foreground">
                我們對內實施嚴謹管理，高度重視員工素質與專業培訓；對外則嚴守「責任與尊重」的核心價值。壕芯實業對未來抱持著宏大的願景，我們不滿足於現狀，將持續優化服務流程，期望以品質與誠信成為業界首屈一指的領袖企業。
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{
          once: true,
          margin: "-100px"
        }} variants={staggerContainer} className="max-w-3xl mx-auto text-center">
            <motion.h2 variants={fadeInUp} transition={{
            duration: 0.8
          }} className="text-3xl md:text-4xl font-heading mb-6">
              讓我們為您服務
            </motion.h2>
            <motion.p variants={fadeInUp} transition={{
            duration: 0.8,
            delay: 0.1
          }} className="text-lg text-muted-foreground mb-10">
              無論您有任何需求或疑問，我們的專業團隊隨時為您提供最貼心的諮詢服務
            </motion.p>
            <motion.div variants={fadeInUp} transition={{
            duration: 0.8,
            delay: 0.2
          }} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/#services" className="px-8 py-4 bg-primary text-primary-foreground tracking-wider hover:bg-primary/90 transition-all duration-300">
                瀏覽服務項目
              </Link>
              <Link to="/#contact" className="px-8 py-4 border border-foreground text-foreground tracking-wider hover:bg-foreground hover:text-background transition-all duration-300">
                立即諮詢
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center md:items-start">
              <span className="text-lg font-heading font-semibold tracking-wider">
                壕芯實業
              </span>
              <span className="text-xs tracking-[0.2em] text-muted-foreground">
                HAO XIN ENTERPRISE
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} 壕芯實業. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>;
};
export default AboutUs;