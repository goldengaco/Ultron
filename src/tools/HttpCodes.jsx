import React, { useState, useMemo, useEffect } from 'react';
import { Search, AlertCircle, Wrench } from 'lucide-react';
import { commands } from '../lib/tauri';

const CATEGORIES = [
  { key: '1xx', label: 'Informativos', color: '#3b82f6' },
  { key: '2xx', label: 'Éxito', color: '#22c55e' },
  { key: '3xx', label: 'Redirección', color: '#f59e0b' },
  { key: '4xx', label: 'Error del cliente', color: '#ef4444' },
  { key: '5xx', label: 'Error del servidor', color: '#dc2626' },
];

export default function HttpCodes() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [httpCodes, setHttpCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    commands.getAllHttpCodes()
      .then((data) => {
        setHttpCodes(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load HTTP codes:', err);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return httpCodes;
    const q = query.toLowerCase();
    return httpCodes.filter((c) => 
      c.code.toString().includes(q) || 
      c.name.toLowerCase().includes(q) || 
      (c.description || c.desc || '').toLowerCase().includes(q)
    );
  }, [query, httpCodes]);

  const grouped = useMemo(() => {
    const map = new Map();
    CATEGORIES.forEach((cat) => map.set(cat.key, []));
    filtered.forEach((c) => { 
      if (map.has(c.category)) map.get(c.category).push(c); 
    });
    return CATEGORIES.filter((cat) => map.get(cat.key).length > 0).map((cat) => ({ 
      ...cat, 
      codes: map.get(cat.key) 
    }));
  }, [filtered]);

  return (
    <div className="max-w-3xl mx-auto space-y-5 animate-fadeIn">
      {/* Search Bar */}
      <div className="flex items-center gap-2.5 px-4 h-11 rounded-xl border border-border-default bg-bg-secondary/40 transition-all focus-within:border-accent/40 focus-within:shadow-[0_0_16px_var(--bg-elevated)]">
        <Search size={16} className="text-text-muted shrink-0" />
        <input 
          type="text" 
          placeholder="Buscar por código o nombre (ej: 404, not found)..." 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          className="flex-1 bg-transparent text-text-primary placeholder-text-muted/60 font-medium" 
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-12 text-text-muted text-sm bg-bg-secondary/10 border border-border-default/40 rounded-xl">
          <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" /> 
          Cargando códigos HTTP...
        </div>
      ) : grouped.length === 0 ? (
        <div className="py-12 text-center text-text-muted bg-bg-secondary/10 border border-border-default/40 rounded-xl">
          No se encontraron códigos HTTP que coincidan con la búsqueda.
        </div>
      ) : (
        grouped.map((group) => (
          <div key={group.key}>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-1 h-5 rounded-full" style={{ background: group.color }} />
              <span className="text-sm font-semibold text-text-primary">{group.label}</span>
              <span className="text-xs text-text-muted">({group.codes.length})</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {group.codes.map((c) => {
                const isSelected = selected?.code === c.code;
                return (
                  <div 
                    key={c.code} 
                    className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                      isSelected 
                        ? 'sm:col-span-2 border-accent bg-bg-surface shadow-[0_4px_24px_rgba(0,0,0,0.25)]' 
                        : 'border-border-default bg-bg-secondary/30 hover:bg-bg-surface/50 hover:border-accent-hover/30'
                    }`} 
                    onClick={() => setSelected(isSelected ? null : c)}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-xl font-bold font-mono shrink-0 mt-0.5" style={{ color: group.color }}>
                        {c.code}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-text-primary">{c.name}</span>
                          {!isSelected && (
                            <span className="text-[10px] text-text-muted bg-bg-primary/30 px-1.5 py-0.5 rounded font-mono">
                              Detalles
                            </span>
                          )}
                        </div>
                        
                        {!isSelected && (
                          <div className="text-xs text-text-secondary mt-1 line-clamp-1">
                            {c.description || c.desc}
                          </div>
                        )}
                        
                        {isSelected && (
                          <div className="text-xs mt-3.5 pt-3.5 border-t border-border-default/30 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 leading-relaxed animate-fadeIn">
                            <div className="space-y-3">
                              <div>
                                <span className="font-semibold text-text-secondary block mb-1 text-[10px] uppercase tracking-wider">
                                  Descripción:
                                </span>
                                <p className="text-text-primary bg-bg-primary/40 p-2.5 rounded-lg border border-border-default/20">
                                  {c.description || c.desc}
                                </p>
                              </div>
                              
                              {c.common_causes && c.common_causes.length > 0 && c.common_causes[0] !== 'N/A' && (
                                <div>
                                  <span className="font-semibold text-text-secondary flex items-center gap-1.5 mb-1 text-[10px] uppercase tracking-wider">
                                    <AlertCircle size={12} className="text-error" /> Causas Comunes:
                                  </span>
                                  <ul className="list-disc list-inside pl-1 text-text-primary/90 space-y-1 bg-bg-primary/40 p-2.5 rounded-lg border border-border-default/20">
                                    {c.common_causes.map((cause, i) => (
                                      <li key={i} className="pl-1 text-text-primary/90">{cause}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>

                            <div className="space-y-3">
                              {c.troubleshooting && c.troubleshooting.length > 0 && c.troubleshooting[0] !== 'N/A' && (
                                <div>
                                  <span className="font-semibold text-text-secondary flex items-center gap-1.5 mb-1 text-[10px] uppercase tracking-wider">
                                    <Wrench size={12} className="text-success" /> Solución / Troubleshooting:
                                  </span>
                                  <ul className="list-disc list-inside pl-1 text-text-primary/90 space-y-1 bg-bg-primary/40 p-2.5 rounded-lg border border-border-default/20">
                                    {c.troubleshooting.map((step, i) => (
                                      <li key={i} className="pl-1 text-text-primary/90">{step}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
