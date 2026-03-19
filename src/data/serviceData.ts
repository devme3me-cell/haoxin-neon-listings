import serviceKeyi from "@/assets/service-keyi.webp";
import serviceKaiyun from "@/assets/service-kaiyun.webp";
import serviceShengjiGuan from "@/assets/service-shengji-guan.webp";
import servicePaiwei from "@/assets/service-paiwei-new.webp";
import serviceShengji from "@/assets/service-shengji.webp";
import serviceTawei from "@/assets/service-tawei.webp";
import serviceGuhuitan from "@/assets/service-guhuitan.webp";
import serviceNeidan from "@/assets/service-neidan.webp";
import serviceContract from "@/assets/service-contract.webp";

export interface ServiceItem {
  id: string;
  name: string;
  image: string;
  subtitle: string;
  description: string;
  features: string[];
  process: { step: number; title: string; description: string }[];
}

export const serviceItems: ServiceItem[] = [
  {
    id: "keyi",
    name: "代銷科儀",
    image: serviceKeyi,
    subtitle: "專業法事科儀服務",
    description:
      "提供各式傳統法事科儀代銷服務，由專業團隊協助處理，讓您省心省力。我們與各大知名道場合作，確保科儀進行順利圓滿，為您的心靈帶來平靜與安慰。",
    features: [
      "專業道場合作",
      "多元科儀選擇",
      "價格透明公道",
      "全程專人服務",
    ],
    process: [
      { step: 1, title: "諮詢了解", description: "專人解說各式科儀內容與意義" },
      { step: 2, title: "選擇方案", description: "依據需求選擇適合的科儀服務" },
      { step: 3, title: "安排時間", description: "與道場協調最佳進行時間" },
      { step: 4, title: "圓滿完成", description: "專業執行，確保儀式圓滿" },
    ],
  },
  {
    id: "kaiyun",
    name: "開運商品",
    image: serviceKaiyun,
    subtitle: "招財開運精選商品",
    description:
      "精選各式開運招財商品，包含水晶、貔貅、聚寶盆等，經由專業老師開光加持，為您帶來好運與正能量。每件商品皆經過嚴格篩選，品質保證。",
    features: [
      "專業開光加持",
      "品質嚴格把關",
      "多元商品選擇",
      "專業諮詢建議",
    ],
    process: [
      { step: 1, title: "了解需求", description: "分析您的命理與開運需求" },
      { step: 2, title: "推薦商品", description: "依據需求推薦適合的開運物" },
      { step: 3, title: "開光加持", description: "專業老師進行開光儀式" },
      { step: 4, title: "擺放指導", description: "教導正確擺放方式與禁忌" },
    ],
  },
  {
    id: "shengji-guan",
    name: "代銷生基罐",
    image: serviceShengjiGuan,
    subtitle: "生基罐代銷服務",
    description:
      "提供優質生基罐代銷服務，精選上等材質製作，耐久美觀。生基罐是安置生基的重要容器，我們提供多種款式選擇，滿足不同需求。",
    features: [
      "優質材質精選",
      "多種款式選擇",
      "耐久品質保證",
      "專業諮詢服務",
    ],
    process: [
      { step: 1, title: "材質說明", description: "介紹各式材質特性與優缺點" },
      { step: 2, title: "款式選擇", description: "依據預算與喜好選擇款式" },
      { step: 3, title: "品質確認", description: "確認商品品質符合標準" },
      { step: 4, title: "配送安裝", description: "專人配送並協助安裝" },
    ],
  },
  {
    id: "paiwei",
    name: "代銷牌位",
    image: servicePaiwei,
    subtitle: "祖先牌位代銷服務",
    description:
      "提供各式祖先牌位代銷服務，材質優良、雕工精細。牌位是祭祀祖先的重要物品，我們提供專業諮詢，協助您選擇最適合的牌位。",
    features: [
      "材質優良耐久",
      "雕工精細美觀",
      "多種尺寸規格",
      "客製化服務",
    ],
    process: [
      { step: 1, title: "需求評估", description: "了解祭祀空間與需求" },
      { step: 2, title: "款式推薦", description: "推薦適合的牌位款式" },
      { step: 3, title: "製作訂購", description: "確認後進行製作或訂購" },
      { step: 4, title: "安座儀式", description: "協助安排牌位安座儀式" },
    ],
  },
  {
    id: "shengji",
    name: "代銷生基",
    image: serviceShengji,
    subtitle: "生基風水服務",
    description:
      "專業生基代銷服務，結合風水學理，為您尋找最佳生基位置。生基能夠改運補運，我們提供完整的服務流程，從選址到安置一條龍服務。",
    features: [
      "專業風水選址",
      "完整服務流程",
      "改運補運效果",
      "長期維護服務",
    ],
    process: [
      { step: 1, title: "命理分析", description: "分析個人命理與需求" },
      { step: 2, title: "風水選址", description: "專業老師進行風水勘察" },
      { step: 3, title: "生基安置", description: "選定吉日進行安置儀式" },
      { step: 4, title: "後續維護", description: "定期關懷與維護服務" },
    ],
  },
  {
    id: "tawei",
    name: "代銷塔位",
    image: serviceTawei,
    subtitle: "塔位代銷專業服務",
    description:
      "提供全台各大知名納骨塔塔位代銷服務，價格透明、選擇多元。我們與多家優質納骨塔合作，協助您選擇最適合的安息之所。",
    features: [
      "全台納骨塔合作",
      "價格透明公道",
      "多元位置選擇",
      "專業諮詢陪同",
    ],
    process: [
      { step: 1, title: "需求了解", description: "了解預算與位置偏好" },
      { step: 2, title: "塔位推薦", description: "推薦符合需求的塔位" },
      { step: 3, title: "實地參觀", description: "陪同實地參觀確認" },
      { step: 4, title: "手續辦理", description: "協助完成購買手續" },
    ],
  },
  {
    id: "guhuitan",
    name: "代銷骨灰罈",
    image: serviceGuhuitan,
    subtitle: "骨灰罈代銷服務",
    description:
      "提供各式精美骨灰罈代銷服務，材質包含玉石、陶瓷、琉璃等，款式多元、品質優良。每一只骨灰罈都是對逝者的尊重與懷念。",
    features: [
      "多元材質選擇",
      "精美工藝設計",
      "品質嚴格把關",
      "價格合理透明",
    ],
    process: [
      { step: 1, title: "材質介紹", description: "介紹各式材質特性與價格" },
      { step: 2, title: "款式挑選", description: "依據喜好選擇適合款式" },
      { step: 3, title: "品質確認", description: "確認商品品質與完整性" },
      { step: 4, title: "配送服務", description: "安全包裝並配送到府" },
    ],
  },
  {
    id: "neidan",
    name: "代銷内膽",
    image: serviceNeidan,
    subtitle: "骨灰罈内膽代銷",
    description:
      "提供骨灰罈專用内膽代銷服務，採用優質材料製作，防潮防塵，保護先人骨灰。内膽是骨灰罈的重要配件，我們提供多種規格選擇。",
    features: [
      "優質材料製作",
      "防潮防塵設計",
      "多種規格尺寸",
      "品質保證服務",
    ],
    process: [
      { step: 1, title: "規格確認", description: "確認骨灰罈尺寸與規格" },
      { step: 2, title: "材質選擇", description: "選擇適合的内膽材質" },
      { step: 3, title: "品質檢驗", description: "嚴格檢驗確保品質" },
      { step: 4, title: "配送到府", description: "安全包裝配送服務" },
    ],
  },
  {
    id: "contract",
    name: "代銷生前契約",
    image: serviceContract,
    subtitle: "生前契約規劃服務",
    description:
      "提供專業生前契約代銷服務，讓您提前規劃身後事，減輕家人負擔。我們與多家優質殯葬業者合作，提供完善的生前契約方案。",
    features: [
      "多家業者合作",
      "方案內容透明",
      "分期付款選擇",
      "專業諮詢服務",
    ],
    process: [
      { step: 1, title: "方案說明", description: "詳細說明各家方案內容" },
      { step: 2, title: "需求評估", description: "依據需求推薦適合方案" },
      { step: 3, title: "合約簽訂", description: "確認內容後簽訂合約" },
      { step: 4, title: "後續服務", description: "提供長期諮詢與服務" },
    ],
  },
];

export const getServiceById = (id: string): ServiceItem | undefined => {
  return serviceItems.find((item) => item.id === id);
};
