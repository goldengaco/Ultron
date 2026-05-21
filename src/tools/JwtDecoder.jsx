import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';

export default function JwtDecoder() {
  const [token, setToken] = useState('');
  const [copiedHeader, setCopiedHeader] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);

  const decoded = useMemo(() => {
    try {
      const parts = token.trim().split('.');
      if (parts.length !== 3) return null;
      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));
      return { header, payload, signature: parts[2] };
    } catch {
      return null;
    }
  }, [token]);

  const handleCopy = async (text, setter) => {
    try {
      await navigator.clipboard.writeText(text);
      setter(true);
      setTimeout(() => setter(false), 2000);
    } catch {}
  };

  const JsonBlock = ({ data, label, onCopy, copied }) => (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-text-muted">{label}</span>
        <button onClick={onCopy} className="flex items-center gap-1 text-xs text-text-muted hover:text-text-secondary cursor-pointer">
          {copied ? <Check size={12} color="var(--color-success)" /> : <Copy size={12} />}
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>
      <pre className="w-full p-3 rounded-lg border border-border-default bg-bg-primary text-text-primary font-mono text-sm overflow-x-auto whitespace-pre-wrap">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <textarea
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Pega tu JWT aquí..."
        rows={4}
        className="w-full p-3 rounded-lg border border-border-default bg-bg-secondary text-text-primary placeholder-text-muted resize-none font-mono text-sm"
      />

      {!decoded && token && (
        <div className="text-error text-sm">Token JWT inválido. Debe tener formato header.payload.signature</div>
      )}

      {decoded && (
        <div className="space-y-4">
          <JsonBlock
            label="HEADER"
            data={decoded.header}
            onCopy={() => handleCopy(JSON.stringify(decoded.header, null, 2), setCopiedHeader)}
            copied={copiedHeader}
          />
          <JsonBlock
            label="PAYLOAD"
            data={decoded.payload}
            onCopy={() => handleCopy(JSON.stringify(decoded.payload, null, 2), setCopiedPayload)}
            copied={copiedPayload}
          />
          <div>
            <div className="text-xs text-text-muted mb-1">SIGNATURE</div>
            <div className="p-3 rounded-lg border border-border-default bg-bg-primary text-text-muted font-mono text-sm break-all">
              {decoded.signature}
            </div>
          </div>
        </div>
      )}

      {!token && (
        <div className="text-center py-12 text-text-muted">
          <div className="text-5xl mb-3 opacity-20">🔐</div>
          <p>Pega un token JWT para inspeccionar su contenido</p>
        </div>
      )}
    </div>
  );
}
