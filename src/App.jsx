import React, { useState } from 'react';
import { 
  MapPin, Calendar, Users, Heart, Search, Home, Compass, 
  MessageCircle, Star, Clock, Send, X, Bot, Globe, Shield, Car, 
  CheckCircle, User, Zap, Plus, PlayCircle, BookOpen, ShoppingBag, 
  Languages, Bell, AlertTriangle, Droplets, QrCode, Briefcase, Building, ShieldCheck, Megaphone, Tag
} from 'lucide-react';

// ============================================
// 1. DATA & TRANSLATIONS
// ============================================

const currencies = {
  AZN: { symbol: '₼', rate: 1 },
  USD: { symbol: '$', rate: 0.59 },
  EUR: { symbol: '€', rate: 0.54 }
};

const translations = {
  AZ: { 
    home: "Ana Səhifə", map: "Xəritə", support: "Dəstək", market: "Bazar", 
    travel: "Səyahət", rideshare: "Yol Yoldaşı", logout: "Çıxış", 
    scan: "QR Oxut", verified: "Təsdiqlənib", book: "Bron Et",
    announcements: "Elanlar", mybiz: "Satış Paneli", add_product: "Məhsul Əlavə Et"
  },
  EN: { 
    home: "Home", map: "Map", support: "Support", market: "Market", 
    travel: "Travel", rideshare: "Car Pool", logout: "Logout", 
    scan: "Scan QR", verified: "Verified ID", book: "Book Now",
    announcements: "Announcements", mybiz: "Sales Dashboard", add_product: "Add Product"
  }
};

// Mock Data for Announcements
const initialAnnouncements = [
  { id: 1, user: "Həsən dayı", title: "Ot biçini üçün kömək lazımdır", desc: "Sabah saat 08:00-da, ödənişli.", type: "İş", time: "1 saat əvvəl" },
  { id: 2, user: "Aygün xanım", title: "İtmiş açar dəstəsi", desc: "Parkda 3 ədəd açar tapılıb. Sahibini axtarırıq.", type: "Məlumat", time: "3 saat əvvəl" }
];

const rideShares = [
  { id: 1, driver: "Elvin M.", from: "Bakı", to: "Şuşa", time: "08:00", car: "Toyota Prius", seats: 3, price: 15, verified: true },
  { id: 2, driver: "Aysel K.", from: "Füzuli", to: "Ağalı", time: "14:30", car: "Kia Sportage", seats: 2, price: 10, verified: true }
];

const tourCompanies = [
  { id: 1, name: "Karabakh Eco Tours", rating: 4.8, price: 150, type: "Green Tour" },
  { id: 2, name: "Shusha Heritage", rating: 4.9, price: 200, type: "History" }
];

const localMarketplaceItems = [
  { id: "m1", title: "Qarabağ Kətəsi", provider: "Sizin Satışınız", price: 5, image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800", sold: 12 },
  { id: "m2", title: "Təbii Bal", provider: "Sizin Satışınız", price: 45, image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800", sold: 5 }
];

// ============================================
// 2. MAIN APP COMPONENT
// ============================================

export default function App() {
  const [lang, setLang] = useState('AZ');
  const [currency, setCurrency] = useState('AZN');
  const [userRole, setUserRole] = useState(null); 
  const [activeTab, setActiveTab] = useState('home');
  const [chatOpen, setChatOpen] = useState(false);
  const [points, setPoints] = useState(0);

  const t = translations[lang];

  const convertPrice = (priceInAZN) => {
    const rate = currencies[currency].rate;
    return (priceInAZN * rate).toFixed(1) + ' ' + currencies[currency].symbol;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <DynamicHome role={userRole} lang={lang} convertPrice={convertPrice} />;
      case 'map': return <MapPage lang={lang} onScan={() => setPoints(p => p + 50)} points={points} />;
      
      // Local Only
      case 'announcements': return <CommunityBoard lang={lang} />;
      
      // Shared / Modified based on role
      case 'marketplace': return <MarketplacePage role={userRole} lang={lang} convertPrice={convertPrice} />;
      
      // Guest Only
      case 'travel': return <TravelPage convertPrice={convertPrice} lang={lang} />;
      case 'rideshare': return <RideSharePage convertPrice={convertPrice} lang={lang} />;
      
      default: return <DynamicHome role={userRole} lang={lang} />;
    }
  };

  if (!userRole) return <RoleSelection onSelect={(role) => setUserRole(role)} lang={lang} setLang={setLang} />;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-24">
      {/* NAVBAR */}
      <nav className="bg-white border-b sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
          <MapPin className="text-green-600" size={28} />
          <div>
            <h1 className="text-xl font-black uppercase tracking-tighter italic leading-none">Qarabağ Hub</h1>
            <div className="flex items-center gap-1">
               <span className={`text-[9px] px-2 rounded font-bold uppercase ${userRole === 'local' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                 {userRole === 'local' ? (lang === 'AZ' ? 'Yerli Sakin' : 'Resident') : (lang === 'AZ' ? 'Qonaq' : 'Guest')}
               </span>
            </div>
          </div>
        </div>
      
        {/* DYNAMIC MENU ITEMS BASED ON ROLE */}
        <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest hidden md:flex">
          <NavButton active={activeTab === 'home'} onClick={() => setActiveTab('home')} label={t.home} />
          <NavButton active={activeTab === 'map'} onClick={() => setActiveTab('map')} label={t.map} />

          {/* SAKİN ÜÇÜN MENYU */}
          {userRole === 'local' ? (
            <>
              <NavButton active={activeTab === 'announcements'} onClick={() => setActiveTab('announcements')} label={t.announcements} />
              <NavButton active={activeTab === 'marketplace'} onClick={() => setActiveTab('marketplace')} label={t.market} />
            </>
          ) : (
          /* QONAQ ÜÇÜN MENYU */
            <>
              <NavButton active={activeTab === 'travel'} onClick={() => setActiveTab('travel')} label={t.travel} />
              <NavButton active={activeTab === 'rideshare'} onClick={() => setActiveTab('rideshare')} label={t.rideshare} />
              <NavButton active={activeTab === 'marketplace'} onClick={() => setActiveTab('marketplace')} label={t.market} />
            </>
          )}
        </div>

        <div className="flex items-center gap-3 pl-4">
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="bg-gray-100 px-2 py-1 rounded-lg text-xs font-bold outline-none cursor-pointer">
            <option value="AZN">₼ AZN</option>
            <option value="USD">$ USD</option>
            <option value="EUR">€ EUR</option>
          </select>

          <button onClick={() => setLang(lang === 'AZ' ? 'EN' : 'AZ')} className="w-8 h-8 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center hover:bg-gray-800 transition-colors">
            {lang}
          </button>
          
          <button onClick={() => {setUserRole(null); setActiveTab('home');}} className="text-red-400 hover:text-red-600">
            <X size={20} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between items-center z-40 pb-6">
        <MobileNavIcon icon={<Home size={20} />} active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
        
        {userRole === 'local' ? (
           <>
             <MobileNavIcon icon={<Megaphone size={20} />} active={activeTab === 'announcements'} onClick={() => setActiveTab('announcements')} />
             <MobileNavIcon icon={<Briefcase size={20} />} active={activeTab === 'marketplace'} onClick={() => setActiveTab('marketplace')} />
           </>
        ) : (
           <>
             <MobileNavIcon icon={<Car size={20} />} active={activeTab === 'rideshare'} onClick={() => setActiveTab('rideshare')} />
             <MobileNavIcon icon={<ShoppingBag size={20} />} active={activeTab === 'marketplace'} onClick={() => setActiveTab('marketplace')} />
           </>
        )}
      </div>

      <main className="max-w-7xl mx-auto p-6">
        {renderContent()}
      </main>

      <button onClick={() => setChatOpen(!chatOpen)} className="fixed bottom-24 md:bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-2xl z-50 hover:scale-110 transition-all">
        <Bot size={28} />
      </button>
      {chatOpen && <ChatWindow onClose={() => setChatOpen(false)} />}
    </div>
  );
}

// ============================================
// 3. YENİ: ELANLAR (COMMUNITY BOARD) - ONLY LOCAL
// ============================================

function CommunityBoard({ lang }) {
  const [posts, setPosts] = useState(initialAnnouncements);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const handlePost = () => {
    if(!newPostTitle) return;
    const newPost = {
      id: posts.length + 1,
      user: "Siz (Xədicə)",
      title: newPostTitle,
      desc: "Ətraflı məlumat yoxdur.",
      type: "Şəxsi",
      time: "İndi"
    };
    setPosts([newPost, ...posts]);
    setNewPostTitle("");
    setIsPosting(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-[40px] p-8 text-white shadow-xl relative overflow-hidden flex justify-between items-center">
        <div className="relative z-10">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">{lang === 'AZ' ? 'İcma Elanları' : 'Community Board'}</h2>
          <p className="text-xs opacity-90 uppercase font-bold tracking-widest max-w-md">
            {lang === 'AZ' ? 'Qonşularla xəbərləşin, elan paylaşın.' : 'Connect with neighbors, share news.'}
          </p>
        </div>
        <Megaphone size={120} className="absolute -right-5 -bottom-5 opacity-20 -rotate-12" />
        
        <button 
          onClick={() => setIsPosting(!isPosting)}
          className="bg-white text-teal-700 px-6 py-3 rounded-2xl font-black uppercase text-xs hover:scale-105 transition-all shadow-lg z-20"
        >
          {lang === 'AZ' ? '+ Elan Paylaş' : '+ Post Ad'}
        </button>
      </div>

      {isPosting && (
        <div className="bg-white p-6 rounded-3xl border shadow-lg animate-in slide-in-from-top-4">
          <h3 className="font-bold text-sm mb-4 uppercase">Yeni Elan Yarat</h3>
          <input 
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            placeholder={lang === 'AZ' ? "Elan başlığı..." : "Announcement title..."}
            className="w-full bg-gray-50 border p-4 rounded-2xl outline-none mb-4 focus:ring-2 focus:ring-teal-500"
          />
          <div className="flex justify-end gap-2">
            <button onClick={() => setIsPosting(false)} className="px-6 py-3 text-gray-500 font-bold text-xs uppercase hover:bg-gray-100 rounded-xl">Ləğv et</button>
            <button onClick={handlePost} className="px-6 py-3 bg-teal-600 text-white font-bold text-xs uppercase rounded-xl hover:bg-teal-700 shadow-md">Paylaş</button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white p-6 rounded-3xl border shadow-sm hover:shadow-md transition-all flex items-start gap-4">
            <div className="bg-teal-50 p-3 rounded-full">
              <User className="text-teal-600" size={24} />
            </div>
            <div className="flex-1">
               <div className="flex justify-between items-start">
                 <h4 className="font-bold text-sm">{post.user}</h4>
                 <span className="text-[9px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{post.time}</span>
               </div>
               <h3 className="font-black text-lg mt-1 mb-2 leading-tight">{post.title}</h3>
               <p className="text-xs text-gray-500">{post.desc}</p>
               <div className="mt-4 flex gap-2">
                 <span className="text-[9px] font-bold uppercase text-teal-600 bg-teal-50 px-2 py-1 rounded-md border border-teal-100">{post.type}</span>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// 4. BAZAR (MARKET) - ADAPTIVE
// ============================================

function MarketplacePage({ role, lang, convertPrice }) {
  const [addProductOpen, setAddProductOpen] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* HEADER DƏYİŞİR ROLA GÖRƏ */}
      <div className={`rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden flex justify-between items-center ${role === 'local' ? 'bg-gradient-to-r from-purple-700 to-indigo-600' : 'bg-gradient-to-r from-orange-500 to-yellow-500'}`}>
        <div className="relative z-10">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">
            {role === 'local' ? (lang === 'AZ' ? 'Mənim Biznesim' : 'My Business') : (lang === 'AZ' ? 'Yerli Bazar' : 'Local Market')}
          </h2>
          <p className="text-xs opacity-90 uppercase font-bold tracking-widest">
            {role === 'local' ? (lang === 'AZ' ? 'Məhsullarınızı əlavə edin və satın' : 'Add and sell your products') : (lang === 'AZ' ? 'Təbii kənd nemətləri' : 'Fresh local goods')}
          </p>
        </div>
        
        {/* YALNIZ SAKİN ÜÇÜN SATIŞ DÜYMƏSİ */}
        {role === 'local' && (
          <button 
            onClick={() => setAddProductOpen(true)}
            className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black uppercase text-sm hover:scale-105 transition-all shadow-xl z-20 flex items-center gap-2"
          >
            <Plus size={18} /> {lang === 'AZ' ? 'Məhsul Əlavə Et' : 'Add Product'}
          </button>
        )}
        <Tag size={180} className="absolute -right-10 -bottom-10 opacity-10" />
      </div>

      {/* ADD PRODUCT FORM (MOCK) */}
      {addProductOpen && (
        <div className="bg-white p-8 rounded-[40px] border shadow-2xl animate-in slide-in-from-top-10 relative">
           <button onClick={() => setAddProductOpen(false)} className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-500 transition-colors"><X size={20}/></button>
           <h3 className="text-2xl font-black uppercase mb-6 text-indigo-700">Yeni Məhsul</h3>
           <div className="grid grid-cols-2 gap-4">
             <input placeholder="Məhsulun adı" className="border p-4 rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-500" />
             <input placeholder="Qiymət (AZN)" type="number" className="border p-4 rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-500" />
             <textarea placeholder="Təsvir..." className="border p-4 rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-500 col-span-2 h-24" />
           </div>
           <button onClick={() => {alert('Məhsul satışa çıxarıldı!'); setAddProductOpen(false);}} className="w-full mt-6 bg-indigo-600 text-white py-4 rounded-2xl font-black uppercase shadow-lg hover:bg-indigo-700">Təsdiqlə</button>
        </div>
      )}

      {/* SAKİN GÖRÜNÜŞÜ (SATIŞ PANELİ KİMİ) */}
      {role === 'local' ? (
        <div className="grid md:grid-cols-3 gap-6">
          {localMarketplaceItems.map((item) => (
             <div key={item.id} className="bg-white rounded-3xl p-6 border shadow-sm relative group">
               <div className="absolute top-4 right-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                 Satışdadır
               </div>
               <div className="h-32 rounded-2xl overflow-hidden mb-4">
                 <img src={item.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
               </div>
               <h3 className="font-black text-lg">{item.title}</h3>
               <p className="text-2xl font-black text-indigo-600 my-2">{convertPrice(item.price)}</p>
               <div className="bg-gray-100 rounded-xl p-3 mt-4 flex justify-between items-center">
                 <span className="text-xs font-bold text-gray-500 uppercase">Satılıb:</span>
                 <span className="font-black text-gray-900">{item.sold} ədəd</span>
               </div>
             </div>
          ))}
          <div onClick={() => setAddProductOpen(true)} className="border-4 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-indigo-300 hover:text-indigo-400 transition-all min-h-[200px]">
            <Plus size={40} className="mb-2" />
            <span className="font-bold uppercase text-xs">Yeni Məhsul</span>
          </div>
        </div>
      ) : (
        /* QONAQ GÖRÜNÜŞÜ (ADI SHOPPING) */
        <div className="grid md:grid-cols-3 gap-6">
          {localMarketplaceItems.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group">
              <div className="h-48 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="font-black text-lg uppercase tracking-tight mb-2">{item.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-black text-green-600">{convertPrice(item.price)}</span>
                  <button onClick={() => alert(`"${item.title}" sifarişiniz qeydə alındı!`)} className="bg-green-600 text-white px-6 py-2 rounded-xl font-bold text-xs uppercase hover:bg-green-700 transition-all">
                    {lang === 'AZ' ? 'Almaq' : 'Buy'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================
// 5. OTHER PAGES (UNCHANGED BUT INCLUDED)
// ============================================

function RideSharePage({ convertPrice, lang }) {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-[40px] p-8 text-white shadow-xl relative overflow-hidden">
        <h2 className="text-3xl font-black uppercase mb-2">{lang === 'AZ' ? 'Yol Yoldaşı' : 'Ride Sharing'}</h2>
        <Car size={150} className="absolute -right-5 -bottom-5 opacity-20 rotate-12" />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rideShares.map(ride => (
          <div key={ride.id} className="bg-white p-6 rounded-3xl border shadow-sm">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-sm flex items-center gap-1">{ride.driver} <ShieldCheck size={14} className="text-blue-500" /></h4>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">{ride.car}</p>
               </div>
               <span className="text-xl font-black text-green-600">{convertPrice(ride.price)}</span>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="bg-orange-50 text-orange-600 px-2 py-1 rounded-md text-xs font-bold">{ride.time}</span>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase">Select</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TravelPage({ convertPrice, lang }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[40px] shadow-lg border relative overflow-hidden">
          <h3 className="text-2xl font-black uppercase mb-2">Hotels</h3>
          <Building size={120} className="absolute -right-4 -bottom-4 text-gray-100" />
        </div>
        <div className="bg-white p-8 rounded-[40px] shadow-lg border relative overflow-hidden">
          <h3 className="text-2xl font-black uppercase mb-2">Transport</h3>
          <Compass size={120} className="absolute -right-4 -bottom-4 text-gray-100" />
        </div>
      </div>
      <div>
        <h3 className="font-black text-xl uppercase mb-6">{lang === 'AZ' ? 'Tur Paketləri' : 'Tour Packages'}</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {tourCompanies.map(tour => (
            <div key={tour.id} className="bg-white rounded-3xl p-6 border shadow-sm flex items-center justify-between">
              <div>
                <h4 className="font-bold text-lg">{tour.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-bold">{tour.rating}</span>
                </div>
              </div>
              <span className="block text-2xl font-black text-orange-600">{convertPrice(tour.price)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MapPage({ lang, onScan, points }) {
  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-[40px] h-[500px] relative overflow-hidden shadow-2xl flex items-center justify-center">
        <div className="text-white text-center">
          <MapPin size={60} className="mx-auto mb-4 text-green-500" />
          <h2 className="text-4xl font-black uppercase">Smart Map</h2>
          <button onClick={onScan} className="mt-6 bg-white text-black px-8 py-3 rounded-full font-bold uppercase hover:scale-105 transition-all flex items-center gap-2 mx-auto">
             <QrCode size={18} /> {lang === 'AZ' ? 'QR Oxut' : 'Scan QR'}
          </button>
        </div>
        <div className="absolute top-6 right-6 bg-white/10 backdrop-blur px-4 py-2 rounded-xl text-white font-bold">
           XP: {points}
        </div>
      </div>
    </div>
  );
}

function DynamicHome({ role, lang }) {
  if (role === 'local') {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
           <div className="relative z-10">
             <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">{lang === 'AZ' ? 'Xoş Gəldin' : 'Welcome Home'}</h2>
             <p className="text-xs opacity-90 uppercase font-bold tracking-widest">Ağalı Smart City Management</p>
           </div>
           <Zap size={180} className="absolute -right-10 -bottom-10 opacity-10" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           <div className="bg-white p-6 rounded-3xl border shadow-sm">
             <Zap className="text-yellow-400 mb-2" />
             <span className="block font-black text-2xl">12.4</span>
             <p className="text-[10px] text-gray-400 uppercase font-bold">Energy (kWh)</p>
           </div>
           <div className="bg-white p-6 rounded-3xl border shadow-sm">
             <Droplets className="text-blue-400 mb-2" />
             <span className="block font-black text-2xl">45 L</span>
             <p className="text-[10px] text-gray-400 uppercase font-bold">Water</p>
           </div>
           <div className="bg-white p-6 rounded-3xl border shadow-sm">
             <Shield className="text-green-400 mb-2" />
             <span className="block font-black text-2xl">Ok</span>
             <p className="text-[10px] text-gray-400 uppercase font-bold">Security</p>
           </div>
           <div className="bg-white p-6 rounded-3xl border shadow-sm">
             <Bell className="text-red-400 mb-2" />
             <span className="block font-black text-2xl">0</span>
             <p className="text-[10px] text-gray-400 uppercase font-bold">Alerts</p>
           </div>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-10 animate-in zoom-in-95 duration-700">
      <div className="relative h-[400px] rounded-[50px] overflow-hidden shadow-2xl">
        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200" className="w-full h-full object-cover" alt="Qarabağ" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10 text-white">
          <h2 className="text-5xl font-black mb-2 uppercase tracking-tighter italic">Discover <br/> Karabakh</h2>
        </div>
      </div>
    </div>
  );
}

function NavButton({ active, onClick, label }) {
  return (
    <button onClick={onClick} className={`transition-colors border-b-2 pb-1 ${active ? 'text-green-600 border-green-600' : 'text-gray-400 border-transparent hover:text-gray-600'}`}>
      {label}
    </button>
  );
}

function MobileNavIcon({ icon, active, onClick }) {
  return (
    <button onClick={onClick} className={`${active ? 'text-green-600 bg-green-50' : 'text-gray-400'} p-3 rounded-xl transition-all`}>
      {icon}
    </button>
  );
}

function RoleSelection({ onSelect, lang, setLang }) {
  return (
    <div className="min-h-screen bg-green-600 flex flex-col items-center justify-center p-6">
      <div className="bg-white max-w-2xl w-full rounded-[60px] p-12 shadow-2xl text-center relative">
        <div className="absolute top-10 right-10 flex gap-2">
          <button onClick={() => setLang('AZ')} className={`text-xs font-black ${lang === 'AZ' ? 'text-green-600 underline' : 'text-gray-300'}`}>AZ</button>
          <button onClick={() => setLang('EN')} className={`text-xs font-black ${lang === 'EN' ? 'text-green-600 underline' : 'text-gray-300'}`}>EN</button>
        </div>
        <h2 className="text-3xl font-black mb-12 uppercase tracking-tighter">{lang === 'AZ' ? 'Statusunu Seç' : 'Select Your Status'}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <button onClick={() => onSelect('local')} className="group border-4 border-blue-50 p-8 rounded-[45px] hover:border-blue-500 transition-all hover:bg-blue-50">
            <User size={50} className="mx-auto mb-4 text-blue-500 group-hover:scale-110 transition-transform" />
            <h3 className="font-black text-lg mb-1 uppercase italic">{lang === 'AZ' ? 'Yerli Sakin' : 'Resident'}</h3>
          </button>
          <button onClick={() => onSelect('guest')} className="group border-4 border-orange-50 p-8 rounded-[45px] hover:border-orange-500 transition-all hover:bg-orange-50">
            <Globe size={50} className="mx-auto mb-4 text-orange-500 group-hover:scale-110 transition-transform" />
            <h3 className="font-black text-lg mb-1 uppercase italic">{lang === 'AZ' ? 'Qonaq / Turist' : 'Foreign Guest'}</h3>
          </button>
        </div>
      </div>
    </div>
  );
}

function ChatWindow({ onClose }) {
  return (
    <div className="w-80 h-96 bg-white rounded-3xl shadow-2xl border flex flex-col fixed bottom-24 right-6 p-4">
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <span className="font-bold text-sm">AI Assistant</span>
        <button onClick={onClose}><X size={16}/></button>
      </div>
      <div className="flex-1 text-xs text-gray-500">How can I help you today?</div>
    </div>
  )
}