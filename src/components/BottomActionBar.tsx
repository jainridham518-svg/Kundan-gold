import React from 'react';
import { Phone, MessageCircle, Navigation, Calendar } from 'lucide-react';
import { BUSINESS_INFO, getWhatsAppUrl } from '../data/businessInfo';

interface BottomActionBarProps {
  onOpenBookVisit: () => void;
}

export const BottomActionBar: React.FC<BottomActionBarProps> = ({ onOpenBookVisit }) => {
  const generalWhatsApp = getWhatsAppUrl(
    'Hello Kundan Gold, I would like to enquire about your jewellery collections.'
  );

  return (
    <aside aria-label="Quick contact toolbar" className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0B0B0A]/95 border-t border-[#C9A45C]/30 py-2.5 px-3 shadow-2xl backdrop-blur-md">
      <div className="max-w-md mx-auto grid grid-cols-4 gap-2 text-center text-[11px] font-medium text-[#F5F0E6]">
        {/* WhatsApp */}
        <a
          href={generalWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center min-h-[44px] py-1 rounded-md active:bg-[#151513] transition-colors text-[#25D366] hover:text-[#4ade80]"
          title="WhatsApp Kundan Gold"
        >
          <MessageCircle className="w-5 h-5 mb-1" />
          <span className="text-[#F5F0E6]">WhatsApp</span>
        </a>

        {/* Call */}
        <a
          href={`tel:${BUSINESS_INFO.phone}`}
          className="flex flex-col items-center justify-center min-h-[44px] py-1 rounded-md active:bg-[#151513] transition-colors text-[#C9A45C] hover:text-white"
          title="Call Shop"
        >
          <Phone className="w-5 h-5 mb-1" />
          <span className="text-[#F5F0E6]">Call Now</span>
        </a>

        {/* Directions */}
        <a
          href={BUSINESS_INFO.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center min-h-[44px] py-1 rounded-md active:bg-[#151513] transition-colors text-[#C9A45C] hover:text-white"
          title="Get Directions on Google Maps"
        >
          <Navigation className="w-5 h-5 mb-1" />
          <span className="text-[#F5F0E6]">Directions</span>
        </a>

        {/* Book Visit */}
        <button
          onClick={onOpenBookVisit}
          className="flex flex-col items-center justify-center min-h-[44px] py-1 rounded-md active:bg-[#151513] transition-colors text-[#F5F0E6] hover:text-[#C9A45C] cursor-pointer"
          title="Book In-Store Visit"
        >
          <Calendar className="w-5 h-5 mb-1 text-[#C9A45C]" />
          <span>Book Visit</span>
        </button>
      </div>
    </aside>
  );
};
