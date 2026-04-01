export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  history: { time: string; price: number }[];
  marketCap: string;
  volume: string;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

const STOCK_SYMBOLS = [
  { symbol: 'NVDA', name: 'Nvidia Corp' },
  { symbol: 'TSLA', name: 'Tesla, Inc.' },
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corp' },
  { symbol: 'AMZN', name: 'Amazon.com' },
  { symbol: 'META', name: 'Meta Platforms' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' }
];

const generateHistory = (currentPrice: number, points: number = 30) => {
  let prices = [];
  let basePrice = currentPrice;
  for (let i = points; i > 0; i--) {
    basePrice = basePrice * (1 + (Math.random() * 0.04 - 0.02));
    prices.push({
      time: new Date(Date.now() - i * 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      price: Number(basePrice.toFixed(2))
    });
  }
  return prices;
};

export const getMockStocks = (): StockData[] => {
  return STOCK_SYMBOLS.map((s) => {
    const price = 100 + Math.random() * 900;
    const change = (Math.random() * 40 - 20);
    return {
      ...s,
      price: Number(price.toFixed(2)),
      change: Number(change.toFixed(2)),
      changePercent: Number((change / price * 100).toFixed(2)),
      marketCap: (Math.random() * 3 + 0.5).toFixed(2) + 'T',
      volume: (Math.random() * 100 + 10).toFixed(1) + 'M',
      history: generateHistory(price)
    };
  });
};

export const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Nvidia reaches record high as AI demand surges',
    source: 'MarketWire',
    time: '10m ago',
    sentiment: 'positive'
  },
  {
    id: '2',
    title: 'Federal Reserve hints at interest rate stability',
    source: 'FinanceDaily',
    time: '45m ago',
    sentiment: 'neutral'
  },
  {
    id: '3',
    title: 'Tech sector faces headwinds amid new regulations',
    source: 'TechEcho',
    time: '2h ago',
    sentiment: 'negative'
  },
  {
    id: '4',
    title: 'Tesla delivery numbers beat quarterly expectations',
    source: 'AutoInsider',
    time: '4h ago',
    sentiment: 'positive'
  }
];

export const getMarketOverview = () => ({
  portfolioValue: 124560.82,
  dayProfit: 2450.40,
  dayProfitPercent: 1.98,
  buyingPower: 15200.00
});
