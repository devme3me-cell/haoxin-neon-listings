import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
const testimonials = [{
  title: "專業諮詢篇：解決複雜產權",
  quote: "原本手上的塔位因為年代久遠，加上家族產權分配變得非常複雜，自己跑了好幾趟相關單位都摸不著頭緒。後來聯繫了壕芯實業，顧問不僅專業，還非常有耐心地下分析法律條文與過戶流程，讓我瞬間釐清了所有問題。整個過程透明且合法，幫我解決了卡在心中多年的大石頭，真的非常專業！"
}, {
  title: "效率導向篇：驚人的媒合速度",
  quote: "家裡有多餘的殯葬資產閒置多年，試過很多平台都石沉大海，甚至還遇到不少奇怪的仲介。沒想到聯繫壕芯實業後，他們的效率完全超出預期，短短不到兩週的時間，就憑藉強大的資源庫精準媒合到適合的買家。從諮詢到成交流程非常迅速，這辦事效率真的沒話說，值得大力推薦！"
}, {
  title: "安心信賴篇：杜絕詐騙疑慮",
  quote: "這行業的水其實很深，網路上各種詐騙案例讓人很害怕。當初選擇壕芯實業是因為看到他們有實體門市，且流程制度化。實際接觸後，發現他們對每一份產權文件都審核得極為嚴謹，成交過程都在合法的見證下進行。這種踏實感對我們消費者來說最重要，找壕芯真的讓人非常放心。"
}, {
  title: "資產活化篇：讓閒置資源變現",
  quote: "一直以來手邊幾處塔位都被視為『負資產』，想處理卻不知從何下手。感謝壕芯實業提供的資產活化建議，不僅幫我評估了市場價值，還提供了合法的節稅規劃。媒合成功的速度比我想像中快很多，讓這筆資金能重新投入到其他更有效益的地方。這不僅是媒合，更是專業的理財諮詢！"
}, {
  title: "溫暖服務篇：對長輩的貼心關懷",
  quote: "這次是幫家中長輩處理早年買下的位子，家父年紀大、溝通過程比較緩慢，但壕芯實業的服務人員完全沒有不耐煩。他們用最直白的方式解釋複雜的合約，確保我們完全理解後才進行下一步。這種不強迫推銷、真心為客戶著想的態度，在現在的社會中真的很難得，真心感謝他們的幫忙。"
}, {
  title: "極簡推薦篇：效率與專業的代名詞",
  quote: "如果您正在尋找合法、透明且高效率的殯葬資源媒合管道，我會毫不猶豫推薦壕芯實業。他們擁有非常強大的買賣雙方資料庫，能在最短的時間內完成精準對接。我個人的經驗是流程流暢、收費公道，且顧問團隊具備極高專業素養，是目前市場上最值得信賴的團隊，五星好評實至名歸！"
}, {
  title: "家庭和諧篇：專業處理繼承與分配",
  quote: "處理家中的殯葬資產繼承問題最怕造成家族紛爭，還好有壕芯實業介入協助。他們從第三方專業的角度，提供了公平且合法的資產分配與節稅方案，讓所有家人都能心服口服。這不僅僅是完成一場媒合，更是幫我們圓滿了解決了一個家庭難題，這份專業與同理心真的讓人很感動。"
}, {
  title: "精準媒合篇：客製化的對接服務",
  quote: "壕芯實業與一般的仲介不同，他們會先深入了解買賣雙方的真實需求。在這次合作中，我發現他們推薦的對象都非常契合，不會為了成交而亂牽線。成交速度之快，顯示了他們在後台數據與通路上的深厚實力。專業度滿分，推薦給所有對品質與效率有高度要求的客戶。"
}, {
  title: "網路口碑篇：從線上到線下的完美體驗",
  quote: "在網路上搜尋『塔位轉讓』時看到壕芯實業的官網，資訊非常透明、案例也很豐富。原本還抱持著觀望心態，但與顧問通完電話後就決定交給他們處理。從線上的初步諮詢到線下的面談簽約，每一環節都展現了高度的標準化與專業。果然如網友好評所言，是一家誠實且高效的好公司。"
}, {
  title: "全方位滿意篇：一站式的專業服務",
  quote: "從最初的資產估價、法律諮詢、到最後的買賣成交，壕芯實業提供的是真正的一站式服務。你不需要自己去奔波找代書或查法規，他們通通幫你處理妥當。這次的合作體驗非常愉快，服務人員積極回報進度，讓我在家就能掌握最新狀況。有這類需求的朋友，找壕芯實業絕對是正確的決定！"
}];
const Testimonials = () => {
  return <section className="py-24 lg:py-32 bg-secondary/30">
      <div className="container px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="section-title">TESTIMONIALS</p>
          <h2 className="section-heading">客 戶 感 言</h2>
        </div>

        <div className="px-12">
          <Carousel opts={{
          align: "start",
          loop: true
        }} className="w-full">
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-background/80 backdrop-blur-sm p-6 lg:p-8 relative border border-border/50 hover:border-warm-gold/30 transition-colors duration-300 h-full rounded-xl">
                    {/* Quote Mark */}
                    <div className="text-5xl font-heading text-warm-gold/30 absolute top-3 left-5">
                      "
                    </div>
                    
                    {/* Title */}
                    <div className="pt-6 mb-4">
                      <h3 className="text-warm-gold font-heading text-base font-medium">
                        【{testimonial.title}】
                      </h3>
                    </div>
                    
                    <blockquote className="text-sm leading-relaxed text-muted-foreground">
                      {testimonial.quote}
                    </blockquote>
                  </div>
                </CarouselItem>)}
            </CarouselContent>
            <CarouselPrevious className="border-warm-gold/50 text-warm-gold hover:bg-warm-gold hover:text-background" />
            <CarouselNext className="border-warm-gold/50 text-warm-gold hover:bg-warm-gold hover:text-background" />
          </Carousel>
        </div>
      </div>
    </section>;
};
export default Testimonials;