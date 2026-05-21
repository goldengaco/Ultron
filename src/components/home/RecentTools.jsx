import React from 'react';
import { Star } from 'lucide-react';
import useAppStore from '../../stores/appStore';
import { TOOLS } from '../../tools/registry';
import { commands } from '../../lib/tauri';

export default function RecentTools({ onSelectTool }) {
  const recentTools = useAppStore((s) => s.recentTools);
  const favorites = useAppStore((s) => s.favorites);
  const setFavorites = useAppStore((s) => s.setFavorites);

  const recent = recentTools.map((id) => TOOLS.find((t) => t.id === id)).filter(Boolean).slice(0, 6);

  if (recent.length === 0 && favorites.length === 0) return null;

  return (
    <div>
      {favorites.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '12px' }}>Favoritos</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {favorites.map((id) => {
              const tool = TOOLS.find((t) => t.id === id);
              if (!tool) return null;
              return (
                <div
                  key={id}
                  onClick={() => onSelectTool(id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '6px 14px', borderRadius: '999px', fontSize: '0.85rem',
                    background: 'rgba(138,180,248,0.08)', color: 'var(--color-accent)',
                    border: '1px solid rgba(138,180,248,0.16)', cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <tool.icon size={14} />
                  {tool.name}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {recent.length > 0 && (
        <div>
          <h2 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '12px' }}>Recientes</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {recent.map((tool) => (
              <div
                key={tool.id}
                onClick={() => onSelectTool(tool.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '6px 14px', borderRadius: '999px', fontSize: '0.85rem',
                  color: 'var(--color-text-muted)', cursor: 'pointer',
                  border: '1px solid var(--color-border-default)', background: 'var(--color-bg-secondary)',
                  transition: 'all 0.2s',
                }}
              >
                <tool.icon size={14} />
                {tool.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
