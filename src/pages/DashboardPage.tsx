import React, { useState, useEffect, useCallback } from 'react';
import StatCard from '../components/StatCard';
import StockChart from '../components/StockChart';
import Watchlist from '../components/Watchlist';
import NewsFeed from '../components/NewsFeed';
import { getMockStocks, MOCK_NEWS, getMarketOverview } from '../utils/mockData';
import type { StockData } from '../utils/mockData';
import { TrendingUp, CreditCard, ArrowUpRight, BarChart2 } from 'lucide-react';

const MARKET_STATS = getMarketOverview();

const tickStock = (stock: StockData): StockData => {
  const v = 0.0015;
  const delta = stock.price * (Math.random() * v * 2 - v);
  const newPrice = Math.max(1, stock.price + delta);
  const open = stock.price - stock.change;
  const newChange = newPrice - open;
  return {
    ...stock,
    price: Number(newPrice.toFixed(2)),
    change: Number(newChange.toFixed(2)),
    changePercent: Number(((newChange / open) * 100).toFixed(2)),
    history: [
      ...stock.history.slice(1),
      { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), price: Number(newPrice.toFixed(2)) },
    ],
  };
};

const DashboardPage: React.FC = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState('NVDA');

  useEffect(() => {
    setStocks(getMockStocks());
  }, []);

  useEffect(() => {
    const id = setInterval(() => setStocks(prev => prev.map(tickStock)), 4000);
    return () => clearInterval(id);
  }, []);

  const currentStock = stocks.find(s => s.symbol === selectedSymbol) ?? stocks[0];
  const handleSelect = useCallback((sym: string) => setSelectedSymbol(sym), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px,2.5vw,24px)' }}>
      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(190px,1fr))', gap: 'clamp(10px,2vw,18px)' }}>
        <StatCard title="Portfolio Value" value={`$${MARKET_STATS.portfolioValue.toLocaleString()}`} percent={4.2} isProfit icon={TrendingUp} color="#3b82f6" index={0} />
        <StatCard title="Day Profit" value={`+$${MARKET_STATS.dayProfit.toLocaleString()}`} percent={MARKET_STATS.dayProfitPercent} isProfit icon={ArrowUpRight} color="#10b981" index={1} />
        <StatCard title="Buying Power" value={`$${MARKET_STATS.buyingPower.toLocaleString()}`} percent={0} isProfit icon={CreditCard} color="#f59e0b" index={2} />
        <StatCard title="Market Status" value="OPEN" percent={0.8} isProfit icon={BarChart2} color="#8b5cf6" index={3} />
      </div>

      {/* Chart + Watchlist */}
      <div className="chart-watchlist-row">
        <div className="chart-col">
          {currentStock && (
            <StockChart data={currentStock.history} symbol={currentStock.symbol} isProfit={currentStock.change >= 0} currentPrice={currentStock.price} changePercent={currentStock.changePercent} />
          )}
        </div>
        <div className="watchlist-col">
          <Watchlist stocks={stocks} onSelect={handleSelect} selectedSymbol={selectedSymbol} />
        </div>
      </div>

      {/* News */}
      <NewsFeed news={MOCK_NEWS} />
    </div>
  );
};

export default DashboardPage;
