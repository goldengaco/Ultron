import React, { useState, useDeferredValue } from 'react';
import { Search, Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import { commands } from '../lib/tauri';

const RISK_COLORS = { low: '#22c55e', medium: '#f59e0b', high: '#ef4444', critical: '#dc2626' };
const RISK_BG = { low: 'rgba(34,197,94,0.1)', medium: 'rgba(245,158,11,0.1)', high: 'rgba(239,68,68,0.1)', critical: 'rgba(220,38,38,0.15)' };
const RISK_ICONS = { low: ShieldCheck, medium: Shield, high: ShieldAlert, critical: ShieldAlert };

export default function PortsCatalog() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (q) => {
    setQuery(q);
    if (!q.trim()) { setResults([]); return; }
    setLoading(true);
    try { setResults(await commands.searchPorts(q)); }
    catch { setResults([]); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 animate-fadeIn">
      <div className="flex items-center gap-2.5 px-4 h-11 rounded-xl border border-border-default transition-all focus-within:border-accent/40 focus-within:shadow-[0_0_16px_rgba(59,130,246,0.08)]" style={{ background: 'linear-gradient(180deg, #141b2b, #11161e)' }}>
        <Search size={16} className="text-text-muted shrink-0" />
        <input
          type="text"
          placeholder="Buscar por puerto (5432) o servicio (postgres)..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="flex-1 bg-transparent text-text-primary placeholder-text-muted/60 font-medium"
        />
      </div>

      {loading && <div className="flex items-center justify-center gap-2 py-6 text-text-muted text-sm"><div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" /> Buscando...</div>}

      {!loading && results.length === 0 && query && (
        <div className="text-center py-10 text-text-muted text-sm">Sin resultados para <span className="text-text-secondary font-medium">"{query}"</span></div>
      )}

      <div className="space-y-2">
        {results.map((row, i) => {
          const RiskIcon = RISK_ICONS[row.risk] || Shield;
          return (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-border-default transition-all hover:border-border-light animate-fadeIn" style={{ background: 'linear-gradient(180deg, #141b2b, #11161e)' }}>
              <div className="text-center min-w-[64px]">
                <div className="text-xl font-bold font-mono text-accent">{row.port}</div>
                <div className="text-[10px] text-text-muted font-mono uppercase tracking-wider bg-bg-tertiary px-1.5 py-0.5 rounded mt-0.5">{row.protocol}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5">
                  <span className="font-semibold text-text-primary">{row.service}</span>
                  {row.risk && (
                    <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: RISK_BG[row.risk], color: RISK_COLORS[row.risk] }}>
                      <RiskIcon size={10} /> {row.risk}
                    </span>
                  )}
                </div>
                <div className="text-sm text-text-muted mt-1">{row.description}</div>
              </div>
            </div>
          );
        })}
      </div>

      {!query && (
        <div className="text-center py-12 text-text-muted">
          <div className="text-5xl mb-4 opacity-10 font-mono">:8080</div>
          <p className="font-medium text-text-secondary">Busca puertos por número o nombre de servicio</p>
          <p className="text-sm mt-1">Ej: <span className="text-accent font-mono">5432</span>, <span className="text-accent font-mono">3306</span>, <span className="text-accent font-mono">443</span>, <span className="text-accent font-mono">postgres</span>, <span className="text-accent font-mono">mysql</span></p>
        </div>
      )}
    </div>
  );
}
