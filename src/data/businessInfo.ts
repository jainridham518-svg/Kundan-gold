export const BUSINESS_INFO = {
  name: 'Kundan Gold',
  tagline: 'Hallmarked Gold & Silver Jewellery',
  subtitle: 'Quality • Trust • Traditional Craftsmanship • Affordable Jewellery',
  type: 'Family-owned jewellery shop',
  phone: '8097151843',
  displayPhone: '+91 80971 51843',
  whatsappNumber: '8097151843',
  intlPhone: '+918097151843',
  
  address: {
    shop: 'Sai Gaurav C-1, Shop No-7',
    landmark: 'Near Sai Sagar Hotel, Sai Chowk',
    locality: 'Kalyan West, Kalyan',
    postalCode: '421301',
    state: 'Maharashtra',
    country: 'India',
    full: 'Sai Gaurav C-1, Shop No-7, Near Sai Sagar Hotel, Sai Chowk, Kalyan West, Kalyan - 421301, Maharashtra, India',
  },

  coordinates: {
    lat: 19.2548107,
    lng: 73.1397835,
  },

  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=19.2548107,73.1397835',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=19.2548107,73.1397835',

  openingHours: {
    monday: 'Closed',
    tuesdayToSunday: '10:00 AM – 9:00 PM',
    summary: 'Tue–Sun: 10:00 AM – 9:00 PM (Monday: Closed)',
    schedule: [
      { day: 'Monday', hours: 'Closed', isClosed: true },
      { day: 'Tuesday', hours: '10:00 AM – 9:00 PM', isClosed: false },
      { day: 'Wednesday', hours: '10:00 AM – 9:00 PM', isClosed: false },
      { day: 'Thursday', hours: '10:00 AM – 9:00 PM', isClosed: false },
      { day: 'Friday', hours: '10:00 AM – 9:00 PM', isClosed: false },
      { day: 'Saturday', hours: '10:00 AM – 9:00 PM', isClosed: false },
      { day: 'Sunday', hours: '10:00 AM – 9:00 PM', isClosed: false },
    ],
  },

  consultation: {
    serviceName: 'Jewellery Consultation / In-Store Visit',
    duration: '30 minutes',
    location: 'Kundan Gold, Kalyan West',
  },

  pricingDisclaimer:
    "Prices shown are indicative. Final price depends on the current metal rate, product weight, making charges, taxes and other applicable charges. Please contact Kundan Gold for the latest price.",

  goldPurities: ['24K', '22K', '18K'] as const,
  silverPurities: ['999', '925'] as const,
};

/**
 * Clean helper to open WhatsApp with pre-filled encoded text
 */
export function getWhatsAppUrl(message: string): string {
  const cleanNumber = BUSINESS_INFO.whatsappNumber.replace(/\D/g, '');
  // Format international number with 91 for India if not already present
  const fullNumber = cleanNumber.startsWith('91') ? cleanNumber : `91${cleanNumber}`;
  return `https://wa.me/${fullNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Message template: Product Price Enquiry
 */
export function getProductPriceWhatsAppUrl(productName: string, productId: string): string {
  const msg = `Hello Kundan Gold, I'm interested in ${productName} (Product ID: ${productId}). Please share today's price and details.`;
  return getWhatsAppUrl(msg);
}

/**
 * Message template: Book a Visit
 */
export function getBookVisitWhatsAppUrl(details: {
  name: string;
  phone: string;
  date: string;
  time: string;
  interest?: string;
}): string {
  let msg = `Hello Kundan Gold, I would like to book a jewellery consultation/in-store visit.\n\nName: ${details.name}\nPhone: ${details.phone}\nPreferred date: ${details.date}\nPreferred time: ${details.time}`;
  if (details.interest) {
    msg += `\nLooking for: ${details.interest}`;
  }
  return getWhatsAppUrl(msg);
}

/**
 * Message template: Custom Jewellery Enquiry
 */
export function getCustomJewelleryWhatsAppUrl(notes?: string): string {
  let msg = `Hello Kundan Gold, I would like to enquire about custom jewellery services.`;
  if (notes && notes.trim()) {
    msg += `\n\nDetails: ${notes.trim()}`;
  }
  return getWhatsAppUrl(msg);
}

/**
 * Message template: Repair & Polishing Enquiry
 */
export function getRepairPolishingWhatsAppUrl(serviceType?: string): string {
  let msg = `Hello Kundan Gold, I would like to enquire about jewellery repair / polishing services.`;
  if (serviceType) {
    msg += `\n\nService: ${serviceType}`;
  }
  return getWhatsAppUrl(msg);
}

export interface StoreOpenStatus {
  isOpen: boolean;
  statusText: string;
  detailText: string;
}

/**
 * Returns accurate open/closed status in Kalyan, Maharashtra, India (Asia/Kolkata timezone)
 * Monday: Closed
 * Tuesday to Sunday: 10:00 AM – 9:00 PM IST
 */
export function getStoreOpenStatus(now = new Date()): StoreOpenStatus {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });

    const parts = formatter.formatToParts(now);
    const weekday = parts.find((p) => p.type === 'weekday')?.value || '';
    const hour = parseInt(parts.find((p) => p.type === 'hour')?.value || '0', 10);
    const minute = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);
    const currentMinutes = hour * 60 + minute;

    // Monday: Closed all day
    if (weekday === 'Monday') {
      return {
        isOpen: false,
        statusText: 'Closed Today (Monday)',
        detailText: 'Opens Tuesday at 10:00 AM IST',
      };
    }

    // Tuesday to Sunday: 10:00 AM to 9:00 PM (21:00)
    const openMinutes = 10 * 60; // 10:00 AM
    const closeMinutes = 21 * 60; // 9:00 PM (21:00)

    if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
      return {
        isOpen: true,
        statusText: 'Open Now',
        detailText: 'Closes tonight at 9:00 PM IST',
      };
    } else if (currentMinutes < openMinutes) {
      return {
        isOpen: false,
        statusText: 'Closed Now',
        detailText: 'Opens today at 10:00 AM IST',
      };
    } else {
      // Past 9:00 PM IST
      if (weekday === 'Sunday') {
        return {
          isOpen: false,
          statusText: 'Closed for the night',
          detailText: 'Closed Monday • Opens Tuesday at 10:00 AM IST',
        };
      }
      return {
        isOpen: false,
        statusText: 'Closed for the night',
        detailText: 'Opens tomorrow at 10:00 AM IST',
      };
    }
  } catch {
    return {
      isOpen: false,
      statusText: 'Closed (Mon: Closed, Tue-Sun: 10AM-9PM)',
      detailText: 'Tue–Sun: 10:00 AM – 9:00 PM',
    };
  }
}

