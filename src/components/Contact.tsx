import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useMemo } from "react";

const transactionData = [
  { location: '台北市', name: '李先生', action: 'sell', product: '生前契約', mask: '' },
  { location: '高雄市', name: '王太太', action: 'buy', product: '', mask: '*****' },
  { location: '台中市', name: '陳小姐', action: 'sell', product: '靈骨塔位', mask: '' },
  { location: '新北市', name: '林先生', action: 'buy', product: '生前契約', mask: '' },
  { location: '桃園市', name: '黃太太', action: 'sell', product: '', mask: '****' },
  { location: '台南市', name: '張先生', action: 'buy', product: '家族塔位', mask: '' },
  { location: '新竹市', name: '劉小姐', action: 'sell', product: '生前契約', mask: '' },
  { location: '彰化縣', name: '吳先生', action: 'buy', product: '', mask: '******' },
  { location: '嘉義市', name: '蔡太太', action: 'sell', product: '雙人塔位', mask: '' },
  { location: '屏東縣', name: '許先生', action: 'buy', product: '生前契約', mask: '' },
  { location: '宜蘭縣', name: '鄭小姐', action: 'sell', product: '', mask: '***' },
  { location: '花蓮縣', name: '謝先生', action: 'buy', product: '靈骨塔位', mask: '' },
];

const getRandomDate = () => {
  const today = new Date();
  const offsetDays = Math.floor(Math.random() * 7) - 3; // -3 to +3 days
  const randomDate = new Date(today);
  randomDate.setDate(today.getDate() + offsetDays);
  const month = (randomDate.getMonth() + 1).toString().padStart(2, '0');
  const day = randomDate.getDate().toString().padStart(2, '0');
  return `${month}/${day}`;
};

interface TransactionCardProps {
  location: string;
  name: string;
  action: 'sell' | 'buy';
  product: string;
  mask: string;
  time: string;
}

const TransactionCard = ({ location, name, action, product, mask, time }: TransactionCardProps) => {
  const actionText = action === 'sell' ? '出售' : '收購';
  const productDisplay = product || mask;

  return (
    <div className="w-full p-4 md:p-6 bg-white/[0.03] backdrop-blur-[20px] border border-white/[0.08] rounded-2xl transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] cursor-default pointer-events-none relative overflow-hidden hover:translate-x-2 hover:scale-[1.02] hover:bg-white/[0.08] hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_40px_rgba(99,102,241,0.1)] group [pointer-events:auto]">
      <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-[left] duration-[600ms] ease-linear group-hover:left-full" />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
        <div className="flex items-center gap-2 md:gap-3 flex-wrap">
          <span className={`inline-block w-2 h-2 rounded-full animate-[pulse_2s_ease-in-out_infinite] ${action === 'sell' ? 'bg-amber-500 shadow-[0_0_10px_#f59e0b]' : 'bg-emerald-500 shadow-[0_0_10px_#10b981]'}`} />
          <span className="text-xs md:text-sm text-white/50 font-medium tracking-[0.5px]">{location}</span>
          <span className="text-sm md:text-base text-white/90 font-semibold">{name}</span>
        </div>
        <span className={`px-2.5 md:px-3.5 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-semibold tracking-[1px] uppercase ${action === 'sell' ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-[#1a1a2e] shadow-[0_4px_15px_rgba(245,158,11,0.3)]' : 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-[#1a1a2e] shadow-[0_4px_15px_rgba(16,185,129,0.3)]'}`}>
          {actionText}
        </span>
      </div>
      <div className="flex items-center gap-2.5">
        <span className={mask ? 'text-xs md:text-sm text-white/30 tracking-[2px]' : 'text-base md:text-lg text-white/95 font-bold tracking-[1px]'}>
          {productDisplay}
        </span>
      </div>
      <span className="absolute bottom-2 md:bottom-3 right-3 md:right-4 text-[10px] md:text-[11px] text-white/25">{time}</span>
    </div>
  );
};

const Contact = () => {
  const cardsWithTime = useMemo(() => {
    return [...transactionData, ...transactionData].map((data, index) => ({
      ...data,
      time: getRandomDate(),
      key: index,
    }));
  }, []);

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[hsl(30,15%,8%)] text-white">
      <div className="container px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Content */}
          <div>
            <p className="text-sm tracking-[0.3em] opacity-70 mb-4">CONTACT US</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light tracking-wide mb-8">
              聯 絡 我 們
            </h2>
            <p className="text-lg opacity-80 leading-relaxed mb-12">
              無論何時，我們都在您身邊。若有任何需求或疑問，請隨時與我們聯繫，專業團隊將為您提供最即時的協助。
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 mt-1 opacity-70" />
                <div>
                  <p className="text-sm opacity-70 mb-1">聯絡專線</p>
                  <p className="text-xl font-heading">02-22425697</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 mt-1 opacity-70" />
                <div>
                  <p className="text-sm opacity-70 mb-1">電子郵件</p>
                  <p className="text-lg">sam0292@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 mt-1 opacity-70" />
                <div>
                  <p className="text-sm opacity-70 mb-1">服務據點</p>
                  <p className="text-lg">台灣各地均有服務</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 mt-1 opacity-70" />
                <div>
                  <p className="text-sm opacity-70 mb-1">服務時間</p>
                  <p className="text-lg">週一至週日 09:00-18:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel */}
          <div className="relative w-full max-w-[460px] mx-auto h-[500px] perspective-[1000px] py-5">
            <h2 className="text-center mb-8 text-white/90 text-xl md:text-2xl font-light tracking-[4px] uppercase">
              即時交易動態
            </h2>
            <div 
              className="relative w-full h-full overflow-hidden"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
              }}
            >
              <div 
                className="absolute w-full flex flex-col gap-5 px-4 md:px-[30px] py-[10px] animate-carousel-scroll hover:[animation-play-state:paused]"
              >
                {cardsWithTime.map((data) => (
                  <TransactionCard
                    key={data.key}
                    location={data.location}
                    name={data.name}
                    action={data.action as 'sell' | 'buy'}
                    product={data.product}
                    mask={data.mask}
                    time={data.time}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;