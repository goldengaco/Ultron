import React, { useMemo, useState } from 'react';
import { Hexagon, Search, Star } from 'lucide-react';
import useAppStore from '../../stores/appStore';
import { commands } from '../../lib/tauri';
import { TOOLS } from '../../tools/registry';

export default function Sidebar({ tools, filteredTools, activeToolId, onSelectTool }) {
  const [localQuery, setLocalQuery] = useState('');
  const favorites = useAppStore((s) => s.favorites);
  const setFavorites = useAppStore((s) => s.setFavorites);

  const grouped = useMemo(() => {
    const map = new Map();
    const source = localQuery ? filteredTools : tools;
    source.forEach((t) => {
      if (!map.has(t.category)) map.set(t.category, []);
      map.get(t.category).push(t);
    });
    return [...map.entries()].map(([cat, ts]) => ({ category: cat, tools: ts }));
  }, [tools, filteredTools, localQuery]);

  const toggleFavorite = async (id, e) => {
    e.stopPropagation();
    const isFav = favorites.includes(id);
    try {
      if (isFav) await commands.removeFavorite(id);
      else await commands.addFavorite(id);
      const updated = await commands.getFavorites();
      setFavorites(updated);
    } catch {}
  };

  return (
    <>
      <div style={{ height: '64px', display: 'flex', alignItems: 'center', padding: '0 24px', borderBottom: '1px solid var(--color-border-default)', gap: '12px', fontWeight: 600, fontSize: '1.2rem', letterSpacing: '0.5px', color: '#fff', flexShrink: 0 }}>
        <Hexagon fill="#8ab4f8" color="#8ab4f8" size={24} />
        <span>Ultron Hub</span>
      </div>

      <div style={{ padding: '12px 16px', flexShrink: 0 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          background: 'var(--color-bg-primary)', border: '1px solid var(--color-border-default)',
          borderRadius: '8px', padding: '8px 14px', transition: 'border-color 0.2s',
        }}>
          <Search size={16} color="var(--color-text-muted)" />
          <input
            type="text"
            placeholder="Filtrar herramientas..."
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-primary)', fontSize: '0.9rem' }}
          />
        </div>
      </div>

      {favorites.length > 0 && (
        <div style={{ padding: '4px 16px 8px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-muted)', fontWeight: 600 }}>
            <Star size={12} /> Favoritos
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {favorites.slice(0, 5).map((id) => {
              const t = TOOLS.find((x) => x.id === id);
              if (!t) return null;
              return (
                <div key={id} onClick={() => onSelectTool(id)} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '3px 8px', borderRadius: '999px', fontSize: '0.78rem', background: 'rgba(138,180,248,0.08)', color: 'var(--color-accent)', border: '1px solid rgba(138,180,248,0.16)', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <t.icon size={12} /> {t.name}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 12px 16px' }}>
        <div
          onClick={() => onSelectTool('home')}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px',
            borderRadius: '8px', cursor: 'pointer', fontSize: '0.95rem', marginBottom: '4px',
            transition: 'all 0.2s', color: activeToolId === 'home' ? 'var(--color-accent)' : 'var(--color-text-muted)',
            background: activeToolId === 'home' ? 'rgba(138,180,248,0.1)' : 'transparent',
            fontWeight: activeToolId === 'home' ? 500 : 400,
          }}
        >
          <Hexagon size={18} />
          Inicio
        </div>

        {grouped.map((group) => (
          <div key={group.category}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '16px 0 8px', padding: '0 12px' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-muted)', fontWeight: 600 }}>{group.category}</span>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', padding: '2px 8px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)' }}>{group.tools.length}</span>
            </div>

            {group.tools.map((tool) => (
              <div
                key={tool.id}
                onClick={() => onSelectTool(tool.id)}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '10px 12px',
                  borderRadius: '8px', cursor: 'pointer', fontSize: '0.95rem', marginBottom: '4px',
                  transition: 'all 0.2s', position: 'relative',
                  color: activeToolId === tool.id ? 'var(--color-accent)' : 'var(--color-text-muted)',
                  background: activeToolId === tool.id ? 'rgba(138,180,248,0.1)' : 'transparent',
                  fontWeight: activeToolId === tool.id ? 500 : 400,
                }}
              >
                <tool.icon size={18} style={{ flexShrink: 0, marginTop: '1px' }} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ color: 'inherit', lineHeight: '1.35' }}>{tool.name}</div>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem', lineHeight: '1.45', marginTop: '2px' }}>{tool.description}</div>
                </div>
                <div
                  onClick={(e) => toggleFavorite(tool.id, e)}
                  style={{ flexShrink: 0, opacity: favorites.includes(tool.id) ? 1 : 0, transition: 'opacity 0.2s', marginTop: '2px', cursor: 'pointer', color: favorites.includes(tool.id) ? 'var(--color-warning)' : 'var(--color-text-muted)' }}
                  title={favorites.includes(tool.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                >
                  <Star size={14} fill={favorites.includes(tool.id) ? 'var(--color-warning)' : 'none'} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </nav>

      <div style={{ padding: '12px 20px', borderTop: '1px solid var(--color-border-default)', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-success)' }} />
        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Sistema listo</span>
      </div>
    </>
  );
}
