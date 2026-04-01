import React, { useMemo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  percent: number;
  isProfit: boolean;
  icon: LucideIcon;
  color: string;
  index?: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, percent, isProfit, icon: Icon, color, index = 0 }) => {
  const accentHex = useMemo(() => `${color}22`, [color]);

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--glass-border)',
        borderRadius: 16,
        padding: '20px 20px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        cursor: 'pointer',
        transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
        animation: `fadeIn 0.5s ease-out ${index * 0.08}s both`,
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = 'translateY(-2px)';
        el.style.borderColor = `${color}44`;
        el.style.boxShadow = `0 8px 32px ${color}18`;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = 'translateY(0)';
        el.style.borderColor = 'var(--glass-border)';
        el.style.boxShadow = 'none';
      }}
    >
      {/* Subtle glow accent */}
      <div
        style={{
          position: 'absolute',
          top: -30,
          right: -30,
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: `${color}12`,
          filter: 'blur(32px)',
          pointerEvents: 'none',
        }}
      />

      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div
          style={{
            padding: '8px',
            borderRadius: 10,
            background: accentHex,
            border: `1px solid ${color}30`,
          }}
        >
          <Icon size={18} color={color} />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            fontSize: 11,
            fontWeight: 700,
            color: isProfit ? '#34d399' : '#fb7185',
            background: isProfit ? 'rgba(16,185,129,0.1)' : 'rgba(244,63,94,0.1)',
            padding: '3px 8px',
            borderRadius: 20,
            letterSpacing: '0.02em',
          }}
        >
          {isProfit ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {percent.toFixed(1)}%
        </div>
      </div>

      {/* Values */}
      <div>
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: 4,
          }}
        >
          {title}
        </p>
        <h3
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {value}
        </h3>
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: 3,
          borderRadius: 99,
          background: 'rgba(255,255,255,0.05)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            borderRadius: 99,
            width: `${Math.min(Math.abs(percent) * 6 + 20, 100)}%`,
            background: isProfit
              ? 'linear-gradient(90deg, #10b981, #34d399)'
              : 'linear-gradient(90deg, #f43f5e, #fb7185)',
            opacity: 0.75,
            transition: 'width 1s ease',
          }}
        />
      </div>
    </div>
  );
};

export default StatCard;
