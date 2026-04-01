import React from 'react';
import { PageHeader } from './MarketsPage';
import { useAuth } from '../context/AuthContext';
import { Briefcase, TrendingUp, DollarSign, PieChart } from 'lucide-react';

const HOLDINGS = [
  { symbol: 'NVDA', shares: 12, avgCost: 498.20, currentPrice: 862.40, color: '#10b981' },
  { symbol: 'AAPL', shares: 25, avgCost: 178.50, currentPrice: 189.30, color: '#3b82f6' },
  { symbol: 'MSFT', shares: 8,  avgCost: 380.00, currentPrice: 415.80, color: '#8b5cf6' },
  { symbol: 'TSLA', shares: 15, avgCost: 220.00, currentPrice: 194.60, color: '#f59e0b' },
];

const PortfolioPage: React.FC = () => {
  const { user } = useAuth();
  const totalValue = HOLDINGS.reduce((s, h) => s + h.shares * h.currentPrice, 0);
  const totalCost  = HOLDINGS.reduce((s, h) => s + h.shares * h.avgCost, 0);
  const totalPnl   = totalValue - totalCost;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <PageHeader title="Portfolio" subtitle={`${user?.name}'s investment overview`} />

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 14 }}>
        {[
          { label: 'Total Value',  value: `$${totalValue.toLocaleString('en-US',{maximumFractionDigits:2})}`, icon: Briefcase,  color: '#3b82f6' },
          { label: 'Total Cost',   value: `$${totalCost.toLocaleString('en-US',{maximumFractionDigits:2})}`,  icon: DollarSign, color: '#f59e0b' },
          { label: 'P&L',          value: `${totalPnl>=0?'+':''}$${Math.abs(totalPnl).toLocaleString('en-US',{maximumFractionDigits:2})}`, icon: TrendingUp, color: totalPnl>=0?'#10b981':'#f43f5e' },
          { label: 'Holdings',     value: `${HOLDINGS.length} positions`, icon: PieChart, color: '#8b5cf6' },
        ].map(c => (
          <div key={c.label} style={{ background: 'var(--bg-card)', backdropFilter: 'blur(16px)', border: '1px solid var(--glass-border)', borderRadius: 16, padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${c.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <c.icon size={18} color={c.color} />
            </div>
            <div>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>{c.label}</p>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>{c.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Holdings table */}
      <div style={{ background: 'var(--bg-card)', backdropFilter: 'blur(16px)', border: '1px solid var(--glass-border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 70px 100px 100px 100px', gap: 8, padding: '12px 20px', borderBottom: '1px solid var(--glass-border)' }}>
          {['Asset','Shares','Avg Cost','Current','P&L'].map(h => (
            <span key={h} style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</span>
          ))}
        </div>
        {HOLDINGS.map(h => {
          const pnl = (h.currentPrice - h.avgCost) * h.shares;
          const pnlPct = ((h.currentPrice - h.avgCost) / h.avgCost * 100);
          const pos = pnl >= 0;
          return (
            <div key={h.symbol} style={{ display: 'grid', gridTemplateColumns: '1fr 70px 100px 100px 100px', gap: 8, padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: `${h.color}20`, border: `1px solid ${h.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: h.color, fontFamily: 'Outfit, sans-serif' }}>{h.symbol.slice(0,2)}</div>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{h.symbol}</span>
              </div>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{h.shares}</span>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>${h.avgCost.toFixed(2)}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>${h.currentPrice.toFixed(2)}</span>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: pos ? '#34d399' : '#fb7185' }}>{pos?'+':''}${Math.abs(pnl).toFixed(0)}</p>
                <p style={{ fontSize: 10, color: pos ? '#34d399' : '#fb7185', opacity: 0.7 }}>{pos?'+':''}{pnlPct.toFixed(2)}%</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PortfolioPage;
