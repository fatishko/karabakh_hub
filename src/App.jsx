import React, { useState } from 'react';
import { 
  MapPin, Users, Home, Compass, MessageCircle, Star, 
  X, ShoppingBag, Bell, Plus, ChefHat, Calendar, 
  PlayCircle, BookOpen, MonitorPlay, LogOut, Globe,
  Info, AlertTriangle, CheckCircle, Wifi, Sun, Leaf
} from 'lucide-react';

// ============================================
// 1. DATA & CONFIGURATION
// ============================================

const CURRENCIES = {
  AZN: { symbol: '₼', rate: 1 },
  USD: { symbol: '$', rate: 0.59 },
  EUR: { symbol: '€', rate: 0.55 }
};

const translations = {
  AZ: { 
    home: "Ana Səhifə", map: "Xəritə", community: "İcma Paneli", market: "Bazar", 
    experiences: "Təcrübələr", education: "Təlim", guide: "Bələdçi", logout: "Çıxış",
    role_local: "Yerli Sakin", role_guest: "Qonaq",
    start_title: "Xoş Gəlmisiniz",
    start_sub: "Statusunuzu seçin",
    tech_title: "Ağıllı Texnologiyalarımız"
  },
  EN: { 
    home: "Home", map: "Map", community: "Community", market: "Market", 
    experiences: "Experiences", education: "Education", guide: "Guide", logout: "Exit",
    role_local: "Resident", role_guest: "Guest",
    start_title: "Welcome",
    start_sub: "Select your status",
    tech_title: "Our Technologies"
  }
};

// UPDATED: Education now includes "Rules" and "How to live"
const eduResources = [
  { id: 1, title: "Ağıllı Kənd Qaydaları: Nələr Qadağandır?", type: "Video", duration: "8 dəq", img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800" },
  { id: 2, title: "Tullantıların İdarə Olunması", type: "Təlimat", duration: "Oxumaq: 5 dəq", img: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800" },
  { id: 3, title: "Turistlərlə Ünsiyyət Qaydaları", type: "Video", duration: "12 dəq", img: "https://images.squarespace-cdn.com/content/v1/5f2bf24111434d59817e6fc4/9909dc8a-5a52-4b2c-986f-15ac77542a01/TourismCares-5335.jpg?w=800" }
];

const guestRules = [
  { id: 1, title: "No Plastic Zone", desc: "Our village is 100% plastic-free. Please use provided glass or paper containers.", type: "danger" },
  { id: 2, title: "Drone Policy", desc: "Drones are allowed only in designated zones to protect privacy.", type: "warning" },
  { id: 3, title: "Respect Privacy", desc: "Please ask for permission before photographing private homes.", type: "info" }
];

const villageTech = [
  { icon: <Sun size={32} className="text-yellow-500"/>, title: "Green Energy", desc: "100% Solar Powered" },
  { icon: <Wifi size={32} className="text-blue-500"/>, title: "Smart Grid", desc: "High-speed IoT Network" },
  { icon: <Leaf size={32} className="text-green-500"/>, title: "Eco Farming", desc: "AI-Driven Agriculture" }
];

const localExperiences = [
  { id: 1, title: "Qarabağ Mətbəxi: Kətə Bişirmək", host: "Shafiga Asadova", price: 20, rating: 4.9, img: "https://www.azernews.az/media/pictures/qutab.jpg?w=800" },
  { id: 2, title: "Xalça Toxuma Dərsi", host: "Azərxalça", price: 35, rating: 5.0, img: "https://modern.az/file/articles/2014/04/17/113482.jpg?w=800" },
  { id: 3, title: "Dağlarda Çay Süfrəsi", host: "Ali Mursalov", price: 15, rating: 4.8, img: "https://azertag.az/files/2018/3/1200x630/15453270785543150449_1200x630.jpg?w=800" }
];

const marketItems = [
  { id: 1, name: "Təbii Bal", price: 45, seller: "Kəlbəcər Arıçıları", img: "https://www.acibadem.com.tr/hayat/Images/YayinMakaleler/balin-faydalari-nelerdir-bal-neye-iyi-gelir_606077_1.jpeg?w=800" },
  { id: 2, name: "Quru Otlar (Kəklikotu)", price: 5, seller: "Şuşa Yaylağı", img: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Thymian_%28Thymus_vulgaris%29%2C_Nationalpark_Hohe_Tauern.jpg?w=800" }
];

const announcements = [
  { id: 1, title: "Suvarma Qrafiki", desc: "Sabah saat 10:00-da suvarma sistemi aktiv olacaq.", type: "Info" },
  { id: 2, title: "İcma İclası", desc: "Cümə günü kənd mərkəzində yığıncaq.", type: "Event" }
];

// ============================================
// 2. MAIN APP COMPONENT
// ============================================

export default function App() {
  const [userRole, setUserRole] = useState(null);
  const [lang, setLang] = useState('AZ');
  const [currency, setCurrency] = useState('AZN');
  const [activeTab, setActiveTab] = useState('home');
  
  const t = translations[lang];

  const handleLogout = () => {
    setUserRole(null);
    setActiveTab('home');
  };

  const getPrice = (priceInAZN) => {
    const rate = CURRENCIES[currency].rate;
    const symbol = CURRENCIES[currency].symbol;
    return `${(priceInAZN * rate).toFixed(1)} ${symbol}`;
  };

  // --- NAVBAR ---
  const Navbar = () => (
    <nav className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-100 px-4 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
        <div className="bg-green-100 p-2 rounded-lg"><MapPin className="text-green-600" size={24} /></div>
        <div>
           <h1 className="text-xl font-black uppercase tracking-tighter italic leading-none text-gray-800">Qarabağ Hub</h1>
           <span className="text-[10px] uppercase font-bold text-green-600 tracking-widest">{userRole === 'local' ? t.role_local : t.role_guest}</span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2 bg-gray-50 p-1 rounded-xl">
        <NavBtn label={t.home} active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
        
        {/* LOCAL MENU */}
        {userRole === 'local' && (
          <>
            <NavBtn label={t.community} active={activeTab === 'community'} onClick={() => setActiveTab('community')} icon={<MessageCircle size={14}/>} />
            <NavBtn label={t.education} active={activeTab === 'education'} onClick={() => setActiveTab('education')} icon={<BookOpen size={14}/>} />
            <NavBtn label={t.market} active={activeTab === 'market'} onClick={() => setActiveTab('market')} />
          </>
        )}
        
        {/* GUEST MENU */}
        {userRole === 'guest' && (
          <>
            <NavBtn label={t.guide} active={activeTab === 'guide'} onClick={() => setActiveTab('guide')} icon={<Info size={14}/>} />
            <NavBtn label={t.experiences} active={activeTab === 'experiences'} onClick={() => setActiveTab('experiences')} />
            <NavBtn label={t.market} active={activeTab === 'market'} onClick={() => setActiveTab('market')} />
          </>
        )}

        <NavBtn label={t.map} active={activeTab === 'map'} onClick={() => setActiveTab('map')} />
      </div>

      <div className="flex items-center gap-2">
         <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="bg-gray-100 text-xs font-bold px-2 py-2 rounded-lg outline-none cursor-pointer">
           <option value="AZN">₼ AZN</option>
           <option value="USD">$ USD</option>
           <option value="EUR">€ EUR</option>
         </select>
         <button onClick={() => setLang(lang === 'AZ' ? 'EN' : 'AZ')} className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-900 text-white text-xs font-bold hover:bg-gray-700 transition-colors">{lang}</button>
         <button onClick={handleLogout} className="text-red-400 hover:bg-red-50 p-2 rounded-lg transition-colors ml-2"><LogOut size={20} /></button>
      </div>
    </nav>
  );

  const NavBtn = ({ label, active, onClick, icon }) => (
    <button onClick={onClick} className={`flex items-center gap-2 text-xs font-bold uppercase transition-all px-4 py-2 rounded-lg ${active ? 'bg-white text-green-700 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
      {icon} {label}
    </button>
  );

  // --- COMPONENT: TECH SHOWCASE (LANDING PAGE) ---
  const TechShowcase = () => (
    <div className="bg-white/10 backdrop-blur-md border-t border-white/20 p-8 mt-8 animate-in slide-in-from-bottom-10">
      <h3 className="text-white font-black uppercase text-center mb-8 tracking-widest">{t.tech_title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {villageTech.map((tech, idx) => (
          <div key={idx} className="bg-black/40 p-6 rounded-2xl border border-white/10 flex flex-col items-center text-center hover:bg-black/60 transition-colors">
            <div className="bg-white/10 p-4 rounded-full mb-4">{tech.icon}</div>
            <h4 className="text-white font-bold uppercase mb-1">{tech.title}</h4>
            <p className="text-gray-400 text-xs">{tech.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // --- NEW LANDING PAGE ---
  if (!userRole) {
    return (
      <div className="min-h-screen w-full relative font-sans bg-gray-900 overflow-y-auto">
        {/* Background */}
        <div className="fixed inset-0 z-0">
          <img src="https://global.unitednations.entermediadb.net/assets/mediadb/services/module/asset/downloads/preset/Collections/Embargoed/27-09-2023-Wiki-Nagorno-Karabakh.jpg/image1170x530cropped.jpg?w=1600&q=80" alt="Karabakh" className="w-full h-full object-cover opacity-60"/>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <div className="flex-1 flex flex-col justify-center px-8 md:px-24 py-12 max-w-7xl mx-auto w-full">
            <div className="absolute top-8 right-8 flex gap-4">
               <button onClick={() => setLang('AZ')} className={`text-white font-bold text-sm ${lang === 'AZ' ? 'underline' : 'opacity-50'}`}>AZ</button>
               <button onClick={() => setLang('EN')} className={`text-white font-bold text-sm ${lang === 'EN' ? 'underline' : 'opacity-50'}`}>EN</button>
            </div>

            <div className="animate-in slide-in-from-left duration-700">
              <div className="flex items-center gap-3 mb-6 text-green-400">
                <MapPin size={32} />
                <span className="text-lg font-black tracking-widest uppercase">Yashil Garabag</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-4 leading-none">{t.start_title}</h1>
              <p className="text-gray-300 text-xl md:text-2xl font-light uppercase tracking-widest mb-12 border-l-4 border-green-500 pl-4">{t.start_sub}</p>

              <div className="flex flex-col md:flex-row gap-6 mb-12">
                <button onClick={() => { setUserRole('local'); setActiveTab('home'); }} className="group bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-[30px] w-full md:w-80 text-left hover:bg-white hover:border-white transition-all">
                  <div className="bg-green-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Home className="text-white" size={24} /></div>
                  <h3 className="text-2xl font-black text-white uppercase mb-1 group-hover:text-green-900">{t.role_local}</h3>
                </button>
                <button onClick={() => { setUserRole('guest'); setActiveTab('home'); }} className="group bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-[30px] w-full md:w-80 text-left hover:bg-white hover:border-white transition-all">
                  <div className="bg-orange-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Globe className="text-white" size={24} /></div>
                  <h3 className="text-2xl font-black text-white uppercase mb-1 group-hover:text-orange-900">{t.role_guest}</h3>
                </button>
              </div>
            </div>
          </div>
          
          {/* Tech Showcase at Bottom of Landing */}
          <TechShowcase />
        </div>
      </div>
    );
  }

  // --- SUB-PAGES ---

  const Hero = () => (
    <div className="relative h-[40vh] w-full bg-gray-900 overflow-hidden rounded-[40px] shadow-xl mb-8 mx-auto mt-4 max-w-[95%]">
      <img src="https://asgroup.az/storage/778/conversions/AT4U4924-lg.jpg?w=1600&q=80" className="absolute inset-0 w-full h-full object-cover opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
      <div className="relative h-full flex flex-col items-center justify-center text-center text-white p-6">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-2 drop-shadow-lg">
          {userRole === 'local' ? 'Smart Village' : 'Explore Karabakh'}
        </h1>
      </div>
    </div>
  );

  // NEW: GUEST GUIDE (Rules & How-To)
  const GuestGuide = () => (
    <div className="px-6 py-8 pb-24 max-w-4xl mx-auto animate-in slide-in-from-bottom-10">
      <h2 className="text-3xl font-black uppercase text-gray-800 mb-6 flex items-center gap-2"><Info /> Visitor Guide</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-bold text-xl text-gray-700">Rules & Regulations</h3>
          {guestRules.map((rule) => (
             <div key={rule.id} className={`p-4 rounded-2xl border-l-4 shadow-sm bg-white ${rule.type === 'danger' ? 'border-red-500' : rule.type === 'warning' ? 'border-orange-500' : 'border-blue-500'}`}>
                <div className="flex items-center gap-2 mb-1">
                  {rule.type === 'danger' ? <AlertTriangle size={18} className="text-red-500"/> : <CheckCircle size={18} className="text-blue-500"/>}
                  <h4 className="font-black uppercase text-sm">{rule.title}</h4>
                </div>
                <p className="text-sm text-gray-500">{rule.desc}</p>
             </div>
          ))}
        </div>
        <div className="bg-green-50 p-6 rounded-3xl border border-green-100">
           <h3 className="font-bold text-xl text-green-800 mb-4">How to Use the Smart Village?</h3>
           <ul className="space-y-3 text-sm text-green-700">
             <li className="flex gap-2"><Wifi size={16}/> Free Wi-Fi connects automatically upon entry.</li>
             <li className="flex gap-2"><ShoppingBag size={16}/> Use "Market" tab to buy directly from locals.</li>
             <li className="flex gap-2"><MapPin size={16}/> Interactive Map shows safe hiking zones.</li>
           </ul>
        </div>
      </div>
    </div>
  );

  // UPDATED: KNOWLEDGE HUB (Includes Rules for Locals)
  const KnowledgeHub = () => (
    <div className="px-6 py-8 pb-24 animate-in slide-in-from-bottom-10 max-w-6xl mx-auto">
      <div className="bg-indigo-600 rounded-[30px] p-8 text-white mb-8 flex justify-between items-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-black uppercase mb-2">Təlim & Qaydalar</h2>
          <p className="opacity-80 text-sm max-w-md">Kənd həyatını asanlaşdırmaq, qaydaları öyrənmək və biznes qurmaq üçün resurslar.</p>
        </div>
        <MonitorPlay size={120} className="absolute -right-4 -bottom-8 opacity-20" />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <h3 className="font-black text-xl uppercase flex items-center gap-2"><PlayCircle /> Video Təlimatlar</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {eduResources.map(edu => (
              <div key={edu.id} className="bg-white p-3 rounded-2xl border shadow-sm hover:shadow-md transition-all group cursor-pointer">
                <div className="relative h-32 rounded-xl overflow-hidden mb-3">
                  <img src={edu.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <PlayCircle className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" size={32} />
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 rounded">{edu.duration}</span>
                </div>
                <h4 className="font-bold text-sm leading-tight mb-1">{edu.title}</h4>
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{edu.type}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <h3 className="font-black text-xl uppercase flex items-center gap-2"><Calendar /> Canlı Sessiyalar</h3>
          <div className="bg-orange-50 p-5 rounded-2xl border border-orange-100">
             <h4 className="font-bold text-sm text-gray-800">Smart Kənd Təhlükəsizliyi</h4>
             <p className="text-xs text-gray-500 mt-1 mb-2">İcma Mərkəzi, 28 Dek, 14:00</p>
             <button className="text-[10px] font-black uppercase bg-orange-200 text-orange-800 px-3 py-1 rounded-full">Qeydiyyat</button>
          </div>
        </div>
      </div>
    </div>
  );

  // MOVED: COMMUNITY BOARD (Now on its own tab)
  const Community = () => (
    <div className="px-6 py-8 pb-24 max-w-4xl mx-auto animate-in slide-in-from-bottom-10">
      <h2 className="text-3xl font-black uppercase text-gray-800 mb-6">{lang === 'AZ' ? 'İcma Paneli' : 'Community Board'}</h2>
      <div className="grid gap-4">
        {announcements.map(ann => (
          <div key={ann.id} className="bg-white border border-gray-100 shadow-sm p-6 rounded-3xl flex gap-4 items-start">
            <div className="bg-blue-100 p-3 rounded-full text-blue-600"><MessageCircle size={24}/></div>
            <div>
              <span className="text-[10px] font-bold uppercase bg-gray-100 text-gray-500 px-2 py-1 rounded mb-2 inline-block">{ann.type}</span>
              <h3 className="font-bold text-lg text-gray-900">{ann.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{ann.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-6 py-4 rounded-2xl bg-indigo-600 text-white font-bold uppercase hover:bg-indigo-700 transition-all shadow-lg">
         + {lang === 'AZ' ? 'Yeni Elan Paylaş' : 'Post New Announcement'}
       </button>
    </div>
  );

  const Marketplace = () => (
    <div className="px-6 py-8 pb-24 animate-in slide-in-from-bottom-10 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black uppercase text-gray-800">{t.market}</h2>
        {userRole === 'local' && (
           <button className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg hover:bg-green-700"><Plus size={18} /> Satış Et</button>
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {marketItems.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-3xl shadow-sm border flex gap-4 items-center hover:shadow-md transition-shadow">
            <img src={item.img} alt={item.name} className="w-24 h-24 rounded-2xl object-cover bg-gray-100" />
            <div className="flex-1">
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p className="text-xs text-gray-500 font-medium uppercase mb-2">{item.seller}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-black text-green-600">{getPrice(item.price)}</span>
                <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase hover:bg-green-600 transition-colors">{lang === 'AZ' ? 'Al' : 'Buy'}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const Experiences = () => (
    <div className="px-6 py-8 pb-24 animate-in slide-in-from-bottom-10 max-w-5xl mx-auto">
      <h2 className="text-3xl font-black uppercase text-gray-800 mb-6">{t.experiences}</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {localExperiences.map(exp => (
          <div key={exp.id} className="bg-white rounded-[30px] overflow-hidden shadow-lg border group cursor-pointer">
            <div className="h-48 overflow-hidden relative">
               <img src={exp.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
               <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-black flex items-center gap-1"><Star size={12} className="text-yellow-500 fill-yellow-500" /> {exp.rating}</div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-black text-xl leading-tight w-2/3">{exp.title}</h3>
                <span className="text-green-600 font-black text-xl">{getPrice(exp.price)}</span>
              </div>
              <p className="text-sm text-gray-500 mb-4 flex items-center gap-2"><ChefHat size={16} /> with {exp.host}</p>
              <button className="w-full bg-green-50 rounded-xl py-3 text-green-700 font-bold uppercase text-xs hover:bg-green-600 hover:text-white transition-colors">{lang === 'AZ' ? 'Rezerv Et' : 'Reserve Spot'}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const MapView = () => (
    <div className="h-[80vh] w-full relative bg-gray-100 rounded-[30px] overflow-hidden m-6 shadow-inner border max-w-7xl mx-auto">
      <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
        <p className="text-gray-400 font-bold uppercase animate-pulse">Google Map Loading...</p>
        <iframe title="Map" width="100%" height="100%" frameBorder="0" src="https://maps.google.com/maps?q=Agali+village+Zangilan&t=&z=13&ie=UTF8&iwloc=&output=embed" style={{ filter: "grayscale(20%) opacity(0.7)", position: "absolute", inset: 0 }}></iframe>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans relative pb-10">
      <Navbar />
      <main>
        {activeTab === 'home' && (
          <>
            <Hero />
            {userRole === 'local' && (
              <div className="text-center p-8">
                <h2 className="text-2xl font-black text-gray-800 uppercase mb-4">Welcome Home, Neighbor!</h2>
                <div className="flex gap-4 justify-center">
                  <button onClick={() => setActiveTab('community')} className="bg-blue-100 text-blue-700 px-6 py-3 rounded-2xl font-bold uppercase">Go to Community Board</button>
                  <button onClick={() => setActiveTab('market')} className="bg-green-100 text-green-700 px-6 py-3 rounded-2xl font-bold uppercase">Manage Sales</button>
                </div>
              </div>
            )}
            {userRole === 'guest' && (
              <div className="text-center p-8">
                 <h2 className="text-2xl font-black text-gray-800 uppercase mb-4">Start your Journey</h2>
                 <button onClick={() => setActiveTab('guide')} className="bg-orange-100 text-orange-700 px-8 py-3 rounded-2xl font-bold uppercase shadow-sm hover:bg-orange-200">Read Visitor Rules</button>
              </div>
            )}
          </>
        )}
        
        {activeTab === 'map' && <MapView />}
        {activeTab === 'market' && <Marketplace />}
        
        {/* LOCAL TABS */}
        {activeTab === 'education' && userRole === 'local' && <KnowledgeHub />}
        {activeTab === 'community' && userRole === 'local' && <Community />}
        
        {/* GUEST TABS */}
        {activeTab === 'guide' && userRole === 'guest' && <GuestGuide />}
        {activeTab === 'experiences' && userRole === 'guest' && <Experiences />}
      </main>
    </div>
  );
}