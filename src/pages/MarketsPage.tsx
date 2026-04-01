import React, { useState, useEffect } from 'react';
import { getMockStocks } from '../utils/mockData';
import type { StockData } from '../utils/mockData';
import { TrendingUp, TrendingDown, Search, Filter } from 'lucide-react';
import StockChart from '../components/StockChart';

const MarketsPage: React.FC = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [selected, setSelected] = useState<StockData | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const s = getMockStocks();
    setStocks(s);
    setSelected(s[0]);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setStocks(prev => prev.map(stock => {
        const v = 0.002;
        const d = stock.price * (Math.random() * v * 2 - v);
        const np = Math.max(1, stock.price + d);
        const open = stock.price - stock.change;
        return { ...stock, price: Number(np.toFixed(2)), change: Number((np - open).toFixed(2)), changePercent: Number(((np - open) / open * 100).toFixed(2)) };
      }));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const filtered = stocks.filter(s =>
    s.symbol.toLowerCase().includes(search.toLowerCase()) ||
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <PageHeader title="Markets" subtitle="Live market overview across major indices" />

      <div className="chart-watchlist-row" style={{ minHeight: 340 }}>
        {/* Chart panel */}
        <div className="chart-col" style={{ minHeight: 300 }}>
          {selected && (
            <StockChart data={selected.history} symbol={selected.symbol} isProfit={selected.change >= 0} currentPrice={selected.price} changePercent={selected.changePercent} />
          )}
        </div>

        {/* Stock table */}
        <div style={{ flex: 1, minWidth: 0, background: 'var(--bg-card)', backdropFilter: 'blur(16px)', border: '1px solid var(--glass-border)', borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {/* Search */}
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Search size={15} color="var(--text-secondary)" style={{ flexShrink: 0 }} />
            <input
              type="text" placeholder="Search symbol or company…" value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: 13, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}
            />
            <Filter size={15} color="var(--text-secondary)" />
          </div>

          {/* Table header */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px 90px', gap: 8, padding: '8px 16px', borderBottom: '1px solid var(--glass-border)' }}>
            {['Symbol', 'Price', 'Change'].map(h => (
              <span key={h} style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</span>
            ))}
          </div>

          {/* Rows */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filtered.map(stock => {
              const isProfit = stock.change >= 0;
              const isSelected = selected?.symbol === stock.symbol;
              return (
                <div key={stock.symbol} onClick={() => setSelected(stock)}
                  style={{ display: 'grid', gridTemplateColumns: '1fr 90px 90px', gap: 8, padding: '11px 16px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.03)', background: isSelected ? 'rgba(59,130,246,0.08)' : 'transparent', transition: 'background 0.15s' }}
                  onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)'; }}
                  onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
                >
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '0.04em' }}>{stock.symbol}</p>
                    <p style={{ fontSize: 10, color: 'var(--text-secondary)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 120 }}>{stock.name}</p>
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', alignSelf: 'center' }}>${stock.price.toFixed(2)}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, alignSelf: 'center' }}>
                    {isProfit ? <TrendingUp size={11} color="#34d399" /> : <TrendingDown size={11} color="#fb7185" />}
                    <span style={{ fontSize: 12, fontWeight: 700, color: isProfit ? '#34d399' : '#fb7185' }}>{Math.abs(stock.changePercent).toFixed(2)}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export const PageHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div style={{ marginBottom: 4 }}>
    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginBottom: 4 }}>{title}</h1>
    <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{subtitle}</p>
  </div>
);

export default MarketsPage;
