import React from 'react';
import { ShieldCheck, Gem, Users, Scale, CheckCircle2, MapPin, Clock } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';
import showroomInteriorImg from '../assets/images/showroom_interior_1792334522828.jpg';

export const AboutSection: React.FC = () => {

  return (
    <section className="py-20 sm:py-24 bg-[#0B0B0A] border-b border-[#242420]" id="about-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Authentic Brand Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151513] border border-[#C9A45C]/30 text-xs font-medium text-[#C9A45C] tracking-wide shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C]" />
              <span>Family-Owned Jewellery Shop</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-[#F5F0E6] leading-tight">
              About Kundan Gold
            </h2>

            <div className="space-y-4 text-[#A9A39A] text-base leading-relaxed">
              <p>
                <strong className="text-[#F5F0E6]">Kundan Gold</strong> is a family-owned jewellery shop situated in Kalyan West, Maharashtra. We serve the local community with hallmarked gold and silver jewellery, custom craftsmanship, and clear, transparent pricing.
              </p>
              <p>
                Whether you are selecting a gold mangalsutra, gifting silver articles for an occasion, purchasing hallmarked coins, or commissioning a bespoke piece, we assist every visitor with personal attention and complete transparency.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#151513] rounded-xl border border-[#242420] space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#F5F0E6]">
                  <ShieldCheck className="w-4 h-4 text-[#C9A45C]" />
                  <span>Quality Assurance</span>
                </div>
                <p className="text-xs text-[#A9A39A]">
                  Every gold ornament is strictly hallmarked (18K, 22K, 24K) and silver is certified 925/999.
                </p>
              </div>

              <div className="p-4 bg-[#151513] rounded-xl border border-[#242420] space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#F5F0E6]">
                  <Users className="w-4 h-4 text-[#C9A45C]" />
                  <span>Trust &amp; Transparency</span>
                </div>
                <p className="text-xs text-[#A9A39A]">
                  Direct, transparent weight and purity accounting with no hidden markups or misleading promotions.
                </p>
              </div>

              <div className="p-4 bg-[#151513] rounded-xl border border-[#242420] space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#F5F0E6]">
                  <Gem className="w-4 h-4 text-[#C9A45C]" />
                  <span>Traditional Craftsmanship</span>
                </div>
                <p className="text-xs text-[#A9A39A]">
                  Intricate filigree, temple motifs, and modern lightweight jewellery sculpted by seasoned karigars.
                </p>
              </div>

              <div className="p-4 bg-[#151513] rounded-xl border border-[#242420] space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#F5F0E6]">
                  <Scale className="w-4 h-4 text-[#C9A45C]" />
                  <span>Affordable Jewellery</span>
                </div>
                <p className="text-xs text-[#A9A39A]">
                  Fair making charges designed to make authentic hallmarked precious jewellery accessible to all families.
                </p>
              </div>
            </div>

            {/* Shop location & hours tags */}
            <div className="space-y-2 pt-2 text-xs font-medium text-[#A9A39A]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C9A45C] shrink-0" />
                <span>
                  Located at Sai Gaurav C-1, Shop No-7, Near Sai Sagar Hotel, Sai Chowk, Kalyan West
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C9A45C] shrink-0" />
                <span>
                  Showroom Timings: <strong className="text-[#F5F0E6]">Tuesday – Sunday: 10:00 AM – 9:00 PM</strong> • <strong className="text-red-400">Monday: Closed</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Actual Showroom Interior Photograph & At-A-Glance Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#151513] rounded-2xl border border-[#C9A45C]/30 overflow-hidden shadow-2xl">
              {/* Showroom Photo Container */}
              <div className="relative aspect-[16/9] bg-[#0B0B0A] overflow-hidden group">
                <img
                  src={showroomInteriorImg}
                  alt="Authentic Kundan Gold showroom interior in Kalyan West"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A]/50 via-transparent to-transparent pointer-events-none" />

                {/* Actual Photograph Badge */}
                <div className="absolute top-3 left-3 bg-[#063B2E]/90 backdrop-blur-xs border border-[#C9A45C]/40 text-[#F5F0E6] text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1.5 pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C]" />
                  <span>Actual Showroom Interior</span>
                </div>
              </div>

              {/* Offerings list below photo */}
              <div className="p-6 sm:p-7 space-y-5">
                <div className="border-b border-[#242420] pb-4">
                  <div className="font-semibold text-xs text-[#C9A45C] uppercase tracking-wider mb-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C]" />
                    <span>In-Store Experience</span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-[#F5F0E6]">
                    What Kundan Gold Offers
                  </h3>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-[#E5DDD0]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#F5F0E6]">Hallmarked Gold:</strong> 18K, 22K (916), &amp; 24K pure gold rings, chains, necklaces, and bangles.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#F5F0E6]">Pure Silver Ornaments:</strong> 925 sterling silver payal, bichiya, 999 coins, pooja thalis, &amp; idols.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#F5F0E6]">Custom Crafting:</strong> Bespoke bridal sets tailored to your exact budget, weight, and vision.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#F5F0E6]">Repair &amp; Care:</strong> Expert soldering, resizing, ultrasonic shine restoration, and polishing.
                    </span>
                  </li>
                </ul>

                <div className="pt-3 border-t border-[#242420] text-xs text-[#A9A39A] italic">
                  “Built on genuine craftsmanship, honesty, and enduring community trust.”
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
