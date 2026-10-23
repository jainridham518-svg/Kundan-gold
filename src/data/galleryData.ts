export interface GalleryItem {
  id: string;
  title: string;
  category: 'Gold' | 'Silver' | 'Shop & Showcase' | 'Craftsmanship';
  imageUrl: string;
  caption: string;
  isPlaceholder: boolean;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-storefront',
    title: 'Authentic Kundan Gold Storefront & Signboard',
    category: 'Shop & Showcase',
    imageUrl: '/IMG-20261018-WA0014.jpg',
    caption: 'Official storefront at Sai Chowk, Kalyan West displaying the illuminated maroon कुंदन गोल्ड signboard and BIS Hallmark certificate.',
    isPlaceholder: false,
  },
  {
    id: 'gal-showroom',
    title: 'Authentic Kundan Gold Showroom Interior',
    category: 'Shop & Showcase',
    imageUrl: '/IMG-20261018-WA0013.jpg',
    caption: 'Actual showroom interior at Sai Gaurav C-1, Shop No-7, Kalyan West featuring hallmarked jewellery display counters and consultation lounge.',
    isPlaceholder: false,
  },
  {
    id: 'gal-01',
    title: 'Handcrafted Bridal Gold Necklace Suite',
    category: 'Gold',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80',
    caption: 'Intricate 22K gold craftsmanship with traditional antique temple motif detailing.',
    isPlaceholder: true,
  },
  {
    id: 'gal-02',
    title: 'Traditional 925 Silver Payal & Bichiya Collection',
    category: 'Silver',
    imageUrl: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1200&q=80',
    caption: 'Hallmarked silver ornaments crafted for timeless grace and everyday durability.',
    isPlaceholder: true,
  },
  {
    id: 'gal-04',
    title: 'Pure 999 Silver Pooja Articles & Vati Set',
    category: 'Silver',
    imageUrl: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1200&q=80',
    caption: 'Sacred silverware and handcrafted pooja utensils for festive family traditions.',
    isPlaceholder: true,
  },
  {
    id: 'gal-05',
    title: 'Bespoke Gold Setting & Polishing Bench',
    category: 'Craftsmanship',
    imageUrl: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1200&q=80',
    caption: 'Precision repair, stone resetting, and high-shine ultrasonic polishing services.',
    isPlaceholder: true,
  },
  {
    id: 'gal-06',
    title: 'Classic 22K Gold Bangle Array',
    category: 'Gold',
    imageUrl: 'https://images.unsplash.com/photo-1611591475825-9614459b3ce5?auto=format&fit=crop&w=1200&q=80',
    caption: 'Precision diamond-cut and filigree kada bangles crafted in hallmarked 916 gold.',
    isPlaceholder: true,
  },
  {
    id: 'gal-07',
    title: 'Assayed 24K Gold & 999 Silver Coins',
    category: 'Gold',
    imageUrl: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1200&q=80',
    caption: 'Sealed tamper-proof pure investment coins and bullion bars.',
    isPlaceholder: true,
  },
];
