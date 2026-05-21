import React, { useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

export default function TerminalTool() {
  const containerRef = useRef(null);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 px-3 h-10 border-b border-border-default bg-bg-secondary shrink-0">
        <Terminal size={16} className="text-text-muted" />
        <span className="text-sm text-text-secondary font-medium">Terminal</span>
        <span className="text-xs text-text-muted ml-auto">PowerShell</span>
      </div>
      <div
        ref={containerRef}
        className="flex-1 bg-black p-4 font-mono text-sm text-green-400 overflow-y-auto"
        style={{ background: '#0a0a0a' }}
      >
        <div className="space-y-2">
          <div className="text-green-400/70">Terminal Ultron v1.0.0</div>
          <div className="text-green-400/70">PS C:\Users\Ultron&gt; <span className="animate-pulse">_</span></div>
          <div className="text-text-muted text-xs mt-4">
            La terminal real estará disponible cuando el backend Rust esté conectado.
            <br />
            Ejecuta <span className="text-accent font-mono">cargo tauri dev</span> para activarla.
          </div>
        </div>
      </div>
    </div>
  );
}
