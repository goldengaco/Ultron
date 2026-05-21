import React, { useState, useMemo } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function uuidv7() {
  const now = Date.now();
  const hex = now.toString(16).padStart(12, '0');
  const rest = 'xxxxxxxx-xxxx'.replace(/x/g, () => ((Math.random() * 16) | 0).toString(16));
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-7xxx-${rest}`.replace(/x/g, () => ((Math.random() * 16) | 0).toString(16));
}

export default function UuidGenerator() {
  const [count, setCount] = useState(1);
  const [version, setVersion] = useState('v4');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const uuids = useMemo(() => {
    const fn = version === 'v4' ? uuidv4 : uuidv7;
    return Array.from({ length: Math.min(count, 100) }, () => fn());
  }, [count, version]);

  const handleCopy = async (uuid, idx) => {
    try {
      await navigator.clipboard.writeText(uuid);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {}
  };

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(uuids.join('\n'));
      setCopiedIndex('all');
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {}
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <button
            className={`px-3 py-1.5 rounded-md text-sm font-medium cursor-pointer transition-colors ${
              version === 'v4' ? 'bg-accent text-bg-primary' : 'bg-bg-tertiary text-text-secondary'
            }`}
            onClick={() => setVersion('v4')}
          >
            UUID v4
          </button>
          <button
            className={`px-3 py-1.5 rounded-md text-sm font-medium cursor-pointer transition-colors ${
              version === 'v7' ? 'bg-accent text-bg-primary' : 'bg-bg-tertiary text-text-secondary'
            }`}
            onClick={() => setVersion('v7')}
          >
            UUID v7
          </button>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <label className="text-xs text-text-muted">Cantidad:</label>
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
            className="w-16 px-2 h-8 rounded-md border border-border-default bg-bg-secondary text-text-primary text-sm font-mono text-center"
          />
          <button
            onClick={() => setCount((c) => c)}
            className="flex items-center gap-1 px-2 h-8 rounded-md text-xs text-text-muted hover:text-text-secondary border border-border-default cursor-pointer"
          >
            <RefreshCw size={12} /> Generar
          </button>
          <button
            onClick={handleCopyAll}
            className="flex items-center gap-1 px-2 h-8 rounded-md text-xs text-text-muted hover:text-text-secondary border border-border-default cursor-pointer"
          >
            {copiedIndex === 'all' ? <Check size={12} color="var(--color-success)" /> : <Copy size={12} />}
            {copiedIndex === 'all' ? 'Copiados' : 'Copiar todos'}
          </button>
        </div>
      </div>

      <div className="space-y-1">
        {uuids.map((uuid, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-3 py-2 rounded-lg border border-border-default bg-bg-secondary hover:bg-bg-tertiary cursor-pointer group"
            onClick={() => handleCopy(uuid, i)}
          >
            <span className="font-mono text-sm text-text-primary">{uuid}</span>
            <span className="text-text-muted group-hover:text-text-secondary">
              {copiedIndex === i ? <Check size={14} color="var(--color-success)" /> : <Copy size={14} />}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
