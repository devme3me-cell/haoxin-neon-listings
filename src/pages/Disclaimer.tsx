import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-heading text-3xl md:text-4xl text-center mb-12 text-foreground">
            免責聲明
          </h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <p className="text-lg leading-relaxed">
              歡迎瀏覽「壕芯實業」官方網站（網址：https://hshin.tw，以下簡稱「本網站」）。當您開始使用本網站時，即表示您已閱讀、瞭解並同意接受本免責聲明之所有內容：
            </p>
            
            <section className="space-y-4">
              <h2 className="font-heading text-xl md:text-2xl text-foreground">資訊僅供參考</h2>
              <p className="leading-relaxed">
                本網站所載之所有資訊（包括但不限於文字、圖表、產品規格及說明）僅供參考之用。本公司雖力求資訊之正確與即時，但不保證所有資料均為最新且無誤。對於因信任或使用本網站資訊所導致之直接或間接損失，本公司不負賠償責任。
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="font-heading text-xl md:text-2xl text-foreground">外部連結之風險</h2>
              <p className="leading-relaxed">
                為便於使用者獲取相關資訊，本網站可能包含通往第三方網站的連結。本公司對該等外部網站的內容、隱私權政策或安全性不具控制權，亦不對該等網站所提供的內容負任何法律責任。
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="font-heading text-xl md:text-2xl text-foreground">服務中斷與維護</h2>
              <p className="leading-relaxed">
                本公司有權於不另行通知的情況下，對本網站進行維修、更新、調整或終止部分服務。對於因電信服務供應商故障、系統維護、駭客攻擊或不可抗力事件所導致的服務延遲或中斷，本公司不承擔賠償責任。
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="font-heading text-xl md:text-2xl text-foreground">智慧財產權保護</h2>
              <p className="leading-relaxed">
                本網站內之商標、圖片、文章及程式碼均受版權法保護，其權利歸屬「壕芯實業」或其授權人所有。未經本公司書面許可，禁止任何形式的複製、修改、散布或商業性使用。
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Contact />
      <Footer />
    </div>
  );
};

export default Disclaimer;
