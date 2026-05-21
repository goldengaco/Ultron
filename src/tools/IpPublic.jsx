import React, { useEffect, useState, useCallback } from 'react';
import { RotateCcw, Copy, Check, Globe, MapPin, Building2 } from 'lucide-react';
import { commands } from '../lib/tauri';

function getFlagEmoji(code) {
  if (!code || code.length !== 2) return '';
  return String.fromCodePoint(0x1f1e6 + code.charCodeAt(0) - 65, 0x1f1e6 + code.charCodeAt(1) - 65);
}

export default function IpPublic() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(false);
    try { setData(await commands.getPublicIp()); }
    catch { setError(true); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const handleCopy = async () => {
    if (data?.ip) {
      try {
        await navigator.clipboard.writeText(data.ip);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {}
    }
  };

  const flag = getFlagEmoji(data?.country_code);

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
      <div className="rounded-2xl border border-border-light p-6" style={{
        background: 'linear-gradient(135deg, #141b2b 0%, #1a2030 100%)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      }}>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10">
              <Globe size={16} className="text-accent" />
            </div>
            <h2 className="text-base font-semibold text-text-primary">IP Pública</h2>
          </div>
          <button onClick={fetch} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-text-muted hover:text-text-primary hover:bg-bg-hover border border-border-default transition-all cursor-pointer">
            <RotateCcw size={13} className={loading ? 'animate-spin' : ''} /> Actualizar
          </button>
        </div>

        {loading && !data ? (
          <div className="flex items-center gap-3 py-8 text-text-muted">
            <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">Consultando IP pública...</span>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <div className="text-text-muted text-sm mb-3">No se pudo obtener la IP</div>
            <button onClick={fetch} className="px-4 py-2 rounded-lg text-sm font-medium bg-accent/10 text-accent hover:bg-accent/20 border border-accent/20 transition-all cursor-pointer">Reintentar</button>
          </div>
        ) : data ? (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold tracking-tight text-accent font-mono">{data.ip}</span>
              <button onClick={handleCopy} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-border-default text-text-muted hover:text-text-primary hover:bg-bg-hover transition-all cursor-pointer">
                {copied ? <Check size={13} className="text-success" /> : <Copy size={13} />}
                {copied ? 'Copiado' : 'Copiar'}
              </button>
            </div>

            <div className="flex items-center gap-4 text-sm">
              {flag && <span className="text-xl">{flag}</span>}
              <span className="text-text-secondary">{data.city && data.country ? `${data.city}, ${data.country}` : 'Desconocida'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: MapPin, label: 'Región', value: data.region },
                { icon: Building2, label: 'ISP', value: data.isp },
                { icon: Building2, label: 'ASN', value: data.asn },
                { icon: Globe, label: 'País', value: data.country },
              ].filter((i) => i.value).map((item) => (
                <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-bg-secondary border border-border-default">
                  <item.icon size={16} className="text-text-muted shrink-0" />
                  <div>
                    <div className="text-[11px] text-text-muted font-medium">{item.label}</div>
                    <div className="text-sm text-text-primary font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
