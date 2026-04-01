import React from 'react';
import {
  BarChart3,
  Wallet,
  History,
  Settings,
  TrendingUp,
  LogOut,
  LayoutDashboard
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: TrendingUp, label: 'Markets' },
  { icon: Wallet, label: 'Portfolio' },
  { icon: History, label: 'Trades' },
  { icon: Settings, label: 'Settings' },
];

const Sidebar: React.FC = () => {
  return (
    <aside
      id="sidebar"
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      { }
      <div className="sidebar-logo">
        <div
          style={{
            width: 36,
            height: 36,
            background: 'var(--primary)',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(59,130,246,0.3)',
            flexShrink: 0,
          }}
        >
          <BarChart3 size={20} color="#fff" />
        </div>
        <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em' }}>
          Noizy<span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>Trades</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {menuItems.map((item, i) => (
          <button
            key={i}
            className={`sidebar-btn${item.active ? ' sidebar-btn-active' : ''}`}
            title={item.label}
          >
            <item.icon size={20} />
            <span className="sidebar-btn-label">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Upgrade card + User — desktop only */}
      <div className="sidebar-footer">
        <div className="sidebar-upgrade-card">
          <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>Upgrade to Pro</p>
          <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Get real-time alerts &amp; insights.</p>
          <button
            style={{
              width: '100%',
              padding: '8px 0',
              background: 'var(--primary)',
              color: '#fff',
              borderRadius: 8,
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#2563eb')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--primary)')}
          >
            Learn More
          </button>
        </div>

        <div className="sidebar-user">
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6, #10b981)',
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Alex Thompson</p>
            <p style={{ fontSize: 11, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Premium Account</p>
          </div>
          <button
            style={{ padding: 6, borderRadius: 8, transition: 'all 0.2s', color: 'var(--text-secondary)', flexShrink: 0 }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--danger)'; e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; }}
            title="Log out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
