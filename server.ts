import express from 'express';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // In-memory cache for OroPocket public prices (2 minutes TTL to respect 10 req/min limit)
  let cachedRates: any = null;
  let lastFetchTime = 0;
  const CACHE_TTL = 2 * 60 * 1000;

  // OroPocket Public Prices proxy endpoint
  app.get('/api/rates', async (req, res) => {
    const now = Date.now();
    if (cachedRates && now - lastFetchTime < CACHE_TTL) {
      return res.json({
        success: true,
        ratesAvailable: true,
        cached: true,
        ...cachedRates,
      });
    }

    try {
      const response = await fetch('https://api.oropocket.com/public/prices', {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`OroPocket request failed with status: ${response.status}`);
      }

      const json = await response.json();
      if (!json || !json.data || !json.data.gold || !json.data.silver) {
        throw new Error('Invalid response structure from OroPocket API');
      }

      const { gold, silver, timestamp } = json.data;

      // Extract raw OroPocket buy and sell prices in INR per gram (no GST added)
      const goldBuy = Number(gold.buy);
      const goldSell = Number(gold.sell);
      const silverBuy = Number(silver.buy);
      const silverSell = Number(silver.sell);

      // Convert returned timestamp to Indian Standard Time (IST)
      const date = new Date(timestamp);
      const istFormattedTime = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(date) + ' IST';

      cachedRates = {
        ratesAvailable: true,
        source: 'OroPocket Public API',
        timestamp: timestamp,
        lastUpdatedIST: istFormattedTime,
        currency: gold.currency || 'INR',
        unit: gold.unit || 'gram',
        raw: {
          gold: {
            buy: goldBuy,
            sell: goldSell,
            currency: gold.currency,
            unit: gold.unit,
          },
          silver: {
            buy: silverBuy,
            sell: silverSell,
            currency: silver.currency,
            unit: silver.unit,
          },
        },
        rates: {
          gold: {
            k24: {
              buyPerGram: goldBuy,
              sellPerGram: goldSell,
            },
            k22: {
              buyPerGram: Number(((goldBuy * 22) / 24).toFixed(2)),
              sellPerGram: Number(((goldSell * 22) / 24).toFixed(2)),
            },
            k18: {
              buyPerGram: Number(((goldBuy * 18) / 24).toFixed(2)),
              sellPerGram: Number(((goldSell * 18) / 24).toFixed(2)),
            },
          },
          silver: {
            fine999: {
              buyPerGram: silverBuy,
              sellPerGram: silverSell,
            },
            sterling925: {
              buyPerGram: Number((silverBuy * 0.925).toFixed(2)),
              sellPerGram: Number((silverSell * 0.925).toFixed(2)),
            },
          },
        },
      };
      lastFetchTime = now;

      return res.json({
        success: true,
        ...cachedRates,
      });
    } catch (error: any) {
      return res.json({
        success: false,
        ratesAvailable: false,
        error: error.message || 'Failed to retrieve OroPocket rates',
      });
    }
  });

  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
