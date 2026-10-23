import React, { useState } from 'react';
import { Sparkles, Maximize2, X, Info } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/galleryData';

export const GallerySection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const filterTabs = ['All', 'Gold', 'Silver', 'Shop & Showcase', 'Craftsmanship'];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (selectedFilter === 'All') return true;
    return item.category === selectedFilter;
  });

  return (
    <section className="py-20 sm:py-24 bg-[#0B0B0A] border-b border-[#242420]" id="gallery-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151513] border border-[#C9A45C]/30 text-xs font-medium text-[#C9A45C] tracking-wide shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C]" />
            <span>Visual Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-[#F5F0E6]">
            Kundan Gold Gallery
          </h2>
          <p className="text-sm sm:text-base text-[#A9A39A]">
            A curated look at our gold designs, silver articles, craftsmanship bench, and store showcase.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedFilter(tab)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedFilter === tab
                  ? 'bg-[#063B2E] text-[#F5F0E6] border border-[#C9A45C]/40 shadow-xs'
                  : 'bg-[#151513] text-[#A9A39A] hover:text-[#F5F0E6] border border-[#242420] hover:border-[#C9A45C]/30'
              }`}
            >
              {tab === 'All' ? 'All Gallery Photos' : tab}
            </button>
          ))}
        </div>

        {/* Informational authentic showcase notice */}
        <div className="mb-6 p-3 bg-[#151513] rounded-lg border border-[#C9A45C]/25 text-xs text-[#A9A39A] flex items-center gap-2 max-w-2xl mx-auto">
          <Sparkles className="w-4 h-4 text-[#C9A45C] shrink-0" />
          <span>
            Featuring authentic photographs of <strong className="text-[#F5F0E6]">Kundan Gold showroom &amp; storefront</strong> in Kalyan West, alongside curated hallmarked gold &amp; silver craftsmanship.
          </span>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxItem(item)}
              className="group relative bg-[#151513] rounded-xl overflow-hidden border border-[#242420] hover:border-[#C9A45C]/40 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <div className="aspect-[4/3] sm:aspect-square overflow-hidden bg-[#0B0B0A] relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2 rounded-full bg-[#151513]/90 text-[#C9A45C] border border-[#C9A45C]/40">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>

                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="bg-[#063B2E]/90 text-[#F5F0E6] text-[10px] font-medium px-2 py-0.5 rounded backdrop-blur-xs border border-[#C9A45C]/30">
                    {item.category}
                  </span>
                  {!item.isPlaceholder && (
                    <span className="bg-[#C9A45C] text-[#0B0B0A] text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs uppercase">
                      Authentic
                    </span>
                  )}
                </div>
              </div>

              <div className="p-3.5">
                <h4 className="font-heading text-sm font-semibold text-[#F5F0E6] line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-[11px] text-[#A9A39A] line-clamp-2 mt-1">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveLightboxItem(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-[#151513] rounded-2xl overflow-hidden shadow-2xl border border-[#C9A45C]/30"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightboxItem(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-[#0B0B0A]/80 hover:bg-[#0B0B0A] text-[#F5F0E6] border border-[#242420] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[16/10] bg-black">
              <img
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.title}
                className="w-full h-full object-contain"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-5 bg-[#151513]">
              <span className="text-xs font-semibold text-[#C9A45C] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C]" />
                <span>{activeLightboxItem.category}</span>
              </span>
              <h3 className="font-heading text-xl font-semibold text-[#F5F0E6] mt-0.5">
                {activeLightboxItem.title}
              </h3>
              <p className="text-sm text-[#A9A39A] mt-1.5">
                {activeLightboxItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
