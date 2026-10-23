import React, { useState } from 'react';
import {
  X,
  MessageCircle,
  Phone,
  Calendar,
  ShieldCheck,
  Scale,
  Sparkles,
  AlertCircle,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Info,
} from 'lucide-react';
import { Product } from '../types';
import { BUSINESS_INFO, getProductPriceWhatsAppUrl } from '../data/businessInfo';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenBookVisit: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenBookVisit,
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const whatsappUrl = getProductPriceWhatsAppUrl(product.name, product.id);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
    >
      <div className="relative w-full max-w-4xl bg-[#151513] rounded-2xl border border-[#C9A45C]/30 shadow-2xl overflow-hidden my-6">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#0B0B0A]/90 hover:bg-[#1C1C19] border border-[#242420] flex items-center justify-center text-[#F5F0E6] transition-colors shadow-xs"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image Gallery & Lightbox */}
          <div className="md:col-span-6 p-6 bg-[#0B0B0A] border-r border-[#242420] flex flex-col justify-between">
            <div>
              {/* Main Image with Zoom Toggle */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-[#151513] border border-[#242420] shadow-inner mb-4">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                />

                {/* Lightbox toggle icon */}
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="absolute bottom-3 right-3 p-2 rounded-lg bg-[#151513]/90 hover:bg-[#1C1C19] text-[#F5F0E6] text-xs backdrop-blur-xs transition-colors flex items-center gap-1 border border-[#C9A45C]/40"
                  title={isZoomed ? 'Zoom out' : 'Zoom in'}
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#C9A45C]" />
                  <span>{isZoomed ? 'Normal' : 'Zoom'}</span>
                </button>

                {/* Image navigation arrows if multiple images */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === 0 ? product.images.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0B0B0A]/90 hover:bg-[#1C1C19] text-[#F5F0E6] flex items-center justify-center shadow-md transition-colors border border-[#242420]"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === product.images.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0B0B0A]/90 hover:bg-[#1C1C19] text-[#F5F0E6] flex items-center justify-center shadow-md transition-colors border border-[#242420]"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails list */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveImageIndex(idx);
                        setIsZoomed(false);
                      }}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#C9A45C] shadow-sm ring-2 ring-[#C9A45C]/40'
                          : 'border-[#242420] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Client Showcase Demo Notice */}
            <div className="mt-4 p-3 bg-[#151513] rounded-lg border border-[#242420] text-[11px] text-[#A9A39A] flex items-start gap-2">
              <Info className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[#F5F0E6]">Illustrative Catalogue Design:</strong> This piece represents an illustrative design style. Kundan Gold custom-crafts and procures pieces according to your preferred weight, dimensions, and certified hallmarked purity. Current pricing is calculated dynamically upon enquiry.
              </span>
            </div>
          </div>

          {/* Right Column: Product Specifications & Enquiry Actions */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#151513]">
            <div className="space-y-4">
              {/* Product ID & Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-semibold px-2.5 py-1 bg-[#063B2E] text-[#F5F0E6] rounded-md border border-[#C9A45C]/40">
                  Product ID: {product.id}
                </span>
                <span className="text-xs font-medium px-2.5 py-1 bg-[#0B0B0A] text-[#C9A45C] border border-[#C9A45C]/30 rounded-md">
                  {product.purity} {product.metal}
                </span>
                <span className="text-xs text-[#A9A39A] px-2 py-1 bg-[#0B0B0A] border border-[#242420] rounded-md">
                  {product.category}
                </span>
                <span className="text-[11px] font-medium px-2 py-1 bg-[#151513] text-[#DFBD79] border border-[#C9A45C]/30 rounded-md">
                  Illustrative Design
                </span>
              </div>

              {/* Product Title */}
              <h2 id="product-modal-title" className="font-heading text-2xl sm:text-3xl font-semibold text-[#F5F0E6] leading-snug">
                {product.name}
              </h2>

              {/* Price Status Banner */}
              <div className="p-4 rounded-xl bg-[#0B0B0A] border border-[#C9A45C]/25 flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#A9A39A]">Current Pricing</div>
                  <div className="text-lg font-bold text-[#C9A45C]">
                    Contact for today's price
                  </div>
                </div>
                <div className="text-right text-[11px] text-[#A9A39A]">
                  Calculated dynamically by <br />
                  weight &amp; daily bullion rate
                </div>
              </div>

              {/* Specifications Table */}
              <div className="border border-[#242420] rounded-xl overflow-hidden divide-y divide-[#242420] text-xs sm:text-sm">
                <div className="grid grid-cols-2 p-3 bg-[#0B0B0A]">
                  <span className="text-[#A9A39A] font-medium">Metal Type</span>
                  <span className="text-[#F5F0E6] font-semibold">{product.metal}</span>
                </div>
                <div className="grid grid-cols-2 p-3 bg-[#151513]">
                  <span className="text-[#A9A39A] font-medium">Purity Standard</span>
                  <span className="text-[#F5F0E6] font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C9A45C]" />
                    {product.purity} {product.metal === 'Gold' ? 'Hallmarked' : 'Pure'}
                  </span>
                </div>
                <div className="grid grid-cols-2 p-3 bg-[#0B0B0A]">
                  <span className="text-[#A9A39A] font-medium">Weight Options</span>
                  <span className="text-[#F5F0E6] font-medium flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-[#C9A45C]" />
                    {product.weight}
                  </span>
                </div>
                {product.size && (
                  <div className="grid grid-cols-2 p-3 bg-[#151513]">
                    <span className="text-[#A9A39A] font-medium">Size / Dimensions</span>
                    <span className="text-[#F5F0E6] font-medium">{product.size}</span>
                  </div>
                )}
                <div className="grid grid-cols-2 p-3 bg-[#0B0B0A]">
                  <span className="text-[#A9A39A] font-medium">Collections</span>
                  <span className="text-[#F5F0E6]">{product.collections.join(', ')}</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A9A39A]">
                  Description
                </h4>
                <p className="text-sm text-[#E5DDD0] leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Pricing Disclaimer */}
              <div className="p-3 bg-[#0B0B0A] border border-[#242420] rounded-lg text-xs text-[#A9A39A] flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                <p className="leading-tight">
                  <strong className="text-[#F5F0E6]">Pricing Disclaimer:</strong> {BUSINESS_INFO.pricingDisclaimer}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-[#242420]">
              {/* Primary Emerald Button with WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#063B2E] hover:bg-[#084B3B] text-[#F5F0E6] border border-[#C9A45C]/40 py-3 px-4 rounded-lg font-semibold text-sm transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Request Current Price via WhatsApp</span>
              </a>

              <div className="grid grid-cols-2 gap-3">
                {/* Secondary Call Now */}
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="flex items-center justify-center gap-2 bg-[#0B0B0A] hover:bg-[#1C1C19] text-[#F5F0E6] border border-[#242420] hover:border-[#C9A45C]/40 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#C9A45C]" />
                  <span>Call {BUSINESS_INFO.phone}</span>
                </a>

                {/* Secondary Book Visit */}
                <button
                  onClick={() => {
                    onClose();
                    onOpenBookVisit(product);
                  }}
                  className="flex items-center justify-center gap-2 bg-[#0B0B0A] hover:bg-[#1C1C19] text-[#F5F0E6] border border-[#242420] hover:border-[#C9A45C]/40 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#C9A45C]" />
                  <span>Book Visit to View</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
