import React from 'react';
import { MessageCircle, Phone, ArrowUpRight, Scale, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { BUSINESS_INFO, getProductPriceWhatsAppUrl } from '../data/businessInfo';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onOpenBookVisit: (product?: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onOpenBookVisit,
}) => {
  const whatsappUrl = getProductPriceWhatsAppUrl(product.name, product.id);

  return (
    <div
      id={`product-card-${product.id}`}
      className="group bg-[#151513] rounded-xl border border-[#C9A45C]/20 hover:border-[#C9A45C]/50 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative"
    >
      <div>
        {/* Image Container with Zoom & Badge */}
        <div
          onClick={() => onSelectProduct(product)}
          className="relative aspect-square overflow-hidden bg-[#0B0B0A] cursor-pointer border-b border-[#242420]"
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
            loading="lazy"
          />

          {/* Product ID Badge */}
          <div className="absolute top-2.5 left-2.5 bg-[#0B0B0A]/90 backdrop-blur-xs text-[#F5F0E6] text-[11px] font-mono font-medium px-2 py-0.5 rounded border border-[#C9A45C]/35 shadow-xs">
            {product.id}
          </div>

          {/* Metal & Purity Pill */}
          <div className="absolute top-2.5 right-2.5 bg-[#151513]/90 backdrop-blur-xs text-[#C9A45C] text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs border border-[#C9A45C]/30">
            {product.purity} {product.metal}
          </div>

          {/* Illustrative Design Tag */}
          <div className="absolute bottom-2.5 left-2.5 bg-[#0B0B0A]/90 backdrop-blur-xs text-[#DFBD79] text-[10px] font-medium px-2 py-0.5 rounded border border-[#C9A45C]/30 shadow-xs flex items-center gap-1 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C]" />
            <span>Illustrative Design</span>
          </div>

          {/* Hover View overlay */}
          <div className="absolute inset-0 bg-[#0B0B0A]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="bg-[#151513] text-[#F5F0E6] text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1 border border-[#C9A45C]/50">
              View Details <ArrowUpRight className="w-3.5 h-3.5 text-[#C9A45C]" />
            </span>
          </div>
        </div>

        {/* Product Details Content */}
        <div className="p-4 space-y-2.5">
          {/* Category & Weight in clean sans-serif */}
          <div className="flex items-center justify-between text-xs text-[#A9A39A] gap-2">
            <span className="font-semibold text-[#C9A45C] truncate tracking-wide uppercase text-[11px]">{product.category}</span>
            <span className="text-[11px] text-[#E5DDD0] truncate max-w-[55%] text-right font-medium">
              {product.weight}
            </span>
          </div>

          {/* Product Title in Serif Heading */}
          <h3
            onClick={() => onSelectProduct(product)}
            className="font-heading text-base font-semibold text-[#F5F0E6] line-clamp-1 hover:text-[#C9A45C] transition-colors cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Size if available */}
          {product.size && (
            <div className="text-[11px] text-[#A9A39A] bg-[#0B0B0A] px-2 py-0.5 rounded inline-block border border-[#242420]">
              {product.size}
            </div>
          )}

          {/* Price status notice */}
          <div className="pt-2 border-t border-[#242420]">
            <div className="text-xs font-medium text-[#A9A39A]">
              Price: <span className="text-[#C9A45C] font-semibold">Contact for today's price</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 pt-0 space-y-2">
        {/* Primary CTA: Clear "Request Current Price" in Deep Emerald with Ivory text and Champagne Gold accent */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-[#063B2E] hover:bg-[#084B3B] text-[#F5F0E6] border border-[#C9A45C]/40 hover:border-[#C9A45C] text-xs font-semibold py-2.5 px-3 rounded-lg transition-colors shadow-xs"
          title="Request price on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
          <span>Request Current Price</span>
        </a>

        {/* Secondary Actions: Deep charcoal background with subtle gold borders */}
        <div className="grid grid-cols-2 gap-2">
          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="flex items-center justify-center gap-1.5 bg-[#0B0B0A] hover:bg-[#1C1C19] text-[#F5F0E6] border border-[#242420] hover:border-[#C9A45C]/40 text-[11px] font-semibold py-1.5 px-2 rounded-lg transition-colors"
            title="Call Kundan Gold"
          >
            <Phone className="w-3 h-3 text-[#C9A45C]" />
            <span>Call Shop</span>
          </a>

          <button
            onClick={() => onSelectProduct(product)}
            className="flex items-center justify-center gap-1 bg-[#0B0B0A] hover:bg-[#1C1C19] text-[#F5F0E6] border border-[#242420] hover:border-[#C9A45C]/40 text-[11px] font-semibold py-1.5 px-2 rounded-lg transition-colors cursor-pointer"
          >
            <span>Details</span>
            <ArrowUpRight className="w-3 h-3 text-[#C9A45C]" />
          </button>
        </div>
      </div>
    </div>
  );
};
