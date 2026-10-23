import React, { useState } from 'react';
import {
  Phone,
  Clock,
  MapPin,
  Search,
  Menu,
  X,
  Calendar,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { BUSINESS_INFO, getWhatsAppUrl, getStoreOpenStatus } from '../data/businessInfo';
import { ActivePage } from '../types';

interface HeaderProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage, options?: { collection?: string; category?: string; metal?: 'all' | 'Gold' | 'Silver' }) => void;
  onOpenBookVisit: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onNavigate,
  onOpenBookVisit,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collectionsDropdownOpen, setCollectionsDropdownOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);

  const handleNav = (page: ActivePage, options?: { collection?: string; category?: string; metal?: 'all' | 'Gold' | 'Silver' }) => {
    onNavigate(page, options);
    setMobileMenuOpen(false);
    setCollectionsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openStatus = getStoreOpenStatus();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0B0A] border-b border-[#C9A45C]/20 shadow-md">
      {/* 1. Top Information Bar - Deep Emerald */}
      <div className="bg-[#063B2E] text-[#F5F0E6] text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-[#C9A45C]/25">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-1.5 gap-x-4">
          {/* Location & Hours */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[#E5DDD0] text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C9A45C] shrink-0" />
              <span>Sai Chowk, Kalyan West</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C9A45C] shrink-0" />
              <span>Tue–Sun: 10:00 AM–9:00 PM (Mon: Closed)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#0B0B0A]/80 border border-[#C9A45C]/30 text-[#F5F0E6]">
              <span className={`w-1.5 h-1.5 rounded-full ${openStatus.isOpen ? 'bg-[#25D366]' : 'bg-[#EF4444]'}`} />
              <span>{openStatus.statusText}</span>
            </span>
          </div>

          {/* Rates Link & Phone */}
          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-medium ml-auto">
            <button
              onClick={() => handleNav('rates')}
              className="text-[#F5F0E6] hover:text-[#C9A45C] transition-colors flex items-center gap-1.5 cursor-pointer group"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C9A45C] shrink-0" />
              <span className="underline decoration-[#C9A45C]/60 underline-offset-2">Today's Gold &amp; Silver Rates</span>
            </button>
            <span className="text-[#C9A45C]/40 select-none">|</span>
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center gap-1.5 text-[#F5F0E6] hover:text-[#C9A45C] transition-colors font-semibold"
            >
              <Phone className="w-3 h-3 text-[#C9A45C] shrink-0" />
              <span>+91 8097151843</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Header Bar - Logo, Quick Contact & Primary Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3.5 sm:py-4">
          {/* Brand Logo - Completely visible, generous breathing room */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 sm:gap-3 text-left group cursor-pointer shrink-0"
          >
            <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#063B2E] flex items-center justify-center text-[#C9A45C] font-serif text-lg sm:text-xl font-bold border border-[#C9A45C]/60 shadow-xs group-hover:border-[#C9A45C] transition-colors shrink-0">
              K
            </span>
            <div className="flex flex-col">
              <span className="font-heading text-xl sm:text-2xl lg:text-[1.65rem] tracking-wider text-[#F5F0E6] font-semibold leading-tight">
                KUNDAN <span className="text-[#C9A45C]">GOLD</span>
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-[0.18em] text-[#A9A39A] uppercase font-medium mt-0.5">
                Hallmarked Jewellery • Kalyan West
              </span>
            </div>
          </button>

          {/* Header Action Buttons & Direct Contacts */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Live Rate Link on larger screens */}
            <button
              onClick={() => handleNav('rates')}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#151513] border border-[#C9A45C]/30 text-xs text-[#F5F0E6] hover:border-[#C9A45C] hover:text-[#C9A45C] transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>Live Rates: 22K ₹7,850/g</span>
            </button>

            {/* Direct Call Link */}
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#F5F0E6] hover:text-[#C9A45C] bg-[#151513] hover:bg-[#1C1C19] border border-[#242420] rounded-lg transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>Call 8097151843</span>
            </a>

            {/* Search Input toggle */}
            <div className="relative">
              {searchExpanded ? (
                <div className="flex items-center bg-[#151513] border border-[#C9A45C]/50 rounded-full px-3 py-1.5 shadow-md max-w-[200px] sm:max-w-xs">
                  <Search className="w-4 h-4 text-[#A9A39A] mr-2 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search jewellery..."
                    value={searchQuery}
                    onChange={(e) => {
                      onSearchChange(e.target.value);
                      if (activePage === 'home') {
                        onNavigate('gold');
                      }
                    }}
                    autoFocus
                    className="w-28 sm:w-44 text-xs sm:text-sm bg-transparent outline-none text-[#F5F0E6] placeholder-[#A9A39A]"
                  />
                  <button
                    onClick={() => {
                      setSearchExpanded(false);
                      onSearchChange('');
                    }}
                    className="text-[#A9A39A] hover:text-[#F5F0E6] ml-1 shrink-0"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchExpanded(true)}
                  className="p-2 text-[#F5F0E6] hover:text-[#C9A45C] hover:bg-[#151513] rounded-full transition-colors cursor-pointer"
                  title="Search Jewellery"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Book a Visit Button - Primary Emerald Button */}
            <button
              onClick={onOpenBookVisit}
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#063B2E] hover:bg-[#084B3B] text-[#F5F0E6] border border-[#C9A45C]/40 hover:border-[#C9A45C] text-xs font-semibold px-4 py-2 rounded-lg transition-all shadow-xs cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>Book a Visit</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#F5F0E6] hover:text-[#C9A45C] hover:bg-[#151513] rounded-md transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Dedicated Desktop Navigation Bar - Uncrowded, Spacious, All Items Preserved */}
      <div className="hidden lg:block border-t border-[#242420] bg-[#0B0B0A]/95 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between gap-1 xl:gap-2 text-xs xl:text-sm font-medium text-[#F5F0E6]">
            <button
              onClick={() => handleNav('home')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer shrink-0 ${
                activePage === 'home'
                  ? 'text-[#C9A45C] font-semibold bg-[#063B2E]/60 border border-[#C9A45C]/35'
                  : 'hover:text-[#C9A45C] hover:bg-[#151513]'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNav('gold', { metal: 'Gold' })}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer shrink-0 ${
                activePage === 'gold'
                  ? 'text-[#C9A45C] font-semibold bg-[#063B2E]/60 border border-[#C9A45C]/35'
                  : 'hover:text-[#C9A45C] hover:bg-[#151513]'
              }`}
            >
              Gold Jewellery
            </button>

            <button
              onClick={() => handleNav('silver', { metal: 'Silver' })}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer shrink-0 ${
                activePage === 'silver'
                  ? 'text-[#C9A45C] font-semibold bg-[#063B2E]/60 border border-[#C9A45C]/35'
                  : 'hover:text-[#C9A45C] hover:bg-[#151513]'
              }`}
            >
              Silver Jewellery
            </button>

            {/* Collections Dropdown */}
            <div className="relative shrink-0">
              <button
                onClick={() => setCollectionsDropdownOpen(!collectionsDropdownOpen)}
                onMouseEnter={() => setCollectionsDropdownOpen(true)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  [
                    'wedding',
                    'daily-wear',
                    'mens',
                    'womens',
                    'kids',
                    'gold-coins-bars',
                    'silver-coins-bars',
                  ].includes(activePage)
                    ? 'text-[#C9A45C] font-semibold bg-[#063B2E]/60 border border-[#C9A45C]/35'
                    : 'hover:text-[#C9A45C] hover:bg-[#151513]'
                }`}
              >
                <span>Collections</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#C9A45C]" />
              </button>

              {collectionsDropdownOpen && (
                <div
                  onMouseLeave={() => setCollectionsDropdownOpen(false)}
                  className="absolute top-full left-0 w-60 bg-[#151513] border border-[#C9A45C]/30 rounded-xl shadow-2xl py-2 mt-1 z-50 animate-in fade-in slide-in-from-top-1"
                >
                  <button
                    onClick={() => handleNav('wedding', { collection: 'Wedding Collection' })}
                    className="w-full text-left px-4 py-2.5 text-xs xl:text-sm text-[#F5F0E6] hover:bg-[#1C1C19] hover:text-[#C9A45C] transition-colors"
                  >
                    Wedding Collection
                  </button>
                  <button
                    onClick={() => handleNav('daily-wear', { collection: 'Daily Wear Collection' })}
                    className="w-full text-left px-4 py-2.5 text-xs xl:text-sm text-[#F5F0E6] hover:bg-[#1C1C19] hover:text-[#C9A45C] transition-colors"
                  >
                    Daily Wear Collection
                  </button>
                  <button
                    onClick={() => handleNav('womens', { collection: "Women's Collection" })}
                    className="w-full text-left px-4 py-2.5 text-xs xl:text-sm text-[#F5F0E6] hover:bg-[#1C1C19] hover:text-[#C9A45C] transition-colors"
                  >
                    Women’s Collection
                  </button>
                  <button
                    onClick={() => handleNav('mens', { collection: "Men's Collection" })}
                    className="w-full text-left px-4 py-2.5 text-xs xl:text-sm text-[#F5F0E6] hover:bg-[#1C1C19] hover:text-[#C9A45C] transition-colors"
                  >
                    Men’s Collection
                  </button>
                  <button
                    onClick={() => handleNav('kids', { collection: 'Kids Collection' })}
                    className="w-full text-left px-4 py-2.5 text-xs xl:text-sm text-[#F5F0E6] hover:bg-[#1C1C19] hover:text-[#C9A45C] transition-colors"
                  >
                    Kids Collection
                  </button>
                  <div className="border-t border-[#242420] my-1" />
                  <button
                    onClick={() => handleNav('gold-coins-bars', { collection: 'Gold Coins & Bars' })}
                    className="w-full text-left px-4 py-2.5 text-xs xl:text-sm text-[#F5F0E6] hover:bg-[#1C1C19] hover:text-[#C9A45C] transition-colors"
                  >
                    Gold Coins &amp; Bars
                  </button>
                  <button
                    onClick={() => handleNav('silver-coins-bars', { collection: 'Silver Coins & Bars' })}
                    className="w-full text-left px-4 py-2.5 text-xs xl:text-sm text-[#F5F0E6] hover:bg-[#1C1C19] hover:text-[#C9A45C] transition-colors"
                  >
                    Silver Coins &amp; Bars
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNav('rates')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer shrink-0 ${
                activePage === 'rates'
                  ? 'text-[#C9A45C] font-semibold bg-[#063B2E]/60 border border-[#C9A45C]/35'
                  : 'hover:text-[#C9A45C] hover:bg-[#151513]'
              }`}
            >
              Today's Rates
            </button>

            <button
              onClick={() => handleNav('custom')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer shrink-0 ${
                activePage === 'custom'
                  ? 'text-[#C9A45C] font-semibold bg-[#063B2E]/60 border border-[#C9A45C]/35'
                  : 'hover:text-[#C9A45C] hover:bg-[#151513]'
              }`}
            >
              Custom Jewellery
            </button>

            <button
              onClick={() => handleNav('repair-polishing')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer shrink-0 ${
                activePage === 'repair-polishing'
                  ? 'text-[#C9A45C] font-semibold bg-[#063B2E]/60 border border-[#C9A45C]/35'
                  : 'hover:text-[#C9A45C] hover:bg-[#151513]'
              }`}
            >
              Repair &amp; Polish
            </button>

            <button
              onClick={() => handleNav('gallery')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer shrink-0 ${
                activePage === 'gallery'
                  ? 'text-[#C9A45C] font-semibold bg-[#063B2E]/60 border border-[#C9A45C]/35'
                  : 'hover:text-[#C9A45C] hover:bg-[#151513]'
              }`}
            >
              Gallery
            </button>

            <button
              onClick={() => handleNav('about')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer shrink-0 ${
                activePage === 'about'
                  ? 'text-[#C9A45C] font-semibold bg-[#063B2E]/60 border border-[#C9A45C]/35'
                  : 'hover:text-[#C9A45C] hover:bg-[#151513]'
              }`}
            >
              About
            </button>

            <button
              onClick={() => handleNav('contact')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer shrink-0 ${
                activePage === 'contact' || activePage === 'visit'
                  ? 'text-[#C9A45C] font-semibold bg-[#063B2E]/60 border border-[#C9A45C]/35'
                  : 'hover:text-[#C9A45C] hover:bg-[#151513]'
              }`}
            >
              Visit Us
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B0B0A] border-b border-[#C9A45C]/25 px-4 pt-2 pb-6 space-y-3 shadow-2xl max-h-[80vh] overflow-y-auto">
          {/* Mobile Search Bar */}
          <div className="flex items-center bg-[#151513] border border-[#242420] rounded-lg px-3 py-2 mt-2">
            <Search className="w-4 h-4 text-[#A9A39A] mr-2" />
            <input
              type="text"
              placeholder="Search jewellery, category, ID..."
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (activePage === 'home') {
                  onNavigate('gold');
                }
              }}
              className="w-full text-sm bg-transparent outline-none text-[#F5F0E6] placeholder-[#A9A39A]"
            />
            {searchQuery && (
              <button onClick={() => onSearchChange('')}>
                <X className="w-4 h-4 text-[#A9A39A]" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => handleNav('home')}
              className={`text-left px-3 py-2.5 rounded-md text-sm ${
                activePage === 'home'
                  ? 'bg-[#063B2E] text-[#C9A45C] border border-[#C9A45C]/40 font-medium'
                  : 'bg-[#151513] text-[#F5F0E6] border border-[#242420]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('rates')}
              className={`text-left px-3 py-2.5 rounded-md text-sm ${
                activePage === 'rates'
                  ? 'bg-[#063B2E] text-[#C9A45C] border border-[#C9A45C]/40 font-medium'
                  : 'bg-[#151513] text-[#F5F0E6] border border-[#242420]'
              }`}
            >
              Today's Rates
            </button>
            <button
              onClick={() => handleNav('gold', { metal: 'Gold' })}
              className={`text-left px-3 py-2.5 rounded-md text-sm ${
                activePage === 'gold'
                  ? 'bg-[#063B2E] text-[#C9A45C] border border-[#C9A45C]/40 font-medium'
                  : 'bg-[#151513] text-[#F5F0E6] border border-[#242420]'
              }`}
            >
              Gold Jewellery
            </button>
            <button
              onClick={() => handleNav('silver', { metal: 'Silver' })}
              className={`text-left px-3 py-2.5 rounded-md text-sm ${
                activePage === 'silver'
                  ? 'bg-[#063B2E] text-[#C9A45C] border border-[#C9A45C]/40 font-medium'
                  : 'bg-[#151513] text-[#F5F0E6] border border-[#242420]'
              }`}
            >
              Silver Jewellery
            </button>
            <button
              onClick={() => handleNav('wedding', { collection: 'Wedding Collection' })}
              className="text-left px-3 py-2.5 rounded-md text-sm bg-[#151513] text-[#F5F0E6] border border-[#242420]"
            >
              Wedding Collection
            </button>
            <button
              onClick={() => handleNav('daily-wear', { collection: 'Daily Wear Collection' })}
              className="text-left px-3 py-2.5 rounded-md text-sm bg-[#151513] text-[#F5F0E6] border border-[#242420]"
            >
              Daily Wear
            </button>
            <button
              onClick={() => handleNav('womens', { collection: "Women's Collection" })}
              className="text-left px-3 py-2.5 rounded-md text-sm bg-[#151513] text-[#F5F0E6] border border-[#242420]"
            >
              Women's Collection
            </button>
            <button
              onClick={() => handleNav('mens', { collection: "Men's Collection" })}
              className="text-left px-3 py-2.5 rounded-md text-sm bg-[#151513] text-[#F5F0E6] border border-[#242420]"
            >
              Men's Collection
            </button>
            <button
              onClick={() => handleNav('kids', { collection: 'Kids Collection' })}
              className="text-left px-3 py-2.5 rounded-md text-sm bg-[#151513] text-[#F5F0E6] border border-[#242420]"
            >
              Kids Collection
            </button>
            <button
              onClick={() => handleNav('gold-coins-bars', { collection: 'Gold Coins & Bars' })}
              className="text-left px-3 py-2.5 rounded-md text-sm bg-[#151513] text-[#F5F0E6] border border-[#242420]"
            >
              Gold Coins &amp; Bars
            </button>
            <button
              onClick={() => handleNav('silver-coins-bars', { collection: 'Silver Coins & Bars' })}
              className="text-left px-3 py-2.5 rounded-md text-sm bg-[#151513] text-[#F5F0E6] border border-[#242420]"
            >
              Silver Coins &amp; Bars
            </button>
            <button
              onClick={() => handleNav('custom')}
              className="text-left px-3 py-2.5 rounded-md text-sm bg-[#151513] text-[#F5F0E6] border border-[#242420]"
            >
              Custom Jewellery
            </button>
            <button
              onClick={() => handleNav('repair-polishing')}
              className="text-left px-3 py-2.5 rounded-md text-sm bg-[#151513] text-[#F5F0E6] border border-[#242420]"
            >
              Repair &amp; Polish
            </button>
            <button
              onClick={() => handleNav('gallery')}
              className="text-left px-3 py-2.5 rounded-md text-sm bg-[#151513] text-[#F5F0E6] border border-[#242420]"
            >
              Gallery
            </button>
            <button
              onClick={() => handleNav('about')}
              className="text-left px-3 py-2.5 rounded-md text-sm bg-[#151513] text-[#F5F0E6] border border-[#242420]"
            >
              About Kundan Gold
            </button>
            <button
              onClick={() => handleNav('contact')}
              className="text-left px-3 py-2.5 rounded-md text-sm bg-[#151513] text-[#F5F0E6] border border-[#242420]"
            >
              Visit Us &amp; Contact
            </button>
          </div>

          <div className="pt-2 border-t border-[#242420]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookVisit();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#063B2E] text-[#F5F0E6] py-3 rounded-lg text-sm font-semibold border border-[#C9A45C]/40 hover:bg-[#084B3B]"
            >
              <Calendar className="w-4 h-4 text-[#C9A45C]" />
              <span>Book In-Store Visit (30 Mins)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
