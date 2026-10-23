import { Product } from '../types';

/**
 * Kundan Gold - Illustrative Jewellery Catalogue
 * 
 * NOTE: All items in this catalogue represent illustrative design styles.
 * Kundan Gold custom-crafts and procures pieces to order according to each customer's
 * preferred dimensions, weight, and hallmarked purities (18K, 22K 916, 24K 999, 925 Silver).
 * Prices are calculated dynamically based on today's bullion market rate.
 */

export const PRODUCTS: Product[] = [
  // 1. GOLD RINGS
  {
    id: 'KG-G-RING-01',
    name: 'Classic Handcrafted Gold Band Ring',
    metal: 'Gold',
    category: 'Gold Rings',
    purity: '22K',
    weight: 'Crafted to required weight',
    weightInGrams: 5,
    size: 'Customizable sizes (Indian 8–24)',
    description:
      'Handcrafted hallmarked gold band featuring subtle micro-engraved borders and a radiant mirror polish. Crafted to order in your preferred size, width, and thickness.',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
    ],
    collections: ["Women's Collection", "Men's Collection", 'Daily Wear Collection'],
    isPlaceholder: true,
  },

  // 2. GOLD NECKLACES
  {
    id: 'KG-G-NECK-02',
    name: 'Traditional Floral Motif Gold Choker Necklace',
    metal: 'Gold',
    category: 'Gold Necklaces',
    purity: '22K',
    weight: 'Custom weight according to budget & design',
    weightInGrams: 30,
    size: 'Adjustable zari dori fitting',
    description:
      'Traditional 22K (916) hallmarked gold choker necklace showcasing classic floral and filigree motifs. Suitable for weddings, family occasions, and auspicious festivals.',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80',
    ],
    collections: ["Women's Collection", 'Wedding Collection'],
    isPlaceholder: true,
  },

  // 3. GOLD EARRINGS
  {
    id: 'KG-G-EAR-03',
    name: 'Handcrafted Traditional Gold Jhumka Earrings',
    metal: 'Gold',
    category: 'Gold Earrings',
    purity: '22K',
    weight: 'Crafted to preferred weight',
    weightInGrams: 12,
    size: 'Standard dangle length (customizable)',
    description:
      'Intricate 22K gold jhumka earrings featuring floral stud elements, bell-shaped drop pendants, and delicate gold bead hangings. Designed with secure screw-back posts.',
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
    ],
    collections: ["Women's Collection", 'Wedding Collection'],
    isPlaceholder: true,
  },

  // 4. GOLD BANGLES
  {
    id: 'KG-G-BANG-04',
    name: 'Traditional Handcrafted Gold Kada Bangles',
    metal: 'Gold',
    category: 'Gold Bangles',
    purity: '22K',
    weight: 'Single or pair crafted to order',
    weightInGrams: 25,
    size: 'Available in sizes 2.2, 2.4, 2.6, 2.8',
    description:
      'Traditional 22K hallmarked gold bangles with diamond-cut surface faceting and smooth inner edges for comfortable everyday and festive wear.',
    images: [
      'https://images.unsplash.com/photo-1611591475825-9614459b3ce5?auto=format&fit=crop&w=1000&q=80',
    ],
    collections: ["Women's Collection", 'Wedding Collection', 'Daily Wear Collection'],
    isPlaceholder: true,
  },

  // 5. GOLD CHAINS
  {
    id: 'KG-G-CHAIN-05',
    name: 'Classic Solid Gold Link Chain',
    metal: 'Gold',
    category: 'Gold Chains',
    purity: '22K',
    weight: 'Available in multiple gauges & weights',
    weightInGrams: 18,
    size: 'Lengths 18 to 26 inches with sturdy clasp',
    description:
      'Timeless 22K hallmarked gold chain with interlocking polished links and a robust clasp mechanism for secure daily wear and pendant pairings.',
    images: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=80',
    ],
    collections: ["Men's Collection", "Women's Collection", 'Daily Wear Collection'],
    isPlaceholder: true,
  },

  // 6. GOLD MANGALSUTRA
  {
    id: 'KG-G-MANG-06',
    name: 'Auspicious Gold & Black Bead Mangalsutra',
    metal: 'Gold',
    category: 'Gold Mangalsutra',
    purity: '22K',
    weight: 'Crafted to preferred length & weight',
    weightInGrams: 15,
    size: 'Lengths 16 to 24 inches available',
    description:
      'Sacred traditional 22K gold mangalsutra featuring classic dual-wati or contemporary floral gold pendant strung on black and gold beads with hallmarked purity assurance.',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
    ],
    collections: ["Women's Collection", 'Wedding Collection', 'Daily Wear Collection'],
    isPlaceholder: true,
  },

  // 7. GOLD COINS
  {
    id: 'KG-G-COIN-07',
    name: 'Pure 24K (999) Laxmi Ganesh Gold Coin',
    metal: 'Gold',
    category: 'Gold Coins',
    purity: '24K',
    weight: 'Available in 1g, 2g, 5g, 8g, 10g denominations',
    weightInGrams: 5,
    size: 'Tamper-evident sealed blister pack',
    description:
      'Fine 24 Karat (999 purity) gold minted coin embossed with auspicious Goddess Laxmi and Lord Ganesh emblems. Ideal for Dhanteras, Diwali, Akshaya Tritiya, and gifting.',
    images: [
      'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1000&q=80',
    ],
    collections: ['Gold Coins & Bars', 'Daily Wear Collection'],
    isPlaceholder: true,
  },

  // 8. SILVER RINGS
  {
    id: 'KG-S-RING-08',
    name: 'Sterling 925 Silver Engraved Band Ring',
    metal: 'Silver',
    category: 'Silver Rings',
    purity: '925',
    weight: 'Crafted on order in custom sizes',
    weightInGrams: 4,
    size: 'All standard ring sizes available',
    description:
      'Refined 925 sterling silver ring featuring a high-lustre anti-tarnish finish with clean handcrafted geometric line engraving. Suitable for both men and women.',
    images: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80',
    ],
    collections: ["Men's Collection", "Women's Collection", 'Daily Wear Collection'],
    isPlaceholder: true,
  },

  // 9. SILVER PAYAL (ANKLETS)
  {
    id: 'KG-S-PAYAL-09',
    name: 'Traditional 925 Silver Payal (Anklet Pair)',
    metal: 'Silver',
    category: 'Silver Anklets / Payal',
    purity: '925',
    weight: 'Available in light, medium & bridal gauges',
    weightInGrams: 40,
    size: 'Standard length 10–11 inches with S-clasp',
    description:
      'Pair of traditional 925 sterling silver payals featuring delicate intertwined chain work, subtle chiming ghungroo accents, and smooth finish for daily comfort.',
    images: [
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1000&q=80',
    ],
    collections: ["Women's Collection", 'Wedding Collection', 'Daily Wear Collection'],
    isPlaceholder: true,
  },

  // 10. SILVER BICHIYA (TOE RINGS)
  {
    id: 'KG-S-BICH-10',
    name: 'Traditional Handcrafted Silver Bichiya (Toe Ring Pair)',
    metal: 'Silver',
    category: 'Silver Toe Rings / Bichiya',
    purity: '925',
    weight: 'Pair crafted in pure sterling silver',
    weightInGrams: 6,
    size: 'Adjustable free-size band',
    description:
      'Handmade 925 sterling silver toe rings (bichiya) with traditional embossed floral motif detailing and a smooth adjustable band designed for daily comfort.',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
    ],
    collections: ["Women's Collection", 'Wedding Collection', 'Daily Wear Collection'],
    isPlaceholder: true,
  },

  // 11. SILVER POOJA ITEMS
  {
    id: 'KG-S-POOJA-11',
    name: 'Pure 999 Silver Pooja Diya & Bell Set',
    metal: 'Silver',
    category: 'Silver Pooja Items',
    purity: '999',
    weight: 'Made to order in required weight',
    weightInGrams: 65,
    size: 'Pooja altar size',
    description:
      'Sacred pure silver diya and ghanti (bell) set crafted in auspicious 999 silver with detailed carving for daily family prayers and festive ceremonies.',
    images: [
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1000&q=80',
    ],
    collections: ['Wedding Collection'],
    isPlaceholder: true,
  },

  // 12. SILVER COINS
  {
    id: 'KG-S-COIN-12',
    name: 'Fine 999 Pure Silver Auspicious Coin',
    metal: 'Silver',
    category: 'Silver Coins',
    purity: '999',
    weight: 'Available in 10g, 20g, 50g, 100g denominations',
    weightInGrams: 20,
    size: 'Sealed protective presentation capsule',
    description:
      'Certified 999 fine silver bullion coin embossed with traditional motifs and auspicious blessings. Popular for shagun, gifting, and festive occasions.',
    images: [
      'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1000&q=80',
    ],
    collections: ['Silver Coins & Bars', 'Daily Wear Collection'],
    isPlaceholder: true,
  },
];

export const GOLD_CATEGORIES = [
  'All Gold',
  'Gold Rings',
  'Gold Chains',
  'Gold Necklaces',
  'Gold Earrings',
  'Gold Bangles',
  'Gold Bracelets',
  'Gold Pendants',
  'Gold Mangalsutra',
  'Gold Nose Rings',
  'Gold Coins',
  'Gold Bars',
  'Gold Idols / Articles',
];

export const SILVER_CATEGORIES = [
  'All Silver',
  'Silver Rings',
  'Silver Chains',
  'Silver Necklaces',
  'Silver Earrings',
  'Silver Bangles',
  'Silver Bracelets',
  'Silver Anklets / Payal',
  'Silver Toe Rings / Bichiya',
  'Silver Coins',
  'Silver Bars',
  'Silver Idols',
  'Silver Utensils / Articles',
  'Silver Pooja Items',
  'Silver Gifts',
  'Silver Ornaments for Children',
];

export const ALL_COLLECTIONS = [
  "Women's Collection",
  "Men's Collection",
  'Kids Collection',
  'Wedding Collection',
  'Daily Wear Collection',
  'Gold Coins & Bars',
  'Silver Coins & Bars',
];
