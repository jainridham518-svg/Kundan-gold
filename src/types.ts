export type MetalType = 'Gold' | 'Silver';

export type GoldPurity = '18K' | '22K' | '24K';
export type SilverPurity = '999' | '925';
export type PurityType = GoldPurity | SilverPurity;

export type GoldCategory =
  | 'Gold Rings'
  | 'Gold Chains'
  | 'Gold Necklaces'
  | 'Gold Earrings'
  | 'Gold Bangles'
  | 'Gold Bracelets'
  | 'Gold Pendants'
  | 'Gold Mangalsutra'
  | 'Gold Nose Rings'
  | 'Gold Coins'
  | 'Gold Bars'
  | 'Gold Idols / Articles';

export type SilverCategory =
  | 'Silver Rings'
  | 'Silver Chains'
  | 'Silver Necklaces'
  | 'Silver Earrings'
  | 'Silver Bangles'
  | 'Silver Bracelets'
  | 'Silver Anklets / Payal'
  | 'Silver Toe Rings / Bichiya'
  | 'Silver Coins'
  | 'Silver Bars'
  | 'Silver Idols'
  | 'Silver Utensils / Articles'
  | 'Silver Pooja Items'
  | 'Silver Gifts'
  | 'Silver Ornaments for Children';

export type ProductCategory = GoldCategory | SilverCategory;

export type CollectionType =
  | "Men's Collection"
  | "Women's Collection"
  | 'Kids Collection'
  | 'Wedding Collection'
  | 'Daily Wear Collection'
  | 'Gold Coins & Bars'
  | 'Silver Coins & Bars';

export interface Product {
  id: string; // e.g. "KG-G-001", "KG-S-001"
  name: string;
  metal: MetalType;
  category: ProductCategory;
  purity: PurityType;
  weight: string; // e.g. "14.50 g"
  weightInGrams: number;
  size?: string; // e.g. "Size 14", "2.4 Bangle", "18 Inches"
  description: string;
  images: string[];
  collections: CollectionType[];
  isPlaceholder: boolean; // Demo showcase placeholder tag
}

export interface MetalRateItem {
  purity: string;
  name: string;
  perGram: number | null;
  per10Gram?: number | null;
  perKg?: number | null;
}

export interface TodayRatesData {
  lastUpdated: string; // Saved timestamp from record (e.g. "18 Oct 2026, 10:30 AM IST")
  rateStatus: 'manually-maintained' | 'unverified';
  sourceNote: string;
  gold: {
    k24: MetalRateItem;
    k22: MetalRateItem;
    k18: MetalRateItem;
  };
  silver: {
    fine999: MetalRateItem;
    sterling925: MetalRateItem;
  };
  disclaimer: string;
}

export interface BookVisitForm {
  name: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  interest?: string;
  notes?: string;
}

export interface ProductFilterState {
  metal: 'all' | 'Gold' | 'Silver';
  category: string;
  purity: string;
  collection: string;
  searchQuery: string;
  sortBy: 'featured' | 'weight-asc' | 'weight-desc' | 'name-asc';
}

export type ActivePage =
  | 'home'
  | 'gold'
  | 'silver'
  | 'gold-coins-bars'
  | 'silver-coins-bars'
  | 'mens'
  | 'womens'
  | 'kids'
  | 'wedding'
  | 'daily-wear'
  | 'custom'
  | 'repair-polishing'
  | 'rates'
  | 'about'
  | 'gallery'
  | 'contact'
  | 'visit';
