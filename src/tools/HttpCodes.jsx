import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';

const HTTP_CODES = [
  { code: 100, name: 'Continue', category: '1xx', desc: 'El servidor ha recibido los headers y el cliente debe continuar.' },
  { code: 101, name: 'Switching Protocols', category: '1xx', desc: 'El servidor acepta cambiar de protocolo.' },
  { code: 200, name: 'OK', category: '2xx', desc: 'Petición exitosa.' },
  { code: 201, name: 'Created', category: '2xx', desc: 'Recurso creado exitosamente.' },
  { code: 204, name: 'No Content', category: '2xx', desc: 'Petición exitosa sin contenido.' },
  { code: 301, name: 'Moved Permanently', category: '3xx', desc: 'El recurso fue movido permanentemente.' },
  { code: 302, name: 'Found', category: '3xx', desc: 'Redirección temporal.' },
  { code: 304, name: 'Not Modified', category: '3xx', desc: 'Recurso no modificado.' },
  { code: 400, name: 'Bad Request', category: '4xx', desc: 'La petición es inválida.' },
  { code: 401, name: 'Unauthorized', category: '4xx', desc: 'Autenticación requerida.' },
  { code: 403, name: 'Forbidden', category: '4xx', desc: 'Sin permisos para el recurso.' },
  { code: 404, name: 'Not Found', category: '4xx', desc: 'El recurso no existe.' },
  { code: 405, name: 'Method Not Allowed', category: '4xx', desc: 'Método HTTP no permitido.' },
  { code: 408, name: 'Request Timeout', category: '4xx', desc: 'La petición excedió el tiempo de espera.' },
  { code: 409, name: 'Conflict', category: '4xx', desc: 'Conflicto con el estado actual.' },
  { code: 429, name: 'Too Many Requests', category: '4xx', desc: 'Rate limit excedido.' },
  { code: 500, name: 'Internal Server Error', category: '5xx', desc: 'Error interno del servidor.' },
  { code: 502, name: 'Bad Gateway', category: '5xx', desc: 'El gateway recibió respuesta inválida.' },
  { code: 503, name: 'Service Unavailable', category: '5xx', desc: 'Servicio no disponible temporalmente.' },
  { code: 504, name: 'Gateway Timeout', category: '5xx', desc: 'El gateway excedió el tiempo de espera.' },
];

const CATEGORIES = [
  { key: '1xx', label: 'Informativos', color: '#3b82f6' },
  { key: '2xx', label: 'Éxito', color: '#22c55e' },
  { key: '3xx', label: 'Redirección', color: '#f59e0b' },
  { key: '4xx', label: 'Error del cliente', color: '#ef4444' },
  { key: '5xx', label: 'Error del servidor', color: '#dc2626' },
];

export default function HttpCodes() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return HTTP_CODES;
    const q = query.toLowerCase();
    return HTTP_CODES.filter((c) => c.code.toString().includes(q) || c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q));
  }, [query]);

  const grouped = useMemo(() => {
    const map = new Map();
    CATEGORIES.forEach((cat) => map.set(cat.key, []));
    filtered.forEach((c) => { if (map.has(c.category)) map.get(c.category).push(c); });
    return CATEGORIES.filter((cat) => map.get(cat.key).length > 0).map((cat) => ({ ...cat, codes: map.get(cat.key) }));
  }, [filtered]);

  return (
    <div className="max-w-3xl mx-auto space-y-5 animate-fadeIn">
      <div className="flex items-center gap-2.5 px-4 h-11 rounded-xl border border-border-default transition-all focus-within:border-accent/40 focus-within:shadow-[0_0_16px_rgba(59,130,246,0.08)]" style={{ background: 'linear-gradient(180deg, #141b2b, #11161e)' }}>
        <Search size={16} className="text-text-muted shrink-0" />
        <input type="text" placeholder="Buscar por código o nombre (ej: 404, not found)..." value={query} onChange={(e) => setQuery(e.target.value)} className="flex-1 bg-transparent text-text-primary placeholder-text-muted/60 font-medium" />
      </div>

      {grouped.map((group) => (
        <div key={group.key}>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-1 h-5 rounded-full" style={{ background: group.color }} />
            <span className="text-sm font-semibold text-text-primary">{group.label}</span>
            <span className="text-xs text-text-muted">({group.codes.length})</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {group.codes.map((c) => (
              <div key={c.code} className="p-3.5 rounded-xl border border-border-default transition-all duration-150 cursor-pointer" style={{ background: 'linear-gradient(180deg, #141b2b, #11161e)' }} onClick={() => setSelected(selected?.code === c.code ? null : c)} onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${group.color}40`; e.currentTarget.style.boxShadow = `0 2px 12px ${group.color}10`; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border-default)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold font-mono shrink-0" style={{ color: group.color }}>{c.code}</span>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-text-primary">{c.name}</div>
                    {selected?.code === c.code && <div className="text-xs text-text-muted mt-1.5 leading-relaxed">{c.desc}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
