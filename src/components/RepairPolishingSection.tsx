import React, { useState } from 'react';
import {
  Wrench,
  Sparkles,
  MessageCircle,
  Phone,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { getRepairPolishingWhatsAppUrl, BUSINESS_INFO } from '../data/businessInfo';

export const RepairPolishingSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState('Gold & Silver Polishing / Ultrasonic Clean');

  const handleEnquiry = (serviceName?: string) => {
    const s = serviceName || selectedService;
    const url = getRepairPolishingWhatsAppUrl(s);
    window.open(url, '_blank');
  };

  const services = [
    {
      title: 'Gold Jewellery Repair',
      description: 'Broken chain joint soldering, clasp repairs, mangalsutra wire tightening, and lock replacements.',
      tag: 'Gold Care',
    },
    {
      title: 'Gold Polishing & Ultrasonic Clean',
      description: 'Restores brilliant showroom lustre to faded or oxidized gold jewellery without loss of metal.',
      tag: 'Restoration',
    },
    {
      title: 'Silver Jewellery Repair',
      description: 'Payal link fixing, ghungroo reattachment, broken kada restoration, and toe ring adjustments.',
      tag: 'Silver Care',
    },
    {
      title: 'Silver Polishing & Anti-Tarnish Treatment',
      description: 'Professional cleaning and anti-tarnish polishing for silver ornaments, pooja thalis, and idols.',
      tag: 'Restoration',
    },
    {
      title: 'Ring Resizing & Stone Resetting',
      description: 'Tighten or expand ring bands to your exact finger measurement; secure loose precious stones.',
      tag: 'Fine Adjustment',
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#0B0B0A] border-b border-[#242420]" id="repair-polishing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151513] border border-[#C9A45C]/30 text-xs font-medium text-[#C9A45C] tracking-wide shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C]" />
            <span>Care &amp; Restoration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-[#F5F0E6]">
            Jewellery Repair &amp; Polishing Services
          </h2>
          <p className="text-sm sm:text-base text-[#A9A39A]">
            Trust your cherished gold and silver jewellery to careful hands. We offer prompt, transparent repair and cleaning services at our Kalyan West workshop.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {services.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#151513] rounded-xl border border-[#242420] hover:border-[#C9A45C]/40 p-6 space-y-3 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[#C9A45C] font-semibold tracking-wider uppercase text-[11px]">
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-[#F5F0E6]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#A9A39A] leading-relaxed mt-2">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#242420]">
                <button
                  onClick={() => handleEnquiry(item.title)}
                  className="w-full flex items-center justify-center gap-2 bg-[#0B0B0A] hover:bg-[#1C1C19] text-[#F5F0E6] border border-[#242420] hover:border-[#C9A45C]/40 text-xs font-semibold py-2.5 px-3 rounded-lg transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Enquire via WhatsApp</span>
                </button>
              </div>
            </div>
          ))}

          {/* Quick Shop Visit Card in Deep Emerald */}
          <div className="bg-[#063B2E] text-[#F5F0E6] rounded-xl border border-[#C9A45C]/40 p-6 flex flex-col justify-between shadow-md">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#C9A45C] uppercase tracking-wider mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C]" />
                <span>In-Store Inspection</span>
              </div>
              <h3 className="font-heading text-lg font-semibold text-[#F5F0E6]">
                Bring Your Piece to the Shop
              </h3>
              <p className="text-xs text-[#D9D1C3] leading-relaxed mt-2">
                Walk into Kundan Gold at Sai Gaurav C-1, Kalyan West for an on-the-spot inspection, honest feasibility assessment, and repair estimate.
              </p>
            </div>

            <div className="pt-4 space-y-2">
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="w-full flex items-center justify-center gap-2 bg-[#0B0B0A] text-[#F5F0E6] hover:bg-[#151513] text-xs font-semibold py-2.5 px-3 rounded-lg transition-colors border border-[#C9A45C]/50"
              >
                <Phone className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>Call Shop: {BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-[#151513] rounded-2xl border border-[#C9A45C]/25 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-heading text-xl font-semibold text-[#F5F0E6]">
              Have a repair or polishing requirement?
            </h4>
            <p className="text-xs text-[#A9A39A]">
              Share a photo of the damaged piece on WhatsApp for instant guidance and repair feasibility.
            </p>
          </div>

          <button
            onClick={() => handleEnquiry('General Repair / Polishing')}
            className="inline-flex items-center gap-2 bg-[#063B2E] hover:bg-[#084B3B] text-[#F5F0E6] border border-[#C9A45C]/40 px-6 py-3 rounded-xl text-sm font-semibold transition-colors shadow-sm shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>Repair / Polishing Enquiry</span>
          </button>
        </div>
      </div>
    </section>
  );
};
