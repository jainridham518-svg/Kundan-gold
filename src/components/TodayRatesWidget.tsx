import React, { useState, useEffect } from 'react';
import { Calculator, Clock, MessageCircle, AlertCircle, Info, RefreshCw, Radio, TrendingUp } from 'lucide-react';
import { TODAY_RATES, formatINR } from '../data/ratesData';
import { getWhatsAppUrl } from '../data/businessInfo';

interface OroPocketAsset {
  buy: number;
  sell: number;
  currency: string;
  unit: string;
}

interface OroPocketData {
  gold: OroPocketAsset;
  silver: OroPocketAsset;
  timestamp: string;
  formattedIST: string;
}

export const TodayRatesWidget: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [oroData, setOroData] = useState<OroPocketData | null>(null);

  // Estimator calculator state
  const [calcMetal, setCalcMetal] = useState<'gold24k' | 'gold22k' | 'gold18k' | 'silver999' | 'silver925'>('gold22k');
  const [calcGrams, setCalcGrams] = useState<string>('10');

  // Convert raw ISO timestamp to Indian Standard Time (IST)
  const formatToIST = (timestampStr: string): string => {
    try {
      const date = new Date(timestampStr);
      return new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(date) + ' IST';
    } catch {
      return timestampStr;
    }
  };

  // Fetch OroPocket public prices endpoint using fetch and async/await
  const fetchOroPocketRates = async () => {
    setIsLoading(true);
    try {
      // Fetch public prices endpoint (with server proxy fallback)
      let response: Response;
      try {
        response = await fetch('https://api.oropocket.com/public/prices', {
          headers: { Accept: 'application/json' },
        });
        if (!response.ok) {
          throw new Error(`Public endpoint returned ${response.status}`);
        }
      } catch {
        // Fallback to local server proxy if direct browser fetch encountered network issue
        response = await fetch('/api/rates');
      }

      const json = await response.json();
      const payload = json.data || json.raw;

      if (payload && payload.gold && payload.silver && (payload.timestamp || json.timestamp)) {
        const rawTimestamp = payload.timestamp || json.timestamp;
        const formattedIST = formatToIST(rawTimestamp);

        setOroData({
          gold: {
            buy: Number(payload.gold.buy),
            sell: Number(payload.gold.sell),
            currency: payload.gold.currency || 'INR',
            unit: payload.gold.unit || 'gram',
          },
          silver: {
            buy: Number(payload.silver.buy),
            sell: Number(payload.silver.sell),
            currency: payload.silver.currency || 'INR',
            unit: payload.silver.unit || 'gram',
          },
          timestamp: rawTimestamp,
          formattedIST,
        });
        setIsLive(true);
      } else {
        setIsLive(false);
        setOroData(null);
      }
    } catch {
      setIsLive(false);
      setOroData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOroPocketRates();
  }, []);

  // Compute jewellery benchmark rates per gram based on 24K pure gold buy rate
  const gold24kBuy = oroData?.gold.buy ?? null;
  const gold24kSell = oroData?.gold.sell ?? null;
  const gold22kBuy = gold24kBuy ? (gold24kBuy * 22) / 24 : null;
  const gold18kBuy = gold24kBuy ? (gold24kBuy * 18) / 24 : null;

  const silver999Buy = oroData?.silver.buy ?? null;
  const silver999Sell = oroData?.silver.sell ?? null;
  const silver925Buy = silver999Buy ? silver999Buy * 0.925 : null;

  const getEstimatorRate = (): number | null => {
    switch (calcMetal) {
      case 'gold24k':
        return gold24kBuy;
      case 'gold22k':
        return gold22kBuy;
      case 'gold18k':
        return gold18kBuy;
      case 'silver999':
        return silver999Buy;
      case 'silver925':
        return silver925Buy;
      default:
        return null;
    }
  };

  const currentRate = getEstimatorRate();
  const grams = parseFloat(calcGrams) || 0;
  const estimatedBaseValue = currentRate != null ? grams * currentRate : null;

  const confirmWhatsAppUrl = getWhatsAppUrl(
    "Hello Kundan Gold, I'm checking today's live gold and silver rates in Kalyan West. Could you please confirm current showroom pricing?"
  );

  return (
    <div className="bg-[#151513] rounded-2xl border border-[#C9A45C]/25 shadow-xl p-6 sm:p-8" id="rates-widget">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#242420]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#C9A45C] uppercase tracking-wider mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C]" />
            <span>Kundan Gold Daily Board</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-[#F5F0E6]">
            Today's Gold &amp; Silver Rates
          </h2>
          <p className="text-sm text-[#A9A39A] mt-1.5">
            OroPocket indicative buy/sell quotes for market benchmarking. Final in-store jewellery rates confirmed on enquiry.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Status Indicator with Indian Standard Time from API */}
          {isLoading ? (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0B0B0A] rounded-full border border-[#242420] text-xs text-[#A9A39A]">
              <RefreshCw className="w-3.5 h-3.5 text-[#C9A45C] animate-spin" />
              <span>Checking live rates...</span>
            </div>
          ) : isLive && oroData ? (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#063B2E] rounded-full border border-[#C9A45C]/40 text-xs text-[#F5F0E6] shadow-xs">
              <Radio className="w-3.5 h-3.5 text-[#25D366] animate-pulse" />
              <span>OroPocket Feed: {oroData.formattedIST}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0B0B0A] rounded-full border border-[#242420] text-xs text-[#C9A45C]">
              <Clock className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>Rates on Request</span>
            </div>
          )}

          {/* Confirm via WhatsApp button */}
          <a
            href={confirmWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#063B2E] hover:bg-[#084B3B] text-[#F5F0E6] border border-[#C9A45C]/40 text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer shadow-xs"
            title="Ask today's exact rate"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>Confirm via WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Prominent Indicative Disclaimer Banner */}
      <div className="mt-4 px-3.5 py-2.5 bg-[#0B0B0A] rounded-lg border border-[#C9A45C]/25 flex items-start gap-2.5 text-xs text-[#E5DDD0]">
        <Info className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p>
            <strong className="text-[#F5F0E6]">OroPocket Indicative Buy/Sell Quotes:</strong> Figures below reflect OroPocket's public bullion price feed in INR per gram and are displayed for market awareness. They are <strong>not guaranteed Kundan Gold selling prices</strong>.
          </p>
          <p className="text-[11px] text-[#A9A39A]">
            Rates vary with market conditions. Please contact Kundan Gold for today's confirmed in-store rates.
          </p>
        </div>
      </div>

      {/* Metal Rates Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
        {/* GOLD RATES CARD (24K Buy/Sell + 22K & 18K Benchmarks) */}
        <div className="bg-[#0B0B0A] rounded-xl p-5 border border-[#C9A45C]/20 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#063B2E] text-[#C9A45C] flex items-center justify-center font-serif font-bold text-sm border border-[#C9A45C]/40">
                Au
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-[#F5F0E6]">Gold Quotes</h3>
                <span className="text-[11px] text-[#A9A39A]">OroPocket Asset Feed ({oroData?.gold.currency || 'INR'}/{oroData?.gold.unit || 'gram'})</span>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-[#151513] text-[#C9A45C] border border-[#C9A45C]/30">
              Gold
            </span>
          </div>

          <div className="divide-y divide-[#242420] text-sm">
            {/* 24K Pure Gold (Actual Buy & Sell from OroPocket) */}
            <div className="py-3 flex items-center justify-between">
              <div>
                <div className="font-semibold text-[#F5F0E6] flex items-center gap-1.5">
                  <span>24 Karat Pure Gold</span>
                  <span className="text-[10px] bg-[#063B2E] text-[#C9A45C] border border-[#C9A45C]/30 px-1.5 py-0.2 rounded font-medium">OroPocket Spot</span>
                </div>
                <div className="text-xs text-[#A9A39A]">24K (99.9% Pure Gold)</div>
              </div>
              <div className="text-right">
                {isLoading ? (
                  <div className="text-xs text-[#A9A39A] animate-pulse">Checking rate...</div>
                ) : isLive && gold24kBuy != null && gold24kSell != null ? (
                  <div>
                    <div className="text-base font-bold text-[#F5F0E6]">
                      Buy: {formatINR(gold24kBuy)} <span className="text-xs font-normal text-[#A9A39A]">/ g</span>
                    </div>
                    <div className="text-xs text-[#A9A39A]">
                      Sell: {formatINR(gold24kSell)} / g <span className="text-[10px] text-[#C9A45C] font-medium">(Indicative)</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs sm:text-sm font-semibold text-[#C9A45C]">
                    Contact us for today's rates
                  </div>
                )}
              </div>
            </div>

            {/* 22K Standard Jewellery Gold (Calculated Benchmark) */}
            <div className="py-3 flex items-center justify-between bg-[#151513] -mx-5 px-5 border-l-4 border-l-[#C9A45C]">
              <div>
                <div className="font-semibold text-[#F5F0E6] flex items-center gap-1.5">
                  <span>22 Karat Standard Jewellery Gold</span>
                  <span className="text-[10px] bg-[#063B2E] text-[#C9A45C] border border-[#C9A45C]/30 px-1.5 py-0.2 rounded font-medium">Standard</span>
                </div>
                <div className="text-xs text-[#A9A39A]">22K (91.6% Hallmarked Benchmark)</div>
              </div>
              <div className="text-right">
                {isLoading ? (
                  <div className="text-xs text-[#A9A39A] animate-pulse">Checking rate...</div>
                ) : isLive && gold22kBuy != null ? (
                  <div>
                    <div className="text-base font-bold text-[#C9A45C]">
                      {formatINR(gold22kBuy)} <span className="text-xs font-normal text-[#A9A39A]">/ g</span>
                    </div>
                    <div className="text-xs text-[#A9A39A]">
                      {formatINR(gold22kBuy * 10)} / 10g <span className="text-[10px] text-[#C9A45C] font-medium">(Benchmark)</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs sm:text-sm font-semibold text-[#C9A45C]">
                    Contact us for today's rates
                  </div>
                )}
              </div>
            </div>

            {/* 18K Jewellery Gold */}
            <div className="py-3 flex items-center justify-between">
              <div>
                <div className="font-semibold text-[#F5F0E6]">18 Karat Jewellery Gold</div>
                <div className="text-xs text-[#A9A39A]">18K (75.0% Hallmarked Benchmark)</div>
              </div>
              <div className="text-right">
                {isLoading ? (
                  <div className="text-xs text-[#A9A39A] animate-pulse">Checking rate...</div>
                ) : isLive && gold18kBuy != null ? (
                  <div>
                    <div className="text-base font-bold text-[#F5F0E6]">
                      {formatINR(gold18kBuy)} <span className="text-xs font-normal text-[#A9A39A]">/ g</span>
                    </div>
                    <div className="text-xs text-[#A9A39A]">
                      {formatINR(gold18kBuy * 10)} / 10g <span className="text-[10px] text-[#C9A45C] font-medium">(Benchmark)</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs sm:text-sm font-semibold text-[#C9A45C]">
                    Contact us for today's rates
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SILVER RATES CARD (999 Buy/Sell + 925 Benchmark) */}
        <div className="bg-[#0B0B0A] rounded-xl p-5 border border-[#C9A45C]/20 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#1C1C19] text-[#F5F0E6] flex items-center justify-center font-serif font-bold text-sm border border-[#C9A45C]/30">
                Ag
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-[#F5F0E6]">Silver Quotes</h3>
                <span className="text-[11px] text-[#A9A39A]">OroPocket Asset Feed ({oroData?.silver.currency || 'INR'}/{oroData?.silver.unit || 'gram'})</span>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-[#151513] text-[#F5F0E6] border border-[#242420]">
              Silver
            </span>
          </div>

          <div className="divide-y divide-[#242420] text-sm">
            {/* 999 Fine Silver (Actual Buy & Sell from OroPocket) */}
            <div className="py-3 flex items-center justify-between">
              <div>
                <div className="font-semibold text-[#F5F0E6] flex items-center gap-1.5">
                  <span>999 Fine Pure Silver</span>
                  <span className="text-[10px] bg-[#1C1C19] text-[#DFBD79] border border-[#C9A45C]/30 px-1.5 py-0.2 rounded font-medium">OroPocket Spot</span>
                </div>
                <div className="text-xs text-[#A9A39A]">Fine Pure Silver (Coins &amp; Bars)</div>
              </div>
              <div className="text-right">
                {isLoading ? (
                  <div className="text-xs text-[#A9A39A] animate-pulse">Checking rate...</div>
                ) : isLive && silver999Buy != null && silver999Sell != null ? (
                  <div>
                    <div className="text-base font-bold text-[#F5F0E6]">
                      Buy: {formatINR(silver999Buy)} <span className="text-xs font-normal text-[#A9A39A]">/ g</span>
                    </div>
                    <div className="text-xs text-[#A9A39A]">
                      Sell: {formatINR(silver999Sell)} / g <span className="text-[10px] text-[#C9A45C] font-medium">(Indicative)</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs sm:text-sm font-semibold text-[#C9A45C]">
                    Contact us for today's rates
                  </div>
                )}
              </div>
            </div>

            {/* 925 Sterling Silver */}
            <div className="py-3 flex items-center justify-between bg-[#151513] -mx-5 px-5 border-l-4 border-l-[#A9A39A]">
              <div>
                <div className="font-semibold text-[#F5F0E6] flex items-center gap-1.5">
                  <span>925 Sterling Silver</span>
                  <span className="text-[10px] bg-[#063B2E] text-[#C9A45C] border border-[#C9A45C]/30 px-1.5 py-0.2 rounded font-medium">Standard</span>
                </div>
                <div className="text-xs text-[#A9A39A]">925 Sterling Silver Jewellery</div>
              </div>
              <div className="text-right">
                {isLoading ? (
                  <div className="text-xs text-[#A9A39A] animate-pulse">Checking rate...</div>
                ) : isLive && silver925Buy != null ? (
                  <div>
                    <div className="text-base font-bold text-[#F5F0E6]">
                      {formatINR(silver925Buy)} <span className="text-xs font-normal text-[#A9A39A]">/ g</span>
                    </div>
                    <div className="text-xs text-[#A9A39A]">
                      {formatINR(silver925Buy * 1000)} / kg <span className="text-[10px] text-[#C9A45C] font-medium">(Benchmark)</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs sm:text-sm font-semibold text-[#C9A45C]">
                    Contact us for today's rates
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Metal Base Calculator */}
      <div className="bg-[#0B0B0A] rounded-xl p-5 border border-[#242420]">
        <div className="flex items-center gap-2 mb-3">
          <Calculator className="w-4 h-4 text-[#C9A45C]" />
          <h4 className="text-sm font-semibold text-[#F5F0E6]">
            Indicative Base Metal Value Estimator
          </h4>
        </div>
        <p className="text-xs text-[#A9A39A] mb-4">
          Calculate the raw precious metal bullion value based on OroPocket indicative buy quotes before karigar crafting charges and statutory GST.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-xs font-medium text-[#F5F0E6] mb-1">
              Select Metal &amp; Purity
            </label>
            <select
              value={calcMetal}
              onChange={(e) => setCalcMetal(e.target.value as any)}
              className="w-full text-xs sm:text-sm bg-[#151513] border border-[#242420] rounded-lg px-3 py-2 text-[#F5F0E6] focus:outline-none focus:border-[#C9A45C]"
            >
              <option value="gold24k">24K Pure Gold (OroPocket Buy Quote)</option>
              <option value="gold22k">22K Standard Jewellery Gold (91.6% Benchmark)</option>
              <option value="gold18k">18K Jewellery Gold (75.0% Benchmark)</option>
              <option value="silver999">999 Fine Pure Silver (OroPocket Buy Quote)</option>
              <option value="silver925">925 Sterling Silver (Benchmark)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#F5F0E6] mb-1">
              Weight (Grams)
            </label>
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={calcGrams}
              onChange={(e) => setCalcGrams(e.target.value)}
              className="w-full text-xs sm:text-sm bg-[#151513] border border-[#242420] rounded-lg px-3 py-2 text-[#F5F0E6] focus:outline-none focus:border-[#C9A45C]"
              placeholder="e.g. 10"
            />
          </div>

          <div className="bg-[#151513] p-3 rounded-lg border border-[#C9A45C]/30 flex flex-col justify-between">
            <div className="text-[11px] text-[#A9A39A]">Indicative Bullion Value</div>
            <div className="text-xs sm:text-sm font-semibold text-[#C9A45C] mt-1">
              {estimatedBaseValue != null ? (
                <span>
                  {formatINR(estimatedBaseValue)}{' '}
                  <span className="text-[10px] text-[#A9A39A] font-normal">(Base metal only)</span>
                </span>
              ) : (
                "Contact us for today's rates"
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="mt-4 p-3.5 rounded-lg bg-[#0B0B0A] border border-[#242420] flex items-start gap-2.5 text-xs text-[#A9A39A]">
        <AlertCircle className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-[#F5F0E6]">Pricing Policy &amp; Terms:</strong> OroPocket quotes are public digital bullion market rates displayed for comparison. Kundan Gold physical jewellery pricing is based on certified hallmarked net weight, daily bullion market fixing in Kalyan West, applicable karigar making charges, and applicable statutory GST at the time of purchase. Rates vary with market conditions. Please contact Kundan Gold for today's confirmed rates.
        </p>
      </div>
    </div>
  );
};
