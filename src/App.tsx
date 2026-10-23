import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Gem,
  Award,
  Calendar,
  MessageCircle,
  Phone,
  Clock,
  MapPin,
  Home as HomeIcon,
} from 'lucide-react';
import { Header } from './components/Header';
import { BottomActionBar } from './components/BottomActionBar';
import { Hero } from './components/Hero';
import { TodayRatesWidget } from './components/TodayRatesWidget';
import { CatalogueSection } from './components/CatalogueSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { BookVisitModal } from './components/BookVisitModal';
import { CustomJewellerySection } from './components/CustomJewellerySection';
import { RepairPolishingSection } from './components/RepairPolishingSection';
import { GallerySection } from './components/GallerySection';
import { AboutSection } from './components/AboutSection';
import { VisitUsSection } from './components/VisitUsSection';
import { Footer } from './components/Footer';

import { PRODUCTS } from './data/productsData';
import { Product, ActivePage, ProductFilterState } from './types';
import { BUSINESS_INFO, getWhatsAppUrl } from './data/businessInfo';

const PAGE_SEO: Record<ActivePage, { title: string; description: string }> = {
  home: {
    title: 'Kundan Gold | Gold & Silver Jewellery in Kalyan West',
    description:
      'Discover hallmarked gold jewellery and 925 silver jewellery at Kundan Gold in Kalyan West. Browse rings, chains, necklaces, bangles, coins, and custom designs.',
  },
  gold: {
    title: 'Hallmarked Gold Jewellery Collection in Kalyan West | Kundan Gold',
    description:
      'Explore certified 18K and 22K (916) hallmarked gold jewellery at Kundan Gold in Kalyan West. Handcrafted gold rings, necklaces, bangles, chains, and mangalsutras.',
  },
  silver: {
    title: '925 Sterling & Pure Silver Jewellery in Kalyan West | Kundan Gold',
    description:
      'Shop fine 925 sterling silver jewellery and 999 pure silver articles in Kalyan West. Traditional payal, bichiya, pooja thalis, silver coins, and daily wear ornaments.',
  },
  'gold-coins-bars': {
    title: '24K Pure Gold Coins & Bars in Kalyan West | Kundan Gold',
    description:
      'Purchase certified 24K (999) pure gold coins and minted bars at Kundan Gold in Kalyan West for auspicious festivals, gifting, and personal investment.',
  },
  'silver-coins-bars': {
    title: '999 Fine Pure Silver Coins & Bars in Kalyan West | Kundan Gold',
    description:
      'Buy certified 999 pure silver coins and bars at Kundan Gold in Kalyan West. Ideal for Laxmi Ganesh puja, Dhanteras, wedding gifts, and corporate gifting.',
  },
  wedding: {
    title: 'Bridal & Wedding Gold Jewellery in Kalyan West | Kundan Gold',
    description:
      'Explore traditional bridal jewellery sets, 22K gold chokers, Maharashtrian naths, and wedding ornaments at Kundan Gold, Kalyan West. Custom bridal consultations available.',
  },
  'daily-wear': {
    title: 'Daily Wear Gold & Silver Jewellery in Kalyan West | Kundan Gold',
    description:
      'Lightweight, elegant daily wear gold rings, sleek silver chains, and durable everyday jewellery crafted with certified hallmarked purity at Kundan Gold Kalyan West.',
  },
  mens: {
    title: "Men's Gold & Silver Jewellery in Kalyan West | Kundan Gold",
    description:
      "Explore men's solid gold link chains, kada bracelets, signet rings, and sterling silver accessories crafted by master karigars at Kundan Gold Kalyan West.",
  },
  womens: {
    title: "Women's Gold & Silver Jewellery in Kalyan West | Kundan Gold",
    description:
      "Discover handcrafted women's jewellery at Kundan Gold in Kalyan West. Stunning gold jhumkas, bridal necklaces, mangalsutras, kada bangles, and sterling silver anklets.",
  },
  kids: {
    title: 'Kids & Baby Jewellery & Silver Articles in Kalyan West | Kundan Gold',
    description:
      'Traditional nazariya bangles, baby-safe smooth gold kadas, and pure 999 silver feeding sets (vati & chamach) for newborns and children at Kundan Gold Kalyan West.',
  },
  custom: {
    title: 'Custom Jewellery Design & Bespoke Crafting in Kalyan West | Kundan Gold',
    description:
      'Bespoke jewellery crafted to your exact design, weight, and purity preferences by seasoned karigars at Kundan Gold in Kalyan West. Consultation slots available.',
  },
  'repair-polishing': {
    title: 'Jewellery Repair, Resizing & Polishing in Kalyan West | Kundan Gold',
    description:
      'Professional gold and silver soldering, ring resizing, gemstone resetting, and ultrasonic polishing services at Kundan Gold showroom in Kalyan West.',
  },
  rates: {
    title: "Today's Gold & Silver Rates in Kalyan West | Kundan Gold Daily Board",
    description:
      "View today's live indicative gold and silver rates in Kalyan West for 24K, 22K, 18K gold and 999, 925 silver. Confirm current showroom pricing via WhatsApp.",
  },
  about: {
    title: 'About Kundan Gold | Family-Owned Jewellers in Kalyan West, Maharashtra',
    description:
      'Learn about Kundan Gold, a trusted family-owned jewellery shop in Kalyan West known for hallmarked gold and silver ornaments, honest pricing, and master craftsmanship.',
  },
  gallery: {
    title: 'Showroom & Jewellery Craftsmanship Gallery | Kundan Gold Kalyan West',
    description:
      'Take a photo tour of Kundan Gold showroom interior, storefront, and handcrafted bridal ornaments located at Sai Chowk, Kalyan West, Maharashtra.',
  },
  contact: {
    title: 'Visit Kundan Gold | Store Location, Hours & Contact in Kalyan West',
    description:
      'Visit Kundan Gold at Sai Gaurav C-1, Shop No-7, Sai Chowk, Kalyan West. Open Tuesday to Sunday 10 AM to 9 PM (Monday Closed). Call +91 80971 51843 or WhatsApp us.',
  },
  visit: {
    title: 'Visit Kundan Gold | Store Location, Hours & Contact in Kalyan West',
    description:
      'Visit Kundan Gold at Sai Gaurav C-1, Shop No-7, Sai Chowk, Kalyan West. Open Tuesday to Sunday 10 AM to 9 PM (Monday Closed). Call +91 80971 51843 or WhatsApp us.',
  },
};

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isBookVisitOpen, setIsBookVisitOpen] = useState(false);
  const [bookVisitPreselectedProduct, setBookVisitPreselectedProduct] = useState<Product | null>(null);

  // Synchronize document title, meta descriptions, and social tags on view change
  useEffect(() => {
    const seo = PAGE_SEO[activePage] || PAGE_SEO.home;
    document.title = seo.title;

    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', seo.description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', seo.title);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', seo.description);
    }

    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
      twTitle.setAttribute('content', seo.title);
    }
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) {
      twDesc.setAttribute('content', seo.description);
    }
  }, [activePage]);

  // Filter state for catalogue
  const [filterState, setFilterState] = useState<ProductFilterState>({
    metal: 'all',
    category: '',
    purity: '',
    collection: '',
    searchQuery: '',
    sortBy: 'featured',
  });

  // Handle page navigation
  const handleNavigate = (
    page: ActivePage,
    options?: { collection?: string; category?: string; metal?: 'all' | 'Gold' | 'Silver' }
  ) => {
    setActivePage(page);

    if (options?.metal) {
      setFilterState((prev) => ({ ...prev, metal: options.metal || 'all' }));
    }
    if (options?.collection) {
      setFilterState((prev) => ({ ...prev, collection: options.collection || '' }));
    }
    if (options?.category) {
      setFilterState((prev) => ({ ...prev, category: options.category || '' }));
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBookVisit = (product?: Product) => {
    setBookVisitPreselectedProduct(product || null);
    setIsBookVisitOpen(true);
  };

  const handleFilterUpdate = (updates: Partial<ProductFilterState>) => {
    setFilterState((prev) => ({ ...prev, ...updates }));
  };

  // Breadcrumb title resolution
  const getPageTitle = (page: ActivePage): string => {
    switch (page) {
      case 'gold':
        return 'Gold Jewellery';
      case 'silver':
        return 'Silver Jewellery';
      case 'gold-coins-bars':
        return 'Gold Coins & Bars';
      case 'silver-coins-bars':
        return 'Silver Coins & Bars';
      case 'mens':
        return "Men's Collection";
      case 'womens':
        return "Women's Collection";
      case 'kids':
        return 'Kids Collection';
      case 'wedding':
        return 'Wedding Collection';
      case 'daily-wear':
        return 'Daily Wear Collection';
      case 'custom':
        return 'Custom Jewellery';
      case 'repair-polishing':
        return 'Repair & Polishing';
      case 'rates':
        return "Today's Gold & Silver Rates";
      case 'about':
        return 'About Kundan Gold';
      case 'gallery':
        return 'Jewellery & Store Gallery';
      case 'contact':
      case 'visit':
        return 'Visit Us & Contact';
      default:
        return 'Home';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0A] text-[#F5F0E6] selection:bg-[#C9A45C]/30 selection:text-[#F5F0E6] overflow-x-hidden w-full max-w-full relative">
      {/* Sticky Header */}
      <Header
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenBookVisit={() => handleOpenBookVisit()}
        searchQuery={filterState.searchQuery}
        onSearchChange={(query) => handleFilterUpdate({ searchQuery: query })}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {/* Breadcrumbs for Non-Home Pages */}
        {activePage !== 'home' && (
          <nav aria-label="Breadcrumb" className="bg-[#151513] border-b border-[#242420] py-3.5 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-[#A9A39A]">
              <button
                onClick={() => handleNavigate('home')}
                className="flex items-center gap-1 hover:text-[#F5F0E6] transition-colors cursor-pointer"
              >
                <HomeIcon className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>Home</span>
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-[#55524B]" />
              <span className="font-semibold text-[#F5F0E6]">{getPageTitle(activePage)}</span>
            </div>
          </nav>
        )}

        {/* HOME PAGE VIEW */}
        {activePage === 'home' && (
          <div>
            {/* Hero Section */}
            <Hero
              onNavigate={handleNavigate}
              onOpenBookVisit={() => handleOpenBookVisit()}
            />

            {/* Today's Rates Preview Section */}
            <section className="py-16 sm:py-20 bg-[#0B0B0A] border-b border-[#242420]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <TodayRatesWidget />
              </div>
            </section>

            {/* Quick Collections Navigation Strip */}
            <section className="py-16 sm:py-20 bg-[#151513] border-b border-[#242420]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                  <div>
                    <span className="text-xs font-semibold text-[#C9A45C] tracking-wider uppercase">
                      Curated For Every Occasion
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-[#F5F0E6] mt-1.5">
                      Explore Collections
                    </h2>
                  </div>
                  <button
                    onClick={() => handleNavigate('gold')}
                    className="text-xs sm:text-sm font-semibold text-[#C9A45C] hover:text-[#e4be73] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All Designs</span>
                    <ArrowRight className="w-4 h-4 text-[#C9A45C]" />
                  </button>
                </div>

                {/* Collections Grid Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {/* Wedding Collection */}
                  <div
                    onClick={() => handleNavigate('wedding', { collection: 'Wedding Collection' })}
                    className="group bg-[#0B0B0A] rounded-xl border border-[#242420] p-4 text-center cursor-pointer hover:border-[#C9A45C]/40 hover:shadow-md transition-all"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#063B2E]/60 border border-[#C9A45C]/30 text-[#C9A45C] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-6 h-6 text-[#C9A45C]" />
                    </div>
                    <h3 className="font-heading text-sm font-semibold text-[#F5F0E6]">
                      Wedding
                    </h3>
                    <p className="text-[11px] text-[#A9A39A] mt-0.5">Bridal Sets &amp; Kada</p>
                  </div>

                  {/* Daily Wear Collection */}
                  <div
                    onClick={() => handleNavigate('daily-wear', { collection: 'Daily Wear Collection' })}
                    className="group bg-[#0B0B0A] rounded-xl border border-[#242420] p-4 text-center cursor-pointer hover:border-[#C9A45C]/40 hover:shadow-md transition-all"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#063B2E]/60 border border-[#C9A45C]/30 text-[#C9A45C] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <Gem className="w-6 h-6 text-[#C9A45C]" />
                    </div>
                    <h3 className="font-heading text-sm font-semibold text-[#F5F0E6]">
                      Daily Wear
                    </h3>
                    <p className="text-[11px] text-[#A9A39A] mt-0.5">Lightweight &amp; Sleek</p>
                  </div>

                  {/* Women's Collection */}
                  <div
                    onClick={() => handleNavigate('womens', { collection: "Women's Collection" })}
                    className="group bg-[#0B0B0A] rounded-xl border border-[#242420] p-4 text-center cursor-pointer hover:border-[#C9A45C]/40 hover:shadow-md transition-all"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#063B2E]/60 border border-[#C9A45C]/30 text-[#C9A45C] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <Award className="w-6 h-6 text-[#C9A45C]" />
                    </div>
                    <h3 className="font-heading text-sm font-semibold text-[#F5F0E6]">
                      Women’s
                    </h3>
                    <p className="text-[11px] text-[#A9A39A] mt-0.5">Earrings &amp; Chokers</p>
                  </div>

                  {/* Men's Collection */}
                  <div
                    onClick={() => handleNavigate('mens', { collection: "Men's Collection" })}
                    className="group bg-[#0B0B0A] rounded-xl border border-[#242420] p-4 text-center cursor-pointer hover:border-[#C9A45C]/40 hover:shadow-md transition-all"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#063B2E]/60 border border-[#C9A45C]/30 text-[#C9A45C] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-6 h-6 text-[#C9A45C]" />
                    </div>
                    <h3 className="font-heading text-sm font-semibold text-[#F5F0E6]">
                      Men’s
                    </h3>
                    <p className="text-[11px] text-[#A9A39A] mt-0.5">Chains &amp; Rings</p>
                  </div>

                  {/* Kids Collection */}
                  <div
                    onClick={() => handleNavigate('kids', { collection: 'Kids Collection' })}
                    className="group bg-[#0B0B0A] rounded-xl border border-[#242420] p-4 text-center cursor-pointer hover:border-[#C9A45C]/40 hover:shadow-md transition-all"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#063B2E]/60 border border-[#C9A45C]/30 text-[#C9A45C] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-6 h-6 text-[#C9A45C]" />
                    </div>
                    <h3 className="font-heading text-sm font-semibold text-[#F5F0E6]">
                      Kids
                    </h3>
                    <p className="text-[11px] text-[#A9A39A] mt-0.5">Nazariya &amp; Bangles</p>
                  </div>

                  {/* Coins & Bars */}
                  <div
                    onClick={() => handleNavigate('gold-coins-bars', { collection: 'Gold Coins & Bars' })}
                    className="group bg-[#0B0B0A] rounded-xl border border-[#242420] p-4 text-center cursor-pointer hover:border-[#C9A45C]/40 hover:shadow-md transition-all"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#063B2E]/60 border border-[#C9A45C]/30 text-[#C9A45C] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <span className="font-serif font-bold text-base text-[#C9A45C]">₹</span>
                    </div>
                    <h3 className="font-heading text-sm font-semibold text-[#F5F0E6]">
                      Coins &amp; Bars
                    </h3>
                    <p className="text-[11px] text-[#A9A39A] mt-0.5">Pure 24K &amp; 999</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Complete Catalogue Section */}
            <CatalogueSection
              products={PRODUCTS}
              filterState={filterState}
              onFilterChange={handleFilterUpdate}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onOpenBookVisit={handleOpenBookVisit}
              title="Kundan Gold Jewellery Catalogue"
              subtitle="Browse our 18K, 22K & 24K Gold and 925 & 999 Silver pieces. Click any item to request today's price directly via WhatsApp or call our shop."
            />

            {/* Custom Jewellery Section */}
            <CustomJewellerySection />

            {/* Repair & Polishing Section */}
            <RepairPolishingSection />

            {/* Gallery Section */}
            <GallerySection />

            {/* About Kundan Gold */}
            <AboutSection />

            {/* Visit Us & Map */}
            <VisitUsSection onOpenBookVisit={() => handleOpenBookVisit()} />
          </div>
        )}

        {/* GOLD JEWELLERY VIEW */}
        {activePage === 'gold' && (
          <CatalogueSection
            products={PRODUCTS}
            filterState={{ ...filterState, metal: 'Gold' }}
            onFilterChange={handleFilterUpdate}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onOpenBookVisit={handleOpenBookVisit}
            title="Gold Jewellery Collection"
            subtitle="Explore 18K, 22K, and 24K hallmarked gold rings, chains, necklaces, earrings, bangles, bracelets, pendants, and mangalsutras."
          />
        )}

        {/* SILVER JEWELLERY VIEW */}
        {activePage === 'silver' && (
          <CatalogueSection
            products={PRODUCTS}
            filterState={{ ...filterState, metal: 'Silver' }}
            onFilterChange={handleFilterUpdate}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onOpenBookVisit={handleOpenBookVisit}
            title="Silver Jewellery &amp; Utensils"
            subtitle="Explore 925 sterling silver ornaments, anklets/payal, toe rings/bichiya, pooja thalis, 999 silver idols, and gifts."
          />
        )}

        {/* GOLD COINS & BARS VIEW */}
        {activePage === 'gold-coins-bars' && (
          <CatalogueSection
            products={PRODUCTS}
            filterState={{ ...filterState, collection: 'Gold Coins & Bars' }}
            onFilterChange={handleFilterUpdate}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onOpenBookVisit={handleOpenBookVisit}
            title="Gold Coins &amp; Bullion Bars"
            subtitle="99.9% pure 24K minted gold coins with Laxmi-Ganesh emblems and assay-certified investment cast bars."
          />
        )}

        {/* SILVER COINS & BARS VIEW */}
        {activePage === 'silver-coins-bars' && (
          <CatalogueSection
            products={PRODUCTS}
            filterState={{ ...filterState, collection: 'Silver Coins & Bars' }}
            onFilterChange={handleFilterUpdate}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onOpenBookVisit={handleOpenBookVisit}
            title="Silver Coins &amp; Bullion Bars"
            subtitle="999 purity fine silver investment bars and embossed auspicious coins in sealed protective presentation packs."
          />
        )}

        {/* MEN'S COLLECTION VIEW */}
        {activePage === 'mens' && (
          <CatalogueSection
            products={PRODUCTS}
            filterState={{ ...filterState, collection: "Men's Collection" }}
            onFilterChange={handleFilterUpdate}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onOpenBookVisit={handleOpenBookVisit}
            title="Men's Jewellery Collection"
            subtitle="Solid 22K gold Figaro chains, signet rings, rudraksha bracelets, and 925 sterling silver curb chains."
          />
        )}

        {/* WOMEN'S COLLECTION VIEW */}
        {activePage === 'womens' && (
          <CatalogueSection
            products={PRODUCTS}
            filterState={{ ...filterState, collection: "Women's Collection" }}
            onFilterChange={handleFilterUpdate}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onOpenBookVisit={handleOpenBookVisit}
            title="Women's Jewellery Collection"
            subtitle="Elegant traditional and contemporary gold and silver earrings, chokers, kada bangles, payal, and pendants."
          />
        )}

        {/* KIDS COLLECTION VIEW */}
        {activePage === 'kids' && (
          <CatalogueSection
            products={PRODUCTS}
            filterState={{ ...filterState, collection: 'Kids Collection' }}
            onFilterChange={handleFilterUpdate}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onOpenBookVisit={handleOpenBookVisit}
            title="Kids &amp; Baby Jewellery Collection"
            subtitle="Auspicious nazariya bangles, pure 999 silver feeding bowls (vati & chamach), and baby-safe smooth kada bangles."
          />
        )}

        {/* WEDDING COLLECTION VIEW */}
        {activePage === 'wedding' && (
          <CatalogueSection
            products={PRODUCTS}
            filterState={{ ...filterState, collection: 'Wedding Collection' }}
            onFilterChange={handleFilterUpdate}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onOpenBookVisit={handleOpenBookVisit}
            title="Wedding &amp; Bridal Collection"
            subtitle="Grand 22K choker sets, traditional Maharashtrian naths, bridal payals, and auspicious pooja thalis."
          />
        )}

        {/* DAILY WEAR COLLECTION VIEW */}
        {activePage === 'daily-wear' && (
          <CatalogueSection
            products={PRODUCTS}
            filterState={{ ...filterState, collection: 'Daily Wear Collection' }}
            onFilterChange={handleFilterUpdate}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onOpenBookVisit={handleOpenBookVisit}
            title="Daily Wear Jewellery Collection"
            subtitle="Comfortable, lightweight 18K and 22K gold bands, sleek silver bracelets, delicate chains, and anti-tarnish toe rings."
          />
        )}

        {/* TODAY'S RATES VIEW */}
        {activePage === 'rates' && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <TodayRatesWidget />
            <div className="bg-[#151513] p-6 sm:p-8 rounded-2xl border border-[#242420] space-y-4 shadow-xl">
              <h3 className="font-heading text-lg sm:text-xl font-semibold text-[#F5F0E6]">
                How Metal Rates Work at Kundan Gold
              </h3>
              <p className="text-xs sm:text-sm text-[#A9A39A] leading-relaxed">
                Gold and silver market prices fluctuate daily based on bullion exchanges. At Kundan Gold, we believe in 100% price transparency: your invoice transparently shows the exact gross weight, net precious metal weight, prevailing rate applied, and agreed making charges with no concealed deductions.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={getWhatsAppUrl("Hello Kundan Gold, I'd like to ask about today's live rate and making charges.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#063B2E] hover:bg-[#084B3B] text-[#F5F0E6] border border-[#C9A45C]/40 px-4 py-2.5 rounded-lg text-xs font-semibold shadow-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Inquire Daily Rate on WhatsApp</span>
                </a>
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="inline-flex items-center gap-2 bg-[#0B0B0A] hover:bg-[#1C1C19] text-[#F5F0E6] border border-[#242420] hover:border-[#C9A45C]/40 px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C9A45C]" />
                  <span>Call {BUSINESS_INFO.displayPhone}</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* CUSTOM JEWELLERY VIEW */}
        {activePage === 'custom' && (
          <div>
            <CustomJewellerySection />
            <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <CatalogueSection
                products={PRODUCTS.slice(0, 4)}
                filterState={filterState}
                onFilterChange={handleFilterUpdate}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onOpenBookVisit={handleOpenBookVisit}
                title="Design Inspirations For Custom Orders"
                subtitle="Select any piece as a baseline reference for customized weight, stone setting, or sizing."
              />
            </div>
          </div>
        )}

        {/* REPAIR & POLISHING VIEW */}
        {activePage === 'repair-polishing' && (
          <div>
            <RepairPolishingSection />
            <VisitUsSection onOpenBookVisit={() => handleOpenBookVisit()} />
          </div>
        )}

        {/* GALLERY VIEW */}
        {activePage === 'gallery' && (
          <div className="py-6">
            <GallerySection />
          </div>
        )}

        {/* ABOUT VIEW */}
        {activePage === 'about' && (
          <div>
            <AboutSection />
            <VisitUsSection onOpenBookVisit={() => handleOpenBookVisit()} />
          </div>
        )}

        {/* CONTACT / VISIT US VIEW */}
        {(activePage === 'contact' || activePage === 'visit') && (
          <div>
            <VisitUsSection onOpenBookVisit={() => handleOpenBookVisit()} />
          </div>
        )}
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenBookVisit={(p) => handleOpenBookVisit(p)}
      />

      {/* Book In-Store Visit Modal */}
      <BookVisitModal
        isOpen={isBookVisitOpen}
        onClose={() => {
          setIsBookVisitOpen(false);
          setBookVisitPreselectedProduct(null);
        }}
        selectedProduct={bookVisitPreselectedProduct}
      />

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBookVisit={() => handleOpenBookVisit()}
      />

      {/* Mobile Sticky Bottom Action Bar */}
      <BottomActionBar onOpenBookVisit={() => handleOpenBookVisit()} />
    </div>
  );
}
