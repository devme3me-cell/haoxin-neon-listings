import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-heading text-3xl md:text-4xl text-center mb-4 text-foreground">
            隱私權保護政策
          </h1>
          <p className="text-center text-muted-foreground mb-12">
            最後更新日期：2025年1月15日
          </p>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <p className="text-lg leading-relaxed">
              「壕芯實業」（以下簡稱「本公司」或「我們」）非常重視您的隱私權。為了確保您在瀏覽本網站（https://hshin.tw，以下簡稱「本網站」）時，能瞭解我們如何蒐集、處理及利用您的個人資料，特此制定本隱私權保護政策（以下簡稱「本政策」）。
            </p>
            <p className="leading-relaxed">
              請您詳閱以下內容，當您繼續使用本網站服務時，即視為您已充分瞭解並同意本政策之所有條款。
            </p>
            
            <section className="space-y-4">
              <h2 className="font-heading text-xl md:text-2xl text-foreground">一、個人資料的蒐集範圍與類別</h2>
              <p className="leading-relaxed">我們根據您在網站上的互動行為，可能蒐集以下類別之資料：</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-foreground">基本辨識資料：</strong>包括您的姓名、職稱、公司名稱、連絡電話、行動電話、電子郵件地址及郵寄地址。</li>
                <li><strong className="text-foreground">技術性數據：</strong>包括您的網際網路協定（IP）位址、瀏覽器類型、作業系統、進入本網站之時間、停留時間、瀏覽頁面及點擊連結記錄。</li>
                <li><strong className="text-foreground">通訊內容：</strong>您透過聯繫表單、電子郵件或社群媒體與我們聯繫時所提供的文字、意見或詢問內容。</li>
              </ul>
            </section>
            
            <section className="space-y-4">
              <h2 className="font-heading text-xl md:text-2xl text-foreground">二、個人資料蒐集之目的</h2>
              <p className="leading-relaxed">本公司蒐集個人資料之目的在於：</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-foreground">回覆您的諮詢：</strong>針對您的產品詢價、技術諮詢或合作提案進行回覆。</li>
                <li><strong className="text-foreground">客戶管理與維護：</strong>建立客戶檔案，以便提供後續的售後服務及品質追蹤。</li>
                <li><strong className="text-foreground">行銷資訊傳遞：</strong>經您同意後，向您發送本公司產品更新、優惠活動或相關產業資訊。</li>
                <li><strong className="text-foreground">網站優化分析：</strong>透過匿名數據分析，改善網站動線、功能設計及用戶體驗。</li>
                <li><strong className="text-foreground">履行法律義務：</strong>遵守相關法律規定或因應主管機關之要求。</li>
              </ul>
            </section>
            
            <section className="space-y-4">
              <h2 className="font-heading text-xl md:text-2xl text-foreground">三、資料利用之期間、地區、對象及方式</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-foreground">期間：</strong>您的個人資料將於本公司業務存續期間，或因個別業務所必須之保存期間內（如保固期、稅法規定期限）持續保存。</li>
                <li><strong className="text-foreground">地區：</strong>您的個人資料將使用於台灣地區，或因業務性質需要（如跨國物流、雲端服務）之必要相關地區。</li>
                <li><strong className="text-foreground">對象：</strong>除本公司外，我們僅會在必要時將資料提供給協力廠商（如雲端主機供應商、金流/物流業者、委外法律諮詢）。</li>
                <li><strong className="text-foreground">方式：</strong>透過自動化機器或非自動化方式進行蒐集、處理、利用。</li>
              </ul>
            </section>
            
            <section className="space-y-4">
              <h2 className="font-heading text-xl md:text-2xl text-foreground">四、資料安全與保護措施</h2>
              <p className="leading-relaxed">本公司採取適當的技術及組織措施來保護您的個人資料：</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-foreground">傳輸加密：</strong>本網站採用 SSL (Secure Sockets Layer) 加密傳輸技術，確保資料在傳遞過程中不被竊聽。</li>
                <li><strong className="text-foreground">存取限制：</strong>僅限經授權且因業務需要之員工方得接觸您的個人資料，且相關人員均簽有保密協議。</li>
                <li><strong className="text-foreground">設備安全：</strong>存放資料的伺服器設有防火牆與掃毒系統，並定期更新安全性修補程式。</li>
              </ul>
            </section>
            
            <section className="space-y-4">
              <h2 className="font-heading text-xl md:text-2xl text-foreground">五、您的法定權利</h2>
              <p className="leading-relaxed">依據《個人資料保護法》第 3 條規定，您可以針對您的個人資料行使以下權利：</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>查詢、請求閱覽或請求製給複製本。</li>
                <li>請求補充或更正。</li>
                <li>請求停止蒐集、處理或利用。</li>
                <li>請求刪除（被遺忘權）。</li>
              </ul>
              <p className="leading-relaxed">若欲行使上述權利，請透過本政策末尾之聯繫方式與我們聯絡，我們將於法定期限內處理。</p>
            </section>
            
            <section className="space-y-4">
              <h2 className="font-heading text-xl md:text-2xl text-foreground">六、Cookie 技術之使用</h2>
              <p className="leading-relaxed">為了提供最佳的服務體驗，本網站會在您的電腦中放置並取用 Cookie。</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-foreground">目的：</strong>用於紀錄您的偏好設定，並協助分析流量，了解用戶如何與網站互動。</li>
                <li><strong className="text-foreground">拒絕設定：</strong>您可以透過瀏覽器的「隱私權」設定拒絕 Cookie 的寫入，但這可能導致網站部分功能無法正常執行。</li>
              </ul>
            </section>
            
            <section className="space-y-4">
              <h2 className="font-heading text-xl md:text-2xl text-foreground">七、對外連結之規範</h2>
              <p className="leading-relaxed">
                本網站可能包含指向第三方網站（如供應商官網、社群媒體）的連結。這些第三方網站有其獨立的隱私權政策，本公司對其內容或行為不負任何法律責任，建議您在離開本網站前先行閱讀該網站之聲明。
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="font-heading text-xl md:text-2xl text-foreground">八、未成年人保護</h2>
              <p className="leading-relaxed">
                本網站主要針對專業法人與成年個人提供服務。我們不會在知情的情況下蒐集未成年人的個人資料。若您發現未成年人未經法定代理人同意而提供資料，請立即與我們聯繫，我們將採取刪除措施。
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="font-heading text-xl md:text-2xl text-foreground">九、隱私權政策之修訂</h2>
              <p className="leading-relaxed">
                本政策將隨法令變更或業務需求而不定期修訂。修訂後的條款將公告於本網站並生效，不另行個別通知。建議您定期瀏覽此頁面。
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="font-heading text-xl md:text-2xl text-foreground">十、聯繫管道</h2>
              <p className="leading-relaxed">若您對本隱私權政策有任何疑問、建議，或欲行使個人資料相關權利，請洽：</p>
              <div className="bg-muted/30 p-6 rounded-lg border border-border">
                <p className="mb-2"><strong className="text-foreground">公司名稱：</strong>壕芯實業</p>
                <p className="mb-2"><strong className="text-foreground">電子郵件：</strong>contact@haoxin.com.tw</p>
                <p><strong className="text-foreground">聯絡電話：</strong>02-XXXX-XXXX</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Contact />
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
