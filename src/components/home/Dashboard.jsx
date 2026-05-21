import React from 'react';
import { Hexagon } from 'lucide-react';
import PublicIpWidget from './PublicIpWidget';
import QuickActions from './QuickActions';
import RecentTools from './RecentTools';

export default function Dashboard({ onSelectTool }) {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }} className="animate-fadeIn">
      <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '14px' }}>
        <Hexagon fill="#8ab4f8" color="#8ab4f8" size={28} />
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>Ultron</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>
            Centro de operaciones técnicas — herramientas esenciales para redes, APIs y plataforma
          </p>
        </div>
      </div>

      <PublicIpWidget />
      <QuickActions onSelectTool={onSelectTool} />
      <RecentTools onSelectTool={onSelectTool} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid var(--color-border-default)', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
        <span>Ultron v1.0.0</span>
        <span>·</span>
        <span>Tauri + Rust + DuckDB</span>
        <span>·</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-success)' }} />
          Listo
        </div>
      </div>
    </div>
  );
}
