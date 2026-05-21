import React, { useState } from 'react';
import { ArrowLeftRight, Copy, Check } from 'lucide-react';

export default function Base64Decoder() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('decode');
  const [copied, setCopied] = useState(false);

  const output = React.useMemo(() => {
    try {
      if (mode === 'decode') {
        return atob(input);
      } else {
        return btoa(input);
      }
    } catch {
      return 'Error: entrada inválida';
    }
  }, [input, mode]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center gap-2">
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors ${
            mode === 'decode' ? 'bg-accent text-bg-primary' : 'bg-bg-tertiary text-text-secondary hover:bg-border-default'
          }`}
          onClick={() => setMode('decode')}
        >
          Decodificar
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors ${
            mode === 'encode' ? 'bg-accent text-bg-primary' : 'bg-bg-tertiary text-text-secondary hover:bg-border-default'
          }`}
          onClick={() => setMode('encode')}
        >
          Codificar
        </button>
        <ArrowLeftRight
          size={16}
          className="text-text-muted ml-auto cursor-pointer hover:text-text-secondary"
          onClick={() => { setInput(output !== 'Error: entrada inválida' ? output : ''); setMode(mode === 'decode' ? 'encode' : 'decode'); }}
        />
      </div>

      <div>
        <label className="text-xs text-text-muted mb-1 block">
          {mode === 'decode' ? 'Texto en Base64' : 'Texto plano'}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'decode' ? 'Pega el Base64 aquí...' : 'Escribe el texto a codificar...'}
          rows={5}
          className="w-full p-3 rounded-lg border border-border-default bg-bg-secondary text-text-primary placeholder-text-muted resize-none font-mono text-sm"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs text-text-muted">
            {mode === 'decode' ? 'Texto decodificado' : 'Base64 resultante'}
          </label>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-text-muted hover:text-text-secondary cursor-pointer"
          >
            {copied ? <Check size={12} color="var(--color-success)" /> : <Copy size={12} />}
            {copied ? 'Copiado' : 'Copiar'}
          </button>
        </div>
        <textarea
          value={output}
          readOnly
          rows={5}
          className="w-full p-3 rounded-lg border border-border-default bg-bg-primary text-text-primary font-mono text-sm resize-none"
        />
      </div>
    </div>
  );
}
