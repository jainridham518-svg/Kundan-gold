import { TodayRatesData } from '../types';

/**
 * Kundan Gold - Daily Metal Rates
 * 
 * Note: Unverified or hardcoded numerical rates have been removed.
 * Rates vary with market conditions. Please contact Kundan Gold for today's confirmed rates.
 */
export const TODAY_RATES: TodayRatesData = {
  lastUpdated: 'Rates on Request',
  rateStatus: 'unverified',
  sourceNote: 'Rates vary with market conditions. Please contact Kundan Gold for today\'s confirmed rates.',
  gold: {
    k24: {
      purity: '24K (99.9% Pure Gold)',
      name: '24 Karat Pure Gold',
      perGram: null,
      per10Gram: null,
    },
    k22: {
      purity: '22K (91.6% Hallmarked)',
      name: '22 Karat Standard Jewellery Gold',
      perGram: null,
      per10Gram: null,
    },
    k18: {
      purity: '18K (75.0% Hallmarked)',
      name: '18 Karat Jewellery Gold',
      perGram: null,
      per10Gram: null,
    },
  },
  silver: {
    fine999: {
      purity: '999 Fine Silver',
      name: 'Fine Pure Silver (Coins & Bars)',
      perGram: null,
      perKg: null,
    },
    sterling925: {
      purity: '925 Sterling Silver',
      name: 'Sterling Silver Jewellery',
      perGram: null,
      perKg: null,
    },
  },
  disclaimer:
    'Rates vary with market conditions. Please contact Kundan Gold for today\'s confirmed rates. Final jewellery prices are computed on verified weight, hallmarked purity, applicable karigar making charges, and taxes at the time of order confirmation.',
};

/**
 * Format Indian Rupee currency with commas
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}
