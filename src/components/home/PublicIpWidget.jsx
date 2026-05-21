import React, { useEffect, useState, useCallback } from 'react';
import { RotateCcw, Copy, Check } from 'lucide-react';
import { commands } from '../../lib/tauri';

function getFlagEmoji(code) {
  if (!code || code.length !== 2) return '';
  return String.fromCodePoint(0x1f1e6 + code.charCodeAt(0) - 65, 0x1f1e6 + code.charCodeAt(1) - 65);
}

export default function PublicIpWidget() {
  const [ipData, setIpData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchIp = useCallback(async () => {
    setLoading(true);
    setError(false);
    try { setIpData(await commands.getPublicIp()); }
    catch { setError(true); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    fetchIp();
    const interval = setInterval(fetchIp, 300000);
    return () => clearInterval(interval);
  }, [fetchIp]);

  const handleCopy = async () => {
    if (ipData?.ip) {
      try {
        await navigator.clipboard.writeText(ipData.ip);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {}
    }
  };

  return (
    <div style={{
      background: 'var(--color-bg-secondary)',
      border: '1px solid var(--color-border-default)',
      borderRadius: '12px', padding: '24px', marginBottom: '32px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>IP Pública</div>
        <button onClick={fetchIp} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--color-text-muted)', cursor: 'pointer', background: 'none', border: 'none', transition: 'color 0.2s' }}>
          <RotateCcw size={14} /> Actualizar
        </button>
      </div>

      {loading && !ipData ? (
        <div style={{ color: 'var(--color-text-muted)', padding: '12px 0', fontSize: '0.9rem' }}>Obteniendo IP...</div>
      ) : error ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0' }}>
          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>No disponible</span>
          <button onClick={fetchIp} style={{ padding: '6px 16px', fontSize: '0.85rem', borderRadius: '6px', border: '1px solid var(--color-border-default)', color: 'var(--color-text-muted)', cursor: 'pointer', background: 'transparent' }}>Reintentar</button>
        </div>
      ) : ipData ? (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--color-accent)', letterSpacing: '-0.5px' }}>{ipData.ip}</span>
            <button onClick={handleCopy} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '6px', fontSize: '0.8rem', border: '1px solid var(--color-border-default)', color: 'var(--color-text-muted)', cursor: 'pointer', background: 'transparent', transition: 'all 0.2s' }}>
              {copied ? <Check size={14} color="var(--color-success)" /> : <Copy size={14} />}
              {copied ? 'Copiado' : 'Copiar'}
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
            {getFlagEmoji(ipData.country_code) && <span style={{ fontSize: '1.2rem' }}>{getFlagEmoji(ipData.country_code)}</span>}
            <span>{[ipData.city, ipData.region, ipData.country].filter(Boolean).join(', ') || 'Ubicación desconocida'}</span>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '6px' }}>
            {ipData.isp && <span>{ipData.isp}</span>}
            {ipData.asn && <span style={{ marginLeft: '8px' }}>• {ipData.asn}</span>}
          </div>
        </div>
      ) : null}
    </div>
  );
}
