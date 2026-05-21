import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search } from 'lucide-react';

export default function CommandPalette({ tools, onSelect, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return tools;
    const q = query.toLowerCase();
    return tools.filter((t) => t.name.toLowerCase().includes(q) || (t.description || '').toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
  }, [tools, query]);

  useEffect(() => {
    inputRef.current?.focus();
    setSelectedIdx(0);
  }, []);

  useEffect(() => {
    const handle = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIdx((i) => Math.min(i + 1, filtered.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIdx((i) => Math.max(i - 1, 0)); }
      if (e.key === 'Enter' && filtered[selectedIdx]) onSelect(filtered[selectedIdx].id);
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [onClose, onSelect, filtered, selectedIdx]);

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '15vh', background: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <div
        style={{ width: '100%', maxWidth: '540px', borderRadius: '12px', border: '1px solid var(--color-border-default)', background: 'var(--color-bg-secondary)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', overflow: 'hidden' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 16px', height: '52px', borderBottom: '1px solid var(--color-border-default)' }}>
          <Search size={18} color="var(--color-text-muted)" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar herramientas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-primary)', fontSize: '0.95rem' }}
          />
        </div>

        <div style={{ maxHeight: '320px', overflowY: 'auto', padding: '4px 0' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
              {query ? `Sin resultados para "${query}"` : 'Escribe para buscar herramientas...'}
            </div>
          ) : (
            filtered.map((tool, i) => (
              <div
                key={tool.id}
                onClick={() => onSelect(tool.id)}
                onMouseEnter={() => setSelectedIdx(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', cursor: 'pointer',
                  transition: 'all 0.15s',
                  background: i === selectedIdx ? 'rgba(138,180,248,0.08)' : 'transparent',
                  color: i === selectedIdx ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                }}
              >
                <tool.icon size={18} style={{ flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 500, color: i === selectedIdx ? 'var(--color-accent)' : 'var(--color-text-primary)' }}>{tool.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>{tool.description}</div>
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', padding: '2px 8px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', flexShrink: 0 }}>{tool.category}</span>
              </div>
            ))
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '0 16px', height: '36px', borderTop: '1px solid var(--color-border-default)', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
          <span><span style={{ color: 'var(--color-text-secondary)' }}>↑↓</span> Navegar</span>
          <span><span style={{ color: 'var(--color-text-secondary)' }}>Enter</span> Seleccionar</span>
          <span><span style={{ color: 'var(--color-text-secondary)' }}>Esc</span> Cerrar</span>
        </div>
      </div>
    </div>
  );
}
