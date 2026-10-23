import React from 'react';
import {
  ShieldCheck,
  Gem,
  ArrowRight,
  MessageCircle,
  Calendar,
  Clock,
  MapPin,
  Wrench,
  CheckCircle2,
} from 'lucide-react';
import { BUSINESS_INFO, getWhatsAppUrl, getStoreOpenStatus } from '../data/businessInfo';
import { ActivePage } from '../types';

// Hero Showcase Image - Replace this URL with the client's actual jewellery or showroom photograph when available
const HERO_IMAGE_URL =
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80';

interface HeroProps {
  onNavigate: (page: ActivePage, options?: { collection?: string; category?: string; metal?: 'all' | 'Gold' | 'Silver' }) => void;
  onOpenBookVisit: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenBookVisit }) => {
  const whatsappUrl = getWhatsAppUrl(
    'Hello Kundan Gold, I would like to explore your jewellery collection and inquire about today’s rates.'
  );

  return (
    <section className="relative overflow-hidden bg-[#0B0B0A] border-b border-[#C9A45C]/20 py-8 sm:py-10 lg:py-11 xl:py-12">
      {/* Subtle ambient lighting tone */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,59,46,0.18),rgba(11,11,10,0))] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          {/* Left Column: Headline, Value Proposition, CTAs */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
            {/* Top Subtitle Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151513] border border-[#C9A45C]/25 text-[#A9A39A] text-xs font-medium tracking-wide shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C]" />
              <span>Family-Owned Jewellery Shop in Kalyan West</span>
            </div>

            {/* Main Headline - Spacious & Premium */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-[3.1rem] font-heading font-semibold text-[#F5F0E6] tracking-tight leading-[1.14]">
                PURE CRAFTSMANSHIP. <br />
                <span className="text-[#C9A45C] font-serif italic">Timeless Trust.</span>
              </h1>
              <p className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-[#A9A39A]">
                Kundan Gold • Sai Chowk, Kalyan West
              </p>
            </div>

            {/* Factual Hero Paragraph */}
            <p className="text-sm sm:text-base text-[#A9A39A] max-w-2xl leading-relaxed">
              Kundan Gold is a family-owned jewellery shop in Kalyan West offering hallmarked gold and silver jewellery, custom jewellery, and repair and polishing services. Discover traditional craftsmanship with a modern selection for everyday wear, weddings, gifting and special occasions.
            </p>

            {/* Factual Shop Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-0.5">
              <div className="p-3 bg-[#151513] rounded-xl border border-[#C9A45C]/20 hover:border-[#C9A45C]/40 transition-colors shadow-xs">
                <ShieldCheck className="w-4.5 h-4.5 text-[#C9A45C] mb-1" />
                <div className="text-xs font-semibold text-[#F5F0E6]">Hallmarked</div>
                <div className="text-[11px] text-[#A9A39A]">18K, 22K, 24K &amp; 925/999</div>
              </div>
              <div className="p-3 bg-[#151513] rounded-xl border border-[#C9A45C]/20 hover:border-[#C9A45C]/40 transition-colors shadow-xs">
                <Gem className="w-4.5 h-4.5 text-[#C9A45C] mb-1" />
                <div className="text-xs font-semibold text-[#F5F0E6]">Custom Craft</div>
                <div className="text-[11px] text-[#A9A39A]">Bespoke Jewellery</div>
              </div>
              <div className="p-3 bg-[#151513] rounded-xl border border-[#C9A45C]/20 hover:border-[#C9A45C]/40 transition-colors shadow-xs">
                <Wrench className="w-4.5 h-4.5 text-[#C9A45C] mb-1" />
                <div className="text-xs font-semibold text-[#F5F0E6]">Repair &amp; Polish</div>
                <div className="text-[11px] text-[#A9A39A]">In-Store Services</div>
              </div>
              <div className="p-3 bg-[#151513] rounded-xl border border-[#C9A45C]/20 hover:border-[#C9A45C]/40 transition-colors shadow-xs">
                <MapPin className="w-4.5 h-4.5 text-[#C9A45C] mb-1" />
                <div className="text-xs font-semibold text-[#F5F0E6]">Kalyan West</div>
                <div className="text-[11px] text-[#A9A39A]">Sai Chowk, Shop No-7</div>
              </div>
            </div>

            {/* Primary & Secondary Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {/* 1. Explore Jewellery - Deep Emerald with Champagne Gold Border */}
              <button
                onClick={() => onNavigate('gold')}
                className="inline-flex items-center justify-center gap-2 bg-[#063B2E] hover:bg-[#084B3B] text-[#F5F0E6] border border-[#C9A45C]/40 hover:border-[#C9A45C] px-5 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-md cursor-pointer"
              >
                <span>Explore Jewellery</span>
                <ArrowRight className="w-4 h-4 text-[#C9A45C]" />
              </button>

              {/* 2. WhatsApp - Deep Emerald with gold accent & ivory text */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#063B2E] hover:bg-[#084B3B] text-[#F5F0E6] border border-[#C9A45C]/40 hover:border-[#C9A45C] px-4.5 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>

              {/* 3. Book a Visit - Deep Charcoal with Champagne Gold border */}
              <button
                onClick={onOpenBookVisit}
                className="inline-flex items-center justify-center gap-2 bg-[#151513] hover:bg-[#1C1C19] text-[#F5F0E6] border border-[#C9A45C]/35 hover:border-[#C9A45C] px-4.5 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs"
              >
                <Calendar className="w-4 h-4 text-[#C9A45C]" />
                <span>Book a Visit</span>
              </button>
            </div>

            {/* Transparent Note */}
            <div className="pt-1 text-xs text-[#A9A39A] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C9A45C] shrink-0" />
              <span>
                Catalogue showroom — Visit our Kalyan West shop or consult directly via WhatsApp.
              </span>
            </div>
          </div>

          {/* Right Column: Visual Feature Showcase */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Card with curated imagery */}
              <div className="relative rounded-2xl overflow-hidden border border-[#C9A45C]/30 shadow-2xl bg-[#151513] p-2 sm:p-2.5">
                <div className="aspect-[4/3] max-h-[320px] sm:max-h-[360px] relative overflow-hidden rounded-xl bg-[#0B0B0A]">
                  {/* Real photograph easily replaced via HERO_IMAGE_URL constant */}
                  <img
                    src={HERO_IMAGE_URL}
                    alt="Handcrafted gold jewellery and traditional ornaments at Kundan Gold in Kalyan West"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 opacity-90"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A] via-[#0B0B0A]/40 to-transparent" />
                  
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-[#F5F0E6]">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#C9A45C] text-[#0B0B0A] mb-1 tracking-wide">
                      Kundan Gold Collection
                    </span>
                    <h3 className="font-heading text-base sm:text-lg font-semibold text-[#F5F0E6]">
                      Hallmarked Ornaments
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#A9A39A]">
                      Rings, Necklaces, Bangles, Payal &amp; Custom Orders
                    </p>
                  </div>
                </div>

                {/* Quick Store Info Strip */}
                <div className="p-3 sm:p-3.5 bg-[#151513] space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#A9A39A] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C9A45C]" />
                      <span>Sai Gaurav C-1, Kalyan West</span>
                    </span>
                    <span className="text-[#F5F0E6] font-semibold">Shop No-7</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#A9A39A] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C9A45C]" />
                      <span>Tue–Sun: 10:00 AM – 9:00 PM</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-[#C9A45C] font-semibold bg-[#151513] border border-[#C9A45C]/30 px-2 py-0.5 rounded text-[10px]">
                      <span className={`w-1.5 h-1.5 rounded-full ${getStoreOpenStatus().isOpen ? 'bg-[#25D366]' : 'bg-[#EF4444]'}`} />
                      <span>{getStoreOpenStatus().statusText}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Informative side accent pill - Safely positioned within column */}
              <div className="hidden sm:block absolute -bottom-3 -left-2 sm:-left-3 bg-[#151513] text-[#F5F0E6] p-2.5 sm:p-3 rounded-xl border border-[#C9A45C]/40 shadow-xl text-xs z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#063B2E] flex items-center justify-center text-[#C9A45C] font-serif font-bold text-xs sm:text-sm border border-[#C9A45C]/40">
                    ₹
                  </div>
                  <div>
                    <div className="text-[10px] text-[#A9A39A]">Daily Benchmark Rates</div>
                    <div className="font-semibold text-[#F5F0E6] text-[11px] sm:text-xs">24K, 22K, 18K &amp; 999 Silver</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
