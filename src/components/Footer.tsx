import React from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Navigation,
  ArrowUp,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { BUSINESS_INFO, getWhatsAppUrl } from '../data/businessInfo';
import { ActivePage } from '../types';

interface FooterProps {
  onNavigate: (page: ActivePage, options?: { collection?: string; category?: string; metal?: 'all' | 'Gold' | 'Silver' }) => void;
  onOpenBookVisit: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBookVisit }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generalWhatsApp = getWhatsAppUrl(
    'Hello Kundan Gold, I would like to inquire about your jewellery and rates.'
  );

  return (
    <footer className="bg-[#0B0B0A] text-[#F5F0E6] pt-16 pb-24 lg:pb-12 border-t border-[#242420]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#242420]">
          {/* Brand & Identity Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#063B2E] flex items-center justify-center text-[#C9A45C] font-serif font-bold border border-[#C9A45C]/40">
                K
              </span>
              <span className="font-heading text-2xl tracking-wider text-[#F5F0E6] font-semibold">
                KUNDAN <span className="text-[#C9A45C]">GOLD</span>
              </span>
            </div>
            <p className="text-xs text-[#A9A39A] tracking-wider uppercase">
              Hallmarked Gold &amp; Silver Jewellery • Kalyan West
            </p>

            <p className="text-xs text-[#A9A39A] leading-relaxed max-w-sm">
              A family-owned jewellery shop serving Kalyan West, Maharashtra. Focused on quality, trust, traditional craftsmanship, and affordable precious jewellery.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={generalWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#063B2E] hover:bg-[#084B3B] text-[#F5F0E6] border border-[#C9A45C]/40 text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="inline-flex items-center gap-1.5 bg-[#151513] hover:bg-[#1C1C19] text-[#F5F0E6] border border-[#242420] hover:border-[#C9A45C]/40 text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>Call Shop</span>
              </a>
            </div>
          </div>

          {/* Quick Links Column 1: Gold & Silver Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading text-sm font-semibold text-[#C9A45C] tracking-wider uppercase">
              Jewellery Catalogue
            </h4>
            <ul className="space-y-2 text-xs text-[#A9A39A]">
              <li>
                <button
                  onClick={() => onNavigate('gold', { metal: 'Gold' })}
                  className="hover:text-[#F5F0E6] transition-colors cursor-pointer"
                >
                  Gold Jewellery (18K, 22K, 24K)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('silver', { metal: 'Silver' })}
                  className="hover:text-[#F5F0E6] transition-colors cursor-pointer"
                >
                  Silver Jewellery (925 Sterling &amp; 999)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gold-coins-bars', { collection: 'Gold Coins & Bars' })}
                  className="hover:text-[#F5F0E6] transition-colors cursor-pointer"
                >
                  Gold Coins &amp; Bars
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('silver-coins-bars', { collection: 'Silver Coins & Bars' })}
                  className="hover:text-[#F5F0E6] transition-colors cursor-pointer"
                >
                  Silver Coins &amp; Bullion Bars
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('rates')}
                  className="hover:text-[#F5F0E6] transition-colors cursor-pointer text-[#C9A45C] font-medium"
                >
                  Today's Gold &amp; Silver Rates Board
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 2: Collections & Services */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading text-sm font-semibold text-[#C9A45C] tracking-wider uppercase">
              Collections &amp; Care
            </h4>
            <ul className="space-y-2 text-xs text-[#A9A39A]">
              <li>
                <button
                  onClick={() => onNavigate('wedding', { collection: 'Wedding Collection' })}
                  className="hover:text-[#F5F0E6] transition-colors cursor-pointer"
                >
                  Wedding Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('daily-wear', { collection: 'Daily Wear Collection' })}
                  className="hover:text-[#F5F0E6] transition-colors cursor-pointer"
                >
                  Daily Wear Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('womens', { collection: "Women's Collection" })}
                  className="hover:text-[#F5F0E6] transition-colors cursor-pointer"
                >
                  Women's Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('mens', { collection: "Men's Collection" })}
                  className="hover:text-[#F5F0E6] transition-colors cursor-pointer"
                >
                  Men's Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('kids', { collection: 'Kids Collection' })}
                  className="hover:text-[#F5F0E6] transition-colors cursor-pointer"
                >
                  Kids Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('custom')}
                  className="hover:text-[#F5F0E6] transition-colors cursor-pointer"
                >
                  Custom Jewellery Crafting
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('repair-polishing')}
                  className="hover:text-[#F5F0E6] transition-colors cursor-pointer"
                >
                  Repair &amp; Polishing
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 3: Store Contact & Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading text-sm font-semibold text-[#C9A45C] tracking-wider uppercase">
              Store Information
            </h4>
            <div className="space-y-2 text-xs text-[#A9A39A]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                <span className="text-[#E5DDD0]">
                  {BUSINESS_INFO.address.shop}, {BUSINESS_INFO.address.landmark}, {BUSINESS_INFO.address.locality} - 421301
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C9A45C] shrink-0" />
                <span className="text-[#E5DDD0]">{BUSINESS_INFO.phone}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[#E5DDD0]">Tue–Sun: 10:00 AM – 9:00 PM</div>
                  <div className="text-red-400 font-medium">Monday: Closed</div>
                </div>
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenBookVisit}
                  className="inline-flex items-center gap-1.5 text-xs text-[#C9A45C] hover:text-[#F5F0E6] transition-colors underline cursor-pointer"
                >
                  Book 30-min In-Store Visit &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Disclaimer & Transparency Strip */}
        <div className="py-6 border-b border-[#242420] text-[11px] text-[#A9A39A] space-y-2">
          <p>
            <strong className="text-[#F5F0E6]">Pricing Disclaimer:</strong> {BUSINESS_INFO.pricingDisclaimer}
          </p>
          <p>
            <strong className="text-[#F5F0E6]">Catalogue Notice:</strong> Kundan Gold operates as a showroom catalogue and customer enquiry service in Kalyan West. We do not support online checkout or card transactions over this website. Please consult directly in-store or through WhatsApp for verified orders and pricing.
          </p>
        </div>

        {/* Bottom Legal & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A756D]">
          <div>
            &copy; {new Date().getFullYear()} Kundan Gold. Kalyan West, Maharashtra. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#A9A39A] hover:text-[#C9A45C] transition-colors cursor-pointer"
            title="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
