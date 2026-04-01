import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus, Newspaper, ExternalLink } from 'lucide-react';
import type { NewsItem } from '../utils/mockData';

interface NewsFeedProps {
  news: NewsItem[];
}

const sentimentConfig = {
  positive: { icon: ArrowUpRight, color: '#34d399', bg: 'rgba(16,185,129,0.1)', label: 'Bullish' },
  negative: { icon: ArrowDownRight, color: '#fb7185', bg: 'rgba(244,63,94,0.1)', label: 'Bearish' },
  neutral:  { icon: Minus,         color: '#94a3b8', bg: 'rgba(148,163,184,0.1)', label: 'Neutral' },
};

const NewsFeed: React.FC<NewsFeedProps> = ({ news }) => {
  return (
    <div
      style={{
        background: 'var(--bg-card)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--glass-border)',
        borderRadius: 16,
        padding: '20px 20px 16px',
        animation: 'fadeIn 0.5s ease-out 0.2s both',
      }}
    >
      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Newspaper size={16} color="var(--primary)" />
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: '#fff' }}>
            Market Insights
          </h3>
        </div>
        <button
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: 'var(--primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          All News <ExternalLink size={11} />
        </button>
      </div>

      {/* News grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 12,
        }}
      >
        {news.map((item) => {
          const cfg = sentimentConfig[item.sentiment];
          const SentIcon = cfg.icon;

          return (
            <div
              key={item.id}
              style={{
                padding: '14px 14px 12px',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.02)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.background = 'rgba(255,255,255,0.05)';
                el.style.borderColor = 'rgba(255,255,255,0.1)';
                el.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.background = 'rgba(255,255,255,0.02)';
                el.style.borderColor = 'rgba(255,255,255,0.06)';
                el.style.transform = 'translateY(0)';
              }}
            >
              {/* Meta row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: 'var(--text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    opacity: 0.6,
                  }}
                >
                  {item.source} · {item.time}
                </span>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                    fontSize: 10,
                    fontWeight: 700,
                    color: cfg.color,
                    background: cfg.bg,
                    borderRadius: 6,
                    padding: '2px 6px',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  <SentIcon size={10} />
                  {cfg.label}
                </span>
              </div>

              {/* Title */}
              <h4
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.88)',
                  lineHeight: 1.5,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  transition: 'color 0.2s ease',
                }}
              >
                {item.title}
              </h4>

              {/* Separator */}
              <div
                style={{
                  height: 1,
                  background: `linear-gradient(90deg, ${cfg.color}40, transparent)`,
                  borderRadius: 1,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewsFeed;
