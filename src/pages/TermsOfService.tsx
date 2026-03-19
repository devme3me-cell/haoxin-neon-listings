import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-heading text-3xl md:text-4xl text-center mb-4 text-foreground">
            服務條款
          </h1>
          <p className="text-center text-muted-foreground mb-12">
            Terms of Service
          </p>
          
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-muted-foreground">
            <section className="space-y-4">
              <h2 className="font-heading text-xl md:text-2xl text-foreground">一、條款之接受與修改</h2>
              <p className="leading-relaxed">
                歡迎使用「壕芯實業」（以下簡稱「本公司」）官方網站（https://hshin.tw，以下簡稱「本網站」）。當您瀏覽或使用本網站之服務時，即視為您已閱讀、瞭解並同意接受本服務條款。本公司有權隨時修改條款，修訂後內容公告於網站即生效，建議您定期查看。
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-xl md:text-2xl text-foreground">二、服務範圍與限制</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>本網站提供產品資訊展示、規格查詢及業務聯繫服務。</li>
                <li>網站上所顯示之產品圖片、技術參數僅供參考，實際產品規格以正式報價單或買賣契約為準。</li>
                <li>本公司保留隨時變更服務內容、暫停或終止網站運作之權利。</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-xl md:text-2xl text-foreground">三、使用者行為規範</h2>
              <p className="leading-relaxed">使用本網站時，您同意遵守以下規範：</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-foreground">禁止違法行為：</strong>不得利用本網站進行任何侵害他人權益或違法之行為。</li>
                <li><strong className="text-foreground">禁止干擾系統：</strong>不得意圖入侵伺服器、傳播病毒、大量抓取（Scraping）數據或破壞網站完整性。</li>
                <li><strong className="text-foreground">資訊真實性：</strong>若您透過聯繫表單提供資訊，應保證資料之真實性與準確性。</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-xl md:text-2xl text-foreground">四、智慧財產權宣告</h2>
              <p className="leading-relaxed">
                本網站所使用之軟體、程式、網站架構、介面設計、文字、圖片、標誌（Logo）及公司名稱，其著作權、商標權及專利權均屬「壕芯實業」或其權利人所有。未經事前書面授權，任何人不得逕自使用、修改、重製、公開傳輸、改作、散布或進行還原工程。
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-xl md:text-2xl text-foreground">五、責任限制</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>本公司不保證服務之及時性、安全性或不受干擾。</li>
                <li>對於因電腦病毒、系統故障、電信連線中斷或其他不可歸責於本公司之事由所導致之損失，本公司不負賠償責任。</li>
                <li>在法律允許的最大範圍內，本公司對任何間接、附隨或懲罰性損害（包括利潤損失）均不承擔責任。</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-xl md:text-2xl text-foreground">六、準據法與管轄法院</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>本服務條款之解釋與適用，均以中華民國法律為準據法。</li>
                <li>因使用本網站服務而生之爭議，雙方同意以台灣台北地方法院為第一審管轄法院。</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      
      <Contact />
      <Footer />
    </div>
  );
};

export default TermsOfService;
