import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import StockChart from './components/StockChart';
import Watchlist from './components/Watchlist';
import NewsFeed from './components/NewsFeed';
import { getMockStocks, MOCK_NEWS, getMarketOverview } from './utils/mockData';
import type { StockData } from './utils/mockData';
import {
  TrendingUp,
  Search,
  Bell,
  CreditCard,
  ArrowUpRight,
  ChevronDown,
  BarChart2,
} from 'lucide-react';

const MARKET_STATS = getMarketOverview();


const tickStock = (stock: StockData): StockData => {
  const volatility = 0.0015;
  const delta = stock.price * (Math.random() * volatility * 2 - volatility);
  const newPrice = Math.max(1, stock.price + delta);
  const openPrice = stock.price - stock.change;
  const newChange = newPrice - openPrice;
  return {
    ...stock,
    price: Number(newPrice.toFixed(2)),
    change: Number(newChange.toFixed(2)),
    changePercent: Number(((newChange / openPrice) * 100).toFixed(2)),
    history: [
      ...stock.history.slice(1),
      {
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        price: Number(newPrice.toFixed(2)),
      },
    ],
  };
};

const Spinner: React.FC = () => (
  <div
    style={{
      height: '100vh',
      width: '100vw',
      background: 'var(--bg-dark)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
    }}
  >
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        border: '3px solid rgba(59,130,246,0.2)',
        borderTopColor: 'var(--primary)',
        animation: 'spin 0.8s linear infinite',
      }}
    />
    <p
      style={{
        fontSize: 11,
        fontWeight: 700,
        color: 'var(--text-secondary)',
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        animation: 'pulse 2s ease-in-out infinite',
      }}
    >
      Initialising Terminal…
    </p>
  </div>
);

const App: React.FC = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState('NVDA');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    const initial = getMockStocks();
    setStocks(initial);
    const t = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prev => prev.map(tickStock));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentStock = stocks.find(s => s.symbol === selectedSymbol) ?? stocks[0];

  const handleSelect = useCallback((symbol: string) => {
    setSelectedSymbol(symbol);
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div
      style={{
        display: 'flex',
        background: 'var(--bg-dark)',
        color: 'var(--text-primary)',
        minHeight: '100vh',
        fontFamily: "'Inter', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Sidebar ── */}
      <Sidebar />

      {/* ── Main content ── */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          /* On mobile, add bottom padding so content isn't hidden under the bottom nav */
          paddingBottom: 72,
          overflowX: 'hidden',
        }}
      >
        {/* ── Sticky header ── */}
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 20px',
            borderBottom: '1px solid var(--glass-border)',
            background: 'rgba(8,8,12,0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          {/* Left — Logo (mobile only) + Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
            {/* Mobile logo */}
            <div
              className="lg:hidden"
              style={{
                width: 34,
                height: 34,
                background: 'var(--primary)',
                borderRadius: 9,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <BarChart2 size={18} color="#fff" />
            </div>

            {/* Search */}
            <div style={{ position: 'relative', flex: 1, maxWidth: 340 }}>
              <Search
                size={15}
                color="var(--text-secondary)"
                style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
              />
              <input
                type="text"
                placeholder="Search stocks…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 10,
                  padding: '8px 12px 8px 36px',
                  fontSize: 13,
                  color: 'var(--text-primary)',
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.boxShadow = '0 0 0 1px var(--primary)';
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Index tickers — md+ */}
            <div
              className="md:flex hidden"
              style={{ alignItems: 'center', gap: 16 }}
            >
              {[
                { label: 'S&P 500', val: '+1.2%', pos: true },
                { label: 'NASDAQ', val: '-0.4%', pos: false },
                { label: 'DJIA', val: '+0.8%', pos: true },
              ].map(t => (
                <span
                  key={t.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: 11,
                    fontWeight: 700,
                    color: t.pos ? '#34d399' : '#fb7185',
                    letterSpacing: '0.06em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t.pos ? <TrendingUp size={11} /> : <TrendingUp size={11} style={{ transform: 'scaleY(-1)' }} />}
                  {t.label} {t.val}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Bell + Balance */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            {/* Notification bell */}
            <button
              style={{
                position: 'relative',
                padding: '8px',
                borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.07)',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              onClick={() => setShowNotif(v => !v)}
              title="Notifications"
            >

              {showNotif && (
                <div style={{
                  position: 'absolute',
                  top: 60,
                  right: 20,
                  background: '#111',
                  padding: 10,
                  borderRadius: 8,
                  fontSize: 12
                }}>
                  No new notifications
                </div>
              )}

              <Bell size={18} color="var(--text-secondary)" />
              <span
                style={{
                  position: 'absolute',
                  top: 7,
                  right: 7,
                  width: 6,
                  height: 6,
                  background: '#f43f5e',
                  borderRadius: '50%',
                  border: '2px solid var(--bg-dark)',
                }}
              />
            </button>

            {/* Divider */}
            <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.08)' }} />

            {/* Balance */}
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 12px 6px 6px',
                borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.07)',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: 'rgba(59,130,246,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CreditCard size={14} color="var(--primary)" />
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontSize: 9, color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  Balance
                </p>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: 'Outfit, sans-serif' }}>
                  ${MARKET_STATS.buyingPower.toLocaleString()}
                </p>
              </div>
              <ChevronDown size={13} color="var(--text-secondary)" />
            </button>
          </div>
        </header>

        {/* ── Dashboard body ── */}
        <div
          style={{
            flex: 1,
            padding: 'clamp(16px, 3vw, 32px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(16px, 2.5vw, 28px)',
          }}
        >
          {/* Stat cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: 'clamp(10px, 2vw, 20px)',
            }}
          >
            <StatCard title="Portfolio Value" value={`$${MARKET_STATS.portfolioValue.toLocaleString()}`}
              percent={4.2} isProfit icon={TrendingUp} color="#3b82f6" index={0} />
            <StatCard title="Day Profit" value={`+$${MARKET_STATS.dayProfit.toLocaleString()}`}
              percent={MARKET_STATS.dayProfitPercent} isProfit icon={ArrowUpRight} color="#10b981" index={1} />
            <StatCard title="Buying Power" value={`$${MARKET_STATS.buyingPower.toLocaleString()}`}
              percent={0.0} isProfit icon={CreditCard} color="#f59e0b" index={2} />
            <StatCard title="Market Status" value="OPEN"
              percent={0.8} isProfit icon={BarChart2} color="#8b5cf6" index={3} />
          </div>

          {/* Chart + Watchlist — responsive */}
          <ChartWatchlistRow
            currentStock={currentStock}
            stocks={stocks}
            selectedSymbol={selectedSymbol}
            onSelect={handleSelect}
          />

          {/* News */}
          <NewsFeed news={MOCK_NEWS} />
        </div>

        {/* Footer */}
        <footer
          style={{
            padding: '16px 24px',
            textAlign: 'center',
            fontSize: 10,
            color: 'var(--text-secondary)',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            opacity: 0.4,
            borderTop: '1px solid var(--glass-border)',
          }}
        >
          Market data is simulated · Antigravity Terminal v1.1.0 · Powered by Real-time Simulation Engine
        </footer>
      </main>

      {/* Ambient bg glows */}
      <div
        style={{
          position: 'fixed',
          top: '-15%',
          right: '-10%',
          width: '50vw',
          height: '50vh',
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.06), transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'fixed',
          bottom: '-15%',
          left: '-10%',
          width: '40vw',
          height: '40vh',
          background: 'radial-gradient(ellipse, rgba(16,185,129,0.05), transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
    </div>
  );
};

/* ─── Chart + Watchlist responsive wrapper ─── */
const ChartWatchlistRow: React.FC<{
  currentStock: StockData | undefined;
  stocks: StockData[];
  selectedSymbol: string;
  onSelect: (s: string) => void;
}> = ({ currentStock, stocks, selectedSymbol, onSelect }) => {
  // Use CSS custom property approach for responsive flex
  return (
    <div className="chart-watchlist-row">
      {/* Chart */}
      <div className="chart-col">
        {currentStock && (
          <StockChart
            data={currentStock.history}
            symbol={currentStock.symbol}
            isProfit={currentStock.change >= 0}
            currentPrice={currentStock.price}
            changePercent={currentStock.changePercent}
          />
        )}
      </div>

      {/* Watchlist */}
      <div className="watchlist-col">
        <Watchlist
          stocks={stocks}
          onSelect={onSelect}
          selectedSymbol={selectedSymbol}
        />
      </div>
    </div>
  );
};

export default App;
