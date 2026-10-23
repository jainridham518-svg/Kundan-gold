import React, { useMemo } from 'react';
import {
  Filter,
  Search,
  RotateCcw,
  Sparkles,
  SlidersHorizontal,
  Info,
} from 'lucide-react';
import { Product, ProductFilterState, CollectionType, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';
import { GOLD_CATEGORIES, SILVER_CATEGORIES, ALL_COLLECTIONS } from '../data/productsData';

interface CatalogueSectionProps {
  products: Product[];
  filterState: ProductFilterState;
  onFilterChange: (updates: Partial<ProductFilterState>) => void;
  onSelectProduct: (product: Product) => void;
  onOpenBookVisit: (product?: Product) => void;
  title?: string;
  subtitle?: string;
}

export const CatalogueSection: React.FC<CatalogueSectionProps> = ({
  products,
  filterState,
  onFilterChange,
  onSelectProduct,
  onOpenBookVisit,
  title = 'Jewellery Catalogue',
  subtitle = 'Hallmarked Gold & Silver Pieces • Handcrafted in Kalyan West',
}) => {
  // Filter logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Metal filter
        if (filterState.metal !== 'all' && p.metal !== filterState.metal) {
          return false;
        }

        // Category filter
        if (filterState.category && filterState.category !== 'All Categories') {
          if (p.category !== filterState.category) {
            return false;
          }
        }

        // Purity filter
        if (filterState.purity && filterState.purity !== 'All Purities') {
          if (p.purity !== filterState.purity) {
            return false;
          }
        }

        // Collection filter
        if (filterState.collection && filterState.collection !== 'All Collections') {
          if (!p.collections.includes(filterState.collection as CollectionType)) {
            return false;
          }
        }

        // Search Query (matches name, ID, category, description)
        if (filterState.searchQuery.trim()) {
          const q = filterState.searchQuery.toLowerCase().trim();
          const matchName = p.name.toLowerCase().includes(q);
          const matchId = p.id.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchPurity = p.purity.toLowerCase().includes(q);
          if (!matchName && !matchId && !matchCat && !matchDesc && !matchPurity) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (filterState.sortBy === 'weight-asc') {
          return a.weightInGrams - b.weightInGrams;
        }
        if (filterState.sortBy === 'weight-desc') {
          return b.weightInGrams - a.weightInGrams;
        }
        if (filterState.sortBy === 'name-asc') {
          return a.name.localeCompare(b.name);
        }
        return 0; // featured/default
      });
  }, [products, filterState]);

  const activeCategoryList = useMemo(() => {
    if (filterState.metal === 'Gold') {
      return ['All Categories', ...GOLD_CATEGORIES.slice(1)];
    }
    if (filterState.metal === 'Silver') {
      return ['All Categories', ...SILVER_CATEGORIES.slice(1)];
    }
    return [
      'All Categories',
      ...GOLD_CATEGORIES.slice(1),
      ...SILVER_CATEGORIES.slice(1),
    ];
  }, [filterState.metal]);

  const resetFilters = () => {
    onFilterChange({
      metal: 'all',
      category: '',
      purity: '',
      collection: '',
      searchQuery: '',
      sortBy: 'featured',
    });
  };

  const hasActiveFilters =
    filterState.metal !== 'all' ||
    Boolean(filterState.category) ||
    Boolean(filterState.purity) ||
    Boolean(filterState.collection) ||
    Boolean(filterState.searchQuery);

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#0B0B0A] border-b border-[#242420]" id="catalogue-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151513] border border-[#C9A45C]/30 text-xs font-medium text-[#C9A45C] tracking-wide shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C]" />
            <span>Kundan Gold Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-[#F5F0E6]">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-[#A9A39A] leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Illustrative Catalogue Notice */}
        <div className="mb-8 p-4 bg-[#151513] rounded-xl border border-[#C9A45C]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#A9A39A] shadow-xs gap-3">
          <div className="flex items-center gap-2.5">
            <Info className="w-4 h-4 text-[#C9A45C] shrink-0" />
            <span>
              <strong className="text-[#F5F0E6]">Illustrative Catalogue:</strong> Items shown represent design styles and craftsmanship. All pieces are custom-crafted or procured to your preferred weight, dimension, and hallmarked purity. Contact us for today's market-linked price.
            </span>
          </div>
          <button
            onClick={() => onOpenBookVisit()}
            className="text-xs font-semibold text-[#C9A45C] hover:text-[#DFBD79] underline shrink-0 cursor-pointer"
          >
            Visit Shop in Kalyan West &rarr;
          </button>
        </div>

        {/* Filter & Control Bar */}
        <div className="bg-[#151513] rounded-2xl border border-[#242420] p-4 sm:p-6 mb-8 shadow-md space-y-4">
          {/* Row 1: Metal Selector + Search Input */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Metal Filter Pills */}
            <div className="flex items-center gap-1.5 bg-[#0B0B0A] p-1.5 rounded-xl border border-[#242420] self-start">
              <button
                onClick={() => onFilterChange({ metal: 'all', category: '' })}
                className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  filterState.metal === 'all'
                    ? 'bg-[#063B2E] text-[#F5F0E6] border border-[#C9A45C]/40 shadow-xs'
                    : 'text-[#A9A39A] hover:text-[#F5F0E6]'
                }`}
              >
                All Metals
              </button>
              <button
                onClick={() => onFilterChange({ metal: 'Gold', category: '' })}
                className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  filterState.metal === 'Gold'
                    ? 'bg-[#063B2E] text-[#F5F0E6] border border-[#C9A45C]/40 shadow-xs'
                    : 'text-[#A9A39A] hover:text-[#F5F0E6]'
                }`}
              >
                Gold Jewellery
              </button>
              <button
                onClick={() => onFilterChange({ metal: 'Silver', category: '' })}
                className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  filterState.metal === 'Silver'
                    ? 'bg-[#063B2E] text-[#F5F0E6] border border-[#C9A45C]/40 shadow-xs'
                    : 'text-[#A9A39A] hover:text-[#F5F0E6]'
                }`}
              >
                Silver Jewellery
              </button>
            </div>

            {/* Search Input Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#A9A39A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by jewellery type, ID (e.g. KG-G-001)..."
                value={filterState.searchQuery}
                onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
                className="w-full bg-[#0B0B0A] border border-[#242420] rounded-xl pl-9.5 pr-4 py-2 text-xs sm:text-sm text-[#F5F0E6] placeholder:text-[#5E5B54] focus:outline-none focus:border-[#C9A45C]"
              />
              {filterState.searchQuery && (
                <button
                  onClick={() => onFilterChange({ searchQuery: '' })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#A9A39A] hover:text-[#F5F0E6]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Row 2: Category, Collection, Purity Dropdowns & Sort */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-[#242420]">
            {/* Category Select */}
            <div>
              <label className="block text-[11px] font-medium text-[#A9A39A] mb-1">
                Jewellery Type
              </label>
              <select
                value={filterState.category}
                onChange={(e) => onFilterChange({ category: e.target.value })}
                className="w-full text-xs bg-[#0B0B0A] border border-[#242420] rounded-lg px-2.5 py-2 text-[#F5F0E6] focus:outline-none focus:border-[#C9A45C]"
              >
                <option value="">All Categories</option>
                {activeCategoryList
                  .filter((cat) => cat !== 'All Categories')
                  .map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>
            </div>

            {/* Collection Select */}
            <div>
              <label className="block text-[11px] font-medium text-[#A9A39A] mb-1">
                Collection
              </label>
              <select
                value={filterState.collection}
                onChange={(e) => onFilterChange({ collection: e.target.value })}
                className="w-full text-xs bg-[#0B0B0A] border border-[#242420] rounded-lg px-2.5 py-2 text-[#F5F0E6] focus:outline-none focus:border-[#C9A45C]"
              >
                <option value="">All Collections</option>
                {ALL_COLLECTIONS.map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </div>

            {/* Purity Select */}
            <div>
              <label className="block text-[11px] font-medium text-[#A9A39A] mb-1">
                Purity
              </label>
              <select
                value={filterState.purity}
                onChange={(e) => onFilterChange({ purity: e.target.value })}
                className="w-full text-xs bg-[#0B0B0A] border border-[#242420] rounded-lg px-2.5 py-2 text-[#F5F0E6] focus:outline-none focus:border-[#C9A45C]"
              >
                <option value="">All Purities</option>
                <option value="24K">24K Pure Gold</option>
                <option value="22K">22K Hallmarked Gold</option>
                <option value="18K">18K Hallmarked Gold</option>
                <option value="999">999 Fine Silver</option>
                <option value="925">925 Sterling Silver</option>
              </select>
            </div>

            {/* Sort Select */}
            <div>
              <label className="block text-[11px] font-medium text-[#A9A39A] mb-1">
                Sort By
              </label>
              <select
                value={filterState.sortBy}
                onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
                className="w-full text-xs bg-[#0B0B0A] border border-[#242420] rounded-lg px-2.5 py-2 text-[#F5F0E6] focus:outline-none focus:border-[#C9A45C]"
              >
                <option value="featured">Recommended</option>
                <option value="weight-asc">Weight: Low to High</option>
                <option value="weight-desc">Weight: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips & Clear */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[#A9A39A]">Active filters:</span>
                {filterState.metal !== 'all' && (
                  <span className="inline-flex items-center gap-1 bg-[#0B0B0A] border border-[#C9A45C]/25 px-2 py-0.5 rounded text-[11px] font-medium text-[#C9A45C]">
                    Metal: {filterState.metal}
                  </span>
                )}
                {filterState.category && (
                  <span className="inline-flex items-center gap-1 bg-[#0B0B0A] border border-[#C9A45C]/25 px-2 py-0.5 rounded text-[11px] font-medium text-[#C9A45C]">
                    Category: {filterState.category}
                  </span>
                )}
                {filterState.collection && (
                  <span className="inline-flex items-center gap-1 bg-[#0B0B0A] border border-[#C9A45C]/25 px-2 py-0.5 rounded text-[11px] font-medium text-[#C9A45C]">
                    Collection: {filterState.collection}
                  </span>
                )}
                {filterState.purity && (
                  <span className="inline-flex items-center gap-1 bg-[#0B0B0A] border border-[#C9A45C]/25 px-2 py-0.5 rounded text-[11px] font-medium text-[#C9A45C]">
                    Purity: {filterState.purity}
                  </span>
                )}
                {filterState.searchQuery && (
                  <span className="inline-flex items-center gap-1 bg-[#0B0B0A] border border-[#C9A45C]/25 px-2 py-0.5 rounded text-[11px] font-medium text-[#C9A45C]">
                    "{filterState.searchQuery}"
                  </span>
                )}
              </div>

              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-xs text-[#C9A45C] hover:text-[#DFBD79] font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#A9A39A] mb-4 px-1">
          <span>
            Showing <strong className="text-[#F5F0E6]">{filteredProducts.length}</strong> jewellery designs
          </span>
          <span>Prices computed on day of purchase</span>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
                onOpenBookVisit={onOpenBookVisit}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-[#151513] rounded-2xl border border-[#242420] p-12 text-center max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#0B0B0A] border border-[#242420] flex items-center justify-center mx-auto text-[#C9A45C]">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-[#F5F0E6]">
              No jewellery pieces matched your filter
            </h3>
            <p className="text-xs text-[#A9A39A]">
              Try clearing specific filters or searching for terms like "Ring", "22K", "Chain", or "Bangles".
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 bg-[#063B2E] text-[#F5F0E6] border border-[#C9A45C]/40 text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer hover:bg-[#084B3B]"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
