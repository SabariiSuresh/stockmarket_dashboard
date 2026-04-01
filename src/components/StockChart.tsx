import React, { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from 'recharts';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface HistoryItem {
  time: string;
  price: number;
}

interface StockChartProps {
  data: HistoryItem[];
  symbol: string;
  isProfit: boolean;
  currentPrice?: number;
  changePercent?: number;
}

const PERIODS = ['1D', '1W', '1M', '1Y', 'ALL'] as const;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: 'rgba(12, 12, 18, 0.97)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 12,
        padding: '10px 14px',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      }}
    >
      <p style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 4 }}>
        {label}
      </p>
      <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', fontFamily: 'Outfit, sans-serif' }}>
        ${Number(payload[0].value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>
    </div>
  );
};

const StockChart: React.FC<StockChartProps> = ({ data, symbol, isProfit, currentPrice, changePercent }) => {
  const [activePeriod, setActivePeriod] = useState<string>('1D');
  const accentColor = isProfit ? '#10b981' : '#f43f5e';

  const minPrice = Math.min(...data.map(d => d.price));
  const maxPrice = Math.max(...data.map(d => d.price));
  const priceRange = maxPrice - minPrice;

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--glass-border)',
        borderRadius: 16,
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        height: '100%',
        minHeight: 360,
        animation: 'fadeIn 0.5s ease-out forwards',
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: 200,
          background: `radial-gradient(ellipse at top, ${accentColor}10, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12, position: 'relative', zIndex: 1 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <Activity size={16} color={accentColor} />
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 18, color: '#fff' }}>
              {symbol}
            </h3>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: accentColor,
                background: `${accentColor}18`,
                borderRadius: 6,
                padding: '2px 7px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              {isProfit ? '▲' : '▼'} {Math.abs(changePercent ?? 0).toFixed(2)}%
            </span>
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>
            Real-time · 24h range
          </p>
          {currentPrice && (
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, color: '#fff', marginTop: 6, letterSpacing: '-0.03em' }}>
              ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          )}
        </div>

        {/* Period selector */}
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {PERIODS.map(p => (
            <button
              key={p}
              onClick={() => setActivePeriod(p)}
              style={{
                padding: '5px 12px',
                fontSize: 11,
                fontWeight: 700,
                borderRadius: 8,
                border: activePeriod === p ? '1px solid rgba(59,130,246,0.4)' : '1px solid transparent',
                background: activePeriod === p ? 'rgba(59,130,246,0.18)' : 'transparent',
                color: activePeriod === p ? 'var(--primary)' : 'var(--text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                if (activePeriod !== p) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)';
              }}
              onMouseLeave={e => {
                if (activePeriod !== p) (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Range indicators */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, position: 'relative', zIndex: 1 }}>
        <span style={{ fontSize: 10, color: 'var(--text-secondary)', fontWeight: 600 }}>
          L: ${minPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
        <span style={{ fontSize: 10, color: 'var(--text-secondary)', fontWeight: 600 }}>
          Range: ${priceRange.toFixed(2)}
        </span>
        <span style={{ fontSize: 10, color: 'var(--text-secondary)', fontWeight: 600 }}>
          H: ${maxPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      </div>

      {/* Chart */}
      <div style={{ flex: 1, minHeight: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`grad-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={accentColor} stopOpacity={0.25} />
                <stop offset="100%" stopColor={accentColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
            <XAxis dataKey="time" hide />
            <YAxis hide domain={['auto', 'auto']} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke={accentColor}
              strokeWidth={2.5}
              fillOpacity={1}
              fill={`url(#grad-${symbol})`}
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom line accent */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '10%',
          right: '10%',
          height: 1,
          background: `linear-gradient(90deg, transparent, ${accentColor}40, transparent)`,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default StockChart;
