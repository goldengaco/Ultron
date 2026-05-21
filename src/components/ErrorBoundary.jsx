import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '16px', color: 'var(--color-text-muted)' }}>
          <AlertTriangle size={40} color="var(--color-error)" />
          <span style={{ color: 'var(--color-error)', fontWeight: 500, fontSize: '0.95rem' }}>Error al cargar la herramienta</span>
          <button
            style={{ padding: '8px 20px', borderRadius: '6px', border: '1px solid var(--color-border-default)', color: 'var(--color-text-secondary)', cursor: 'pointer', background: 'transparent', fontSize: '0.85rem' }}
            onClick={() => this.setState({ error: null })}
          >
            Reintentar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
