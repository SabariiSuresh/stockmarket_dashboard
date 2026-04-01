import React, { useRef, useEffect } from 'react';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';
import type { StockData } from '../utils/mockData';

interface WatchlistProps {
  stocks: StockData[];
  onSelect: (symbol: string) => void;
  selectedSymbol: string;
}

const Watchlist: React.FC<WatchlistProps> = ({ stocks, onSelect, selectedSymbol }) => {
  const prevPrices = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    stocks.forEach(s => prevPrices.current.set(s.symbol, s.price));
  }, []);

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--glass-border)',
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '100%',
        minHeight: 320,
        animation: 'fadeIn 0.5s ease-out forwards',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 20px 12px',
          borderBottom: '1px solid var(--glass-border)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Star size={16} color="var(--primary)" />
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: '#fff' }}>
            Watchlist
          </h3>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              background: 'rgba(59,130,246,0.15)',
              color: 'var(--primary)',
              borderRadius: 20,
              padding: '2px 8px',
              letterSpacing: '0.02em',
            }}
          >
            {stocks.length}
          </span>
        </div>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: 'var(--success)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--success)',
              display: 'inline-block',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
          Live
        </span>
      </div>

      {/* Stock list */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px 12px 12px',
        }}
      >
        {stocks.map((stock) => {
          const isSelected = stock.symbol === selectedSymbol;
          const isProfit = stock.change >= 0;
          const accentColor = isProfit ? '#10b981' : '#f43f5e';

          return (
            <div
              key={stock.symbol}
              onClick={() => onSelect(stock.symbol)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 10px',
                borderRadius: 12,
                cursor: 'pointer',
                marginBottom: 4,
                border: `1px solid ${isSelected ? 'rgba(59,130,246,0.3)' : 'transparent'}`,
                background: isSelected ? 'rgba(59,130,246,0.1)' : 'transparent',
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? 'inset 0 0 0 1px rgba(59,130,246,0.2)' : 'none',
              }}
              onMouseEnter={e => {
                if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)';
              }}
              onMouseLeave={e => {
                if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = 'transparent';
              }}
            >
              {/* Symbol Avatar + Name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: isSelected ? 'var(--primary)' : 'rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 11,
                    color: isSelected ? '#fff' : 'var(--text-secondary)',
                    letterSpacing: '0.02em',
                    flexShrink: 0,
                    border: `1px solid ${isSelected ? 'transparent' : 'rgba(255,255,255,0.06)'}`,
                    fontFamily: 'Outfit, sans-serif',
                  }}
                >
                  {stock.symbol.slice(0, 2)}
                </div>
                <div style={{ minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: '#fff',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {stock.symbol}
                  </p>
                  <p
                    style={{
                      fontSize: 10,
                      color: 'var(--text-secondary)',
                      fontWeight: 500,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: 90,
                      opacity: 0.7,
                    }}
                  >
                    {stock.name}
                  </p>
                </div>
              </div>

              {/* Price + Change */}
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: 'Outfit, sans-serif' }}>
                  ${stock.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: 3,
                    fontSize: 10,
                    fontWeight: 700,
                    color: accentColor,
                    marginTop: 2,
                  }}
                >
                  {isProfit ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {Math.abs(stock.changePercent).toFixed(2)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Watchlist;
