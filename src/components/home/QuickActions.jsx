import React from 'react';
import { TOOLS } from '../../tools/registry';

const HIGHLIGHTED_IDS = ['ip-public', 'ports-catalog', 'http-codes', 'subnet', 'terminal'];

export default function QuickActions({ onSelectTool }) {
  const tools = TOOLS.filter((t) => HIGHLIGHTED_IDS.includes(t.id));

  return (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '16px' }}>Acceso rápido</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onSelectTool(tool.id)}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
              padding: '20px', borderRadius: '10px', border: '1px solid var(--color-border-default)',
              background: 'var(--color-bg-secondary)', cursor: 'pointer',
              transition: 'all 0.2s', textAlign: 'center',
            }}
          >
            <tool.icon size={22} color="var(--color-accent)" />
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>{tool.name}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '4px', lineHeight: '1.4' }}>{tool.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
