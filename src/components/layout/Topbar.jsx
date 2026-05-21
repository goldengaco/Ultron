import React from 'react';
import { Search, Menu } from 'lucide-react';

export default function Topbar({ activeTool, isSidebarOpen, onToggleSidebar, searchQuery, setSearchQuery, filteredTools, onSelectTool, onPaletteOpen }) {
  return (
    <header style={{
      height: '64px', background: 'var(--color-bg-primary)',
      borderBottom: '1px solid var(--color-border-default)',
      display: 'flex', alignItems: 'center', padding: '0 24px',
      justifyContent: 'space-between', flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Menu size={22} color="var(--color-text-muted)" style={{ cursor: 'pointer', flexShrink: 0 }} onClick={onToggleSidebar} />
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border-default)',
          borderRadius: '8px', padding: '8px 16px', width: '400px', transition: 'border-color 0.2s',
        }}>
          <Search size={18} color="var(--color-text-muted)" />
          <input
            type="text"
            placeholder="Buscar por modulo, acronimo, error o proveedor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && filteredTools.length > 0) { onSelectTool(filteredTools[0].id); } }}
            onClick={onPaletteOpen}
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-primary)', fontSize: '0.9rem', width: '100%' }}
          />
          <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--color-border-default)', flexShrink: 0 }}>Ctrl+K</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexShrink: 0 }}>
        {activeTool && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>{activeTool.name}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.7px' }}>{activeTool.category}</span>
          </div>
        )}
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%',
          background: 'var(--color-accent)', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          color: '#121212', fontWeight: 'bold', fontSize: '0.8rem',
        }}>
          U
        </div>
      </div>
    </header>
  );
}
