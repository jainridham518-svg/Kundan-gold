import React from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Navigation,
  Clock,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import { BUSINESS_INFO, getWhatsAppUrl, getStoreOpenStatus } from '../data/businessInfo';
import storefrontExteriorImg from '../assets/images/storefront_exterior_1792334522356.jpg';

interface VisitUsSectionProps {
  onOpenBookVisit: () => void;
}

export const VisitUsSection: React.FC<VisitUsSectionProps> = ({ onOpenBookVisit }) => {
  const generalWhatsApp = getWhatsAppUrl(
    'Hello Kundan Gold, I am planning to visit your shop in Kalyan West.'
  );
  const openStatus = getStoreOpenStatus();

  return (
    <section className="py-20 sm:py-24 bg-[#0B0B0A] border-b border-[#242420]" id="visit-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151513] border border-[#C9A45C]/30 text-xs font-medium text-[#C9A45C] tracking-wide shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C]" />
            <span>Store Location &amp; Hours</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-[#F5F0E6]">
            Visit Kundan Gold in Kalyan West
          </h2>
          <p className="text-sm text-[#A9A39A]">
            Experience our jewellery in person. Look for the illuminated maroon “कुंदन गोल्ड” signboard at Sai Chowk near Sai Sagar Hotel.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Address Card, Timings, Direct CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6 bg-[#151513] p-6 sm:p-8 rounded-2xl border border-[#C9A45C]/25 shadow-xl overflow-hidden">
            <div className="space-y-6">
              {/* Address Block */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0B0B0A] border border-[#242420] flex items-center justify-center text-[#C9A45C] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-[#F5F0E6]">
                      {BUSINESS_INFO.name}
                    </h3>
                    <p className="text-xs font-medium text-[#A9A39A] mb-2">
                      {BUSINESS_INFO.type}
                    </p>
                    <address className="not-italic text-sm text-[#E5DDD0] leading-relaxed">
                      {BUSINESS_INFO.address.shop},<br />
                      {BUSINESS_INFO.address.landmark},<br />
                      {BUSINESS_INFO.address.locality},<br />
                      {BUSINESS_INFO.address.state}, {BUSINESS_INFO.address.country}
                    </address>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap gap-2.5 pt-2">
                  <a
                    href={BUSINESS_INFO.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#063B2E] hover:bg-[#084B3B] text-[#F5F0E6] border border-[#C9A45C]/40 text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-xs"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#C9A45C]" />
                    <span>Get Directions</span>
                  </a>

                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="inline-flex items-center gap-1.5 bg-[#0B0B0A] hover:bg-[#1C1C19] text-[#F5F0E6] border border-[#242420] hover:border-[#C9A45C]/40 text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C9A45C]" />
                    <span>Call: {BUSINESS_INFO.phone}</span>
                  </a>

                  <a
                    href={generalWhatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#063B2E] hover:bg-[#084B3B] text-[#F5F0E6] border border-[#C9A45C]/40 text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Opening Hours Schedule - Tuesday to Sunday 10:00 AM - 9:00 PM, Monday Closed */}
              <div className="pt-6 border-t border-[#242420] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#C9A45C]" />
                    <h4 className="font-heading text-base font-semibold text-[#F5F0E6]">
                      Shop Opening Hours
                    </h4>
                  </div>
                  <span className={`text-xs px-2.5 py-0.5 rounded font-semibold border flex items-center gap-1.5 ${
                    openStatus.isOpen
                      ? 'bg-[#063B2E] text-[#25D366] border-[#25D366]/40'
                      : 'bg-[#151513] text-[#EF4444] border-red-800/40'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${openStatus.isOpen ? 'bg-[#25D366]' : 'bg-[#EF4444]'}`} />
                    <span>{openStatus.statusText}</span>
                  </span>
                </div>

                <div className="rounded-xl border border-[#242420] overflow-hidden divide-y divide-[#242420] text-xs sm:text-sm">
                  {/* Tuesday to Sunday */}
                  <div className="flex items-center justify-between p-3.5 bg-[#0B0B0A]">
                    <div>
                      <div className="font-medium text-[#F5F0E6]">Tuesday – Sunday</div>
                      <div className="text-[11px] text-[#A9A39A]">Showroom open for shopping &amp; consultation</div>
                    </div>
                    <div className="text-right font-semibold text-[#C9A45C] bg-[#151513] border border-[#C9A45C]/30 px-3 py-1.5 rounded-lg text-xs sm:text-sm">
                      10:00 AM – 9:00 PM
                    </div>
                  </div>

                  {/* Monday */}
                  <div className="flex items-center justify-between p-3.5 bg-[#151513]">
                    <div>
                      <div className="font-medium text-[#F5F0E6]">Monday</div>
                      <div className="text-[11px] text-[#A9A39A]">Weekly showroom holiday</div>
                    </div>
                    <div className="text-right font-semibold text-red-400 bg-[#0B0B0A] border border-red-900/30 px-3 py-1.5 rounded-lg text-xs sm:text-sm">
                      Closed
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Book In-Store Consultation Prompt */}
            <div className="pt-6 border-t border-[#242420] bg-[#0B0B0A] -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-6 sm:p-8 rounded-b-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="font-semibold text-xs text-[#F5F0E6]">
                  Want personalized time with our jewellery consultant?
                </div>
                <div className="text-[11px] text-[#A9A39A]">
                  Book a free 30-minute in-store trial and consultation slot.
                </div>
              </div>
              <button
                onClick={onOpenBookVisit}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#063B2E] hover:bg-[#084B3B] text-[#F5F0E6] border border-[#C9A45C]/40 text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors shrink-0 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>Book a Visit</span>
              </button>
            </div>
          </div>

          {/* Right Column: Actual Storefront Photograph & Interactive Map */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            {/* Actual Storefront Photograph Card */}
            <div className="bg-[#151513] rounded-2xl border border-[#C9A45C]/30 overflow-hidden shadow-xl">
              <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-[#0B0B0A] overflow-hidden group">
                <img
                  src={storefrontExteriorImg}
                  alt="Authentic Kundan Gold storefront in Kalyan West with maroon signboard and hallmark logos"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A]/40 via-transparent to-transparent pointer-events-none" />

                {/* Actual Storefront Badge */}
                <div className="absolute top-3 left-3 bg-[#063B2E]/90 backdrop-blur-xs border border-[#C9A45C]/40 text-[#F5F0E6] text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1.5 pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C]" />
                  <span>Actual Storefront Photograph</span>
                </div>
              </div>
            </div>

            {/* Embedded Interactive Map using OpenStreetMap centered exactly at coordinates */}
            <div className="bg-[#151513] rounded-2xl border border-[#242420] overflow-hidden shadow-xl flex flex-col flex-1 min-h-[260px]">
              <div className="p-3.5 bg-[#0B0B0A] border-b border-[#242420] flex items-center justify-between text-xs gap-2">
                <div className="flex items-center gap-2 text-[#A9A39A] font-medium min-w-0">
                  <MapPin className="w-4 h-4 text-[#C9A45C] shrink-0" />
                  <span className="text-[#F5F0E6] truncate">Kalyan West <span className="hidden sm:inline">• Coordinates: 19.2548107, 73.1397835</span></span>
                </div>
                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C9A45C] font-semibold hover:underline flex items-center gap-1 shrink-0"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="relative flex-1 min-h-[220px] bg-[#1a1a18]">
                <iframe
                  title="Kundan Gold Location Map"
                  width="100%"
                  height="100%"
                  className="w-full h-full border-0 min-h-[220px]"
                  loading="lazy"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=73.1327835%2C19.2498107%2C73.1467835%2C19.2598107&amp;layer=mapnik&amp;marker=${BUSINESS_INFO.coordinates.lat}%2C${BUSINESS_INFO.coordinates.lng}`}
                />

                {/* Floating Overlay Badge on Map */}
                <div className="absolute bottom-3 left-3 bg-[#151513]/95 backdrop-blur-sm border border-[#C9A45C]/30 rounded-xl p-2.5 shadow-md max-w-xs text-xs">
                  <div className="font-heading font-semibold text-[#F5F0E6] text-xs">
                    Kundan Gold (Shop No-7)
                  </div>
                  <div className="text-[10px] text-[#A9A39A]">
                    Sai Gaurav C-1, Near Sai Sagar Hotel, Sai Chowk
                  </div>
                  <a
                    href={BUSINESS_INFO.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-[#C9A45C] font-semibold text-[10px] hover:underline"
                  >
                    <Navigation className="w-2.5 h-2.5 text-[#C9A45C]" />
                    <span>Start Navigation Now</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
