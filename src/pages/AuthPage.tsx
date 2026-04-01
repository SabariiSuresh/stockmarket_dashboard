import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BarChart2, Eye, EyeOff, TrendingUp, Shield, Zap } from 'lucide-react';

type Mode = 'login' | 'register';

const FEATURES = [
  { icon: TrendingUp, title: 'Real-time Data', desc: 'Live market simulation with tick-by-tick updates' },
  { icon: Shield,    title: 'Secure Portfolio', desc: 'Your holdings and watchlist, always protected' },
  { icon: Zap,       title: 'Smart Insights',  desc: 'AI-driven market sentiment and news analysis' },
];

const AuthPage: React.FC = () => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]   = useState(false);
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    if (mode === 'register' && !name.trim()) { setError('Please enter your name.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }

    setLoading(true);
    await new Promise(r => setTimeout(r, 400)); // simulate async

    const result = mode === 'login'
      ? login(email, password)
      : register(name, email, password);

    setLoading(false);
    if (!result.ok) setError(result.error ?? 'Something went wrong.');
  };

  const switchMode = (m: Mode) => {
    setMode(m); setError('');
    setName(''); setEmail(''); setPassword('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-dark)',
      display: 'flex',
      alignItems: 'stretch',
      fontFamily: "'Inter', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient glows */}
      <div style={{ position: 'fixed', top: '-20%', left: '-10%', width: '60vw', height: '60vh', background: 'radial-gradient(ellipse, rgba(59,130,246,0.08), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-20%', right: '-10%', width: '50vw', height: '50vh', background: 'radial-gradient(ellipse, rgba(16,185,129,0.06), transparent 70%)', pointerEvents: 'none' }} />

      {/* LEFT PANEL — branding (hidden on small screens) */}
      <div style={{
        flex: '1 1 50%',
        display: 'none',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 56px',
        borderRight: '1px solid var(--glass-border)',
        background: 'rgba(12,12,18,0.6)',
        backdropFilter: 'blur(20px)',
      }} className="auth-left-panel">
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 60 }}>
          <div style={{ width: 48, height: 48, background: 'var(--primary)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(59,130,246,0.35)' }}>
            <BarChart2 size={26} color="#fff" />
          </div>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em' }}>
            Antigravity<span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>Stocks</span>
          </span>
        </div>

        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 20 }}>
          Trade smarter.<br />
          <span style={{ color: 'var(--primary)' }}>Grow faster.</span>
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 48, maxWidth: 380 }}>
          A premium real-time stock market terminal with advanced charting, portfolio management, and AI-powered insights.
        </p>

        {/* Feature list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {FEATURES.map(f => (
            <div key={f.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <f.icon size={18} color="var(--primary)" />
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 3 }}>{f.title}</p>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL — form */}
      <div style={{
        flex: '1 1 50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 24px',
        minHeight: '100vh',
      }}>
        <div style={{ width: '100%', maxWidth: 420, animation: 'fadeIn 0.4s ease-out both' }}>

          {/* Mobile logo */}
          <div className="auth-mobile-logo" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36, justifyContent: 'center' }}>
            <div style={{ width: 38, height: 38, background: 'var(--primary)', borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BarChart2 size={20} color="#fff" />
            </div>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 800 }}>
              Antigravity<span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>Stocks</span>
            </span>
          </div>

          {/* Card */}
          <div style={{
            background: 'rgba(16,16,24,0.85)',
            backdropFilter: 'blur(24px)',
            border: '1px solid var(--glass-border)',
            borderRadius: 20,
            padding: '36px 32px',
            boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
          }}>
            {/* Tabs */}
            <div style={{ display: 'flex', marginBottom: 32, background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 4 }}>
              {(['login', 'register'] as Mode[]).map(m => (
                <button
                  key={m}
                  onClick={() => switchMode(m)}
                  style={{
                    flex: 1,
                    padding: '9px 0',
                    borderRadius: 9,
                    fontSize: 13,
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: mode === m ? 'var(--primary)' : 'transparent',
                    color: mode === m ? '#fff' : 'var(--text-secondary)',
                    boxShadow: mode === m ? '0 4px 14px rgba(59,130,246,0.3)' : 'none',
                  }}
                >
                  {m === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              ))}
            </div>

            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 700, marginBottom: 6, letterSpacing: '-0.02em' }}>
              {mode === 'login' ? 'Welcome back' : 'Get started'}
            </h2>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 28, lineHeight: 1.5 }}>
              {mode === 'login'
                ? 'Sign in to your trading terminal.'
                : 'Create your free account today.'}
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {mode === 'register' && (
                <Field label="Full Name" id="auth-name">
                  <input
                    id="auth-name"
                    type="text"
                    placeholder="Alex Thompson"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    autoComplete="name"
                    style={inputStyle}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                </Field>
              )}

              <Field label="Email Address" id="auth-email">
                <input
                  id="auth-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                  style={inputStyle}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                />
              </Field>

              <Field label="Password" id="auth-password">
                <div style={{ position: 'relative' }}>
                  <input
                    id="auth-password"
                    type={showPw ? 'text' : 'password'}
                    placeholder={mode === 'register' ? 'Min. 6 characters' : 'Your password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    style={{ ...inputStyle, paddingRight: 44 }}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(v => !v)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </Field>

              {/* Error */}
              {error && (
                <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.25)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#fb7185', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16 }}>⚠</span> {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  marginTop: 4,
                  padding: '13px 0',
                  background: loading ? 'rgba(59,130,246,0.5)' : 'var(--primary)',
                  color: '#fff',
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 700,
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: loading ? 'none' : '0 6px 20px rgba(59,130,246,0.35)',
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = '#2563eb'; }}
                onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = 'var(--primary)'; }}
              >
                {loading ? 'Please wait…' : mode === 'login' ? 'Sign In →' : 'Create Account →'}
              </button>
            </form>

            {/* Demo hint */}
            {mode === 'login' && (
              <p style={{ marginTop: 20, fontSize: 12, color: 'var(--text-secondary)', textAlign: 'center', lineHeight: 1.6 }}>
                No account yet?{' '}
                <button
                  onClick={() => switchMode('register')}
                  style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 12 }}
                >
                  Create one free
                </button>
              </p>
            )}
          </div>

          <p style={{ marginTop: 20, textAlign: 'center', fontSize: 11, color: 'var(--text-secondary)', opacity: 0.5, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Antigravity Terminal · Simulated Data Only
          </p>
        </div>
      </div>
    </div>
  );
};

/* ── Helpers ── */
const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  padding: '11px 14px',
  fontSize: 14,
  color: 'var(--text-primary)',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  fontFamily: "'Inter', sans-serif",
};

const focusStyle = (e: React.FocusEvent<HTMLInputElement>) => {
  e.currentTarget.style.borderColor = 'var(--primary)';
  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.15)';
};
const blurStyle = (e: React.FocusEvent<HTMLInputElement>) => {
  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
  e.currentTarget.style.boxShadow = 'none';
};

const Field: React.FC<{ label: string; id: string; children: React.ReactNode }> = ({ label, id, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <label htmlFor={id} style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
      {label}
    </label>
    {children}
  </div>
);

export default AuthPage;
