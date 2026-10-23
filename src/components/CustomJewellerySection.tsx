import React, { useState } from 'react';
import { Sparkles, MessageCircle, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { getCustomJewelleryWhatsAppUrl, BUSINESS_INFO } from '../data/businessInfo';

export const CustomJewellerySection: React.FC = () => {
  const [customRequirement, setCustomRequirement] = useState('');

  const handleCustomWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const url = getCustomJewelleryWhatsAppUrl(customRequirement);
    window.open(url, '_blank');
  };

  return (
    <section className="py-20 sm:py-24 bg-[#0B0B0A] border-y border-[#242420]" id="custom-jewellery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Craft Story & Steps */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151513] border border-[#C9A45C]/30 text-xs font-medium text-[#C9A45C] tracking-wide shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C]" />
              <span>Bespoke Artisanship</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-[#F5F0E6] leading-tight">
              Bespoke Custom Jewellery Crafted For You
            </h2>

            <p className="text-base text-[#A9A39A] leading-relaxed">
              Have a special design, heirloom recreation, or bridal vision in mind? At Kundan Gold in Kalyan West, our karigars work closely with you to sculpt custom gold and silver ornaments crafted to your exact design, weight budget, and hallmarked purity.
            </p>

            {/* Step-by-Step Flow */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-[#151513] rounded-xl border border-[#242420] space-y-2">
                <div className="w-7 h-7 rounded-full bg-[#063B2E] text-[#C9A45C] flex items-center justify-center text-xs font-bold font-mono border border-[#C9A45C]/40">
                  1
                </div>
                <div className="font-semibold text-sm text-[#F5F0E6]">Share Reference</div>
                <p className="text-xs text-[#A9A39A]">
                  Send a photo, sketch, or design idea via WhatsApp or bring it to our shop.
                </p>
              </div>

              <div className="p-4 bg-[#151513] rounded-xl border border-[#242420] space-y-2">
                <div className="w-7 h-7 rounded-full bg-[#063B2E] text-[#C9A45C] flex items-center justify-center text-xs font-bold font-mono border border-[#C9A45C]/40">
                  2
                </div>
                <div className="font-semibold text-sm text-[#F5F0E6]">Select Metal &amp; Weight</div>
                <p className="text-xs text-[#A9A39A]">
                  Choose 18K, 22K, or 24K Gold, or 925/999 Silver based on your exact preference.
                </p>
              </div>

              <div className="p-4 bg-[#151513] rounded-xl border border-[#242420] space-y-2">
                <div className="w-7 h-7 rounded-full bg-[#063B2E] text-[#C9A45C] flex items-center justify-center text-xs font-bold font-mono border border-[#C9A45C]/40">
                  3
                </div>
                <div className="font-semibold text-sm text-[#F5F0E6]">Trial &amp; Delivery</div>
                <p className="text-xs text-[#A9A39A]">
                  Handcrafted with precision, hallmarked, and delivered with full transparency.
                </p>
              </div>
            </div>

            {/* Guarantees */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#E5DDD0] pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C9A45C]" />
                <span>Govt-Recognized Hallmarking</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#C9A45C]" />
                <span>Zero Compromise on Purity</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#C9A45C]" />
                <span>Fair, Affordable Making Charges</span>
              </span>
            </div>
          </div>

          {/* Right Column: Clean, Focused WhatsApp Enquiry Box */}
          <div className="lg:col-span-5">
            <div className="bg-[#151513] rounded-2xl border border-[#C9A45C]/25 p-6 sm:p-8 shadow-xl">
              <h3 className="font-heading text-xl font-semibold text-[#F5F0E6] mb-2">
                Request Custom Jewellery
              </h3>
              <p className="text-xs text-[#A9A39A] mb-6">
                Tell us what you'd like to craft. We will connect with you immediately on WhatsApp to discuss specifications and quotes.
              </p>

              <form onSubmit={handleCustomWhatsApp} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#F5F0E6] mb-1.5">
                    What would you like to make? (Optional)
                  </label>
                  <textarea
                    rows={4}
                    value={customRequirement}
                    onChange={(e) => setCustomRequirement(e.target.value)}
                    placeholder="e.g. A 22K gold floral mangalsutra with 15 grams weight budget, or a 925 sterling silver antique kada..."
                    className="w-full text-xs sm:text-sm bg-[#0B0B0A] border border-[#242420] rounded-xl p-3 text-[#F5F0E6] placeholder:text-[#5E5B54] focus:outline-none focus:border-[#C9A45C]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#063B2E] hover:bg-[#084B3B] text-[#F5F0E6] border border-[#C9A45C]/40 py-3 px-4 rounded-xl font-semibold text-sm transition-colors shadow-sm cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Request Custom Jewellery via WhatsApp</span>
                </button>
              </form>

              <div className="mt-4 pt-4 border-t border-[#242420] text-center text-xs text-[#A9A39A]">
                <span>Prefer a phone conversation? Call us at </span>
                <a href={`tel:${BUSINESS_INFO.phone}`} className="font-semibold text-[#C9A45C] hover:underline">
                  {BUSINESS_INFO.displayPhone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
