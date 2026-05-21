import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';

const GLOSSARY = [
  { term: 'API Gateway', category: 'cloud', def: 'Servicio que actúa como intermediario entre clientes y servicios backend, manejando autenticación, rate limiting y enrutamiento.' },
  { term: 'CIDR', category: 'network', def: 'Classless Inter-Domain Routing — notación para definir rangos de IP (ej: 192.168.1.0/24).' },
  { term: 'DNS', category: 'network', def: 'Domain Name System — traduce nombres de dominio a direcciones IP.' },
  { term: 'JWT', category: 'security', def: 'JSON Web Token — estándar para transmitir claims entre partes como un objeto JSON firmado.' },
  { term: 'OAuth 2.0', category: 'security', def: 'Protocolo de autorización que permite acceso delegado a recursos sin compartir credenciales.' },
  { term: 'OIDC', category: 'security', def: 'OpenID Connect — capa de identidad sobre OAuth 2.0 para autenticación de usuarios.' },
  { term: 'TLS', category: 'security', def: 'Transport Layer Security — protocolo criptográfico para comunicaciones seguras en redes.' },
  { term: 'VPC', category: 'cloud', def: 'Virtual Private Cloud — red virtual aislada dentro de un proveedor cloud (GCP: VPC, AWS: VPC, Azure: VNet).' },
  { term: 'Subnet', category: 'network', def: 'Subdivisión lógica de una red IP. En GCP: subredes regionales, en AWS: subredes por AZ.' },
  { term: 'Load Balancer', category: 'network', def: 'Distribuye tráfico entre múltiples servidores o instancias para mejorar disponibilidad y escalabilidad.' },
  { term: 'IAM', category: 'cloud', def: 'Identity and Access Management — gestión de identidades y permisos en plataformas cloud.' },
  { term: 'SAML', category: 'security', def: 'Security Assertion Markup Language — estándar para intercambio de autenticación y autorización entre dominios.' },
  { term: 'SSO', category: 'security', def: 'Single Sign-On — permite autenticarse una vez para acceder a múltiples aplicaciones.' },
  { term: 'MTLS', category: 'security', def: 'Mutual TLS — autenticación bidireccional donde cliente y servidor se verifican mutuamente.' },
  { term: 'BGP', category: 'network', def: 'Border Gateway Protocol — protocolo de enrutamiento entre sistemas autónomos en internet.' },
  { term: 'ASN', category: 'network', def: 'Autonomous System Number — identificador único de un sistema autónomo en internet.' },
  { term: 'CDN', category: 'network', def: 'Content Delivery Network — red de servidores distribuidos para entregar contenido con baja latencia.' },
  { term: 'Rate Limit', category: 'cloud', def: 'Límite de peticiones que un cliente puede hacer en un período de tiempo.' },
  { term: 'SLA', category: 'cloud', def: 'Service Level Agreement — acuerdo de nivel de servicio que define métricas de disponibilidad y rendimiento.' },
  { term: 'SLO', category: 'cloud', def: 'Service Level Objective — objetivo interno de nivel de servicio que se busca cumplir.' },
];

const CATEGORIES = [
  { key: 'network', label: 'Redes', color: '#58a6ff' },
  { key: 'security', label: 'Seguridad', color: '#f85149' },
  { key: 'cloud', label: 'Cloud', color: '#3fb950' },
];

export default function GlossaryViewer() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return GLOSSARY;
    const q = query.toLowerCase();
    return GLOSSARY.filter(
      (g) => g.term.toLowerCase().includes(q) || g.def.toLowerCase().includes(q) || g.category.includes(q)
    );
  }, [query]);

  const grouped = useMemo(() => {
    const map = new Map();
    CATEGORIES.forEach((c) => map.set(c.key, []));
    filtered.forEach((g) => {
      if (map.has(g.category)) map.get(g.category).push(g);
    });
    return CATEGORIES.filter((c) => map.get(c.key).length > 0).map((c) => ({
      ...c,
      items: map.get(c.key),
    }));
  }, [filtered]);

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex items-center gap-2 px-3 h-10 rounded-lg border border-border-default bg-bg-secondary">
        <Search size={16} className="text-text-muted shrink-0" />
        <input
          type="text"
          placeholder="Buscar término técnico..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent text-text-primary placeholder-text-muted"
        />
      </div>

      {grouped.map((group) => (
        <div key={group.key}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full" style={{ background: group.color }} />
            <span className="text-sm font-semibold text-text-primary">{group.label}</span>
            <span className="text-xs text-text-muted">{group.items.length} términos</span>
          </div>
          <div className="space-y-2">
            {group.items.map((g) => (
              <div key={g.term} className="p-3 rounded-lg border border-border-default bg-bg-secondary">
                <div className="text-sm font-semibold font-mono text-accent mb-1">{g.term}</div>
                <div className="text-sm text-text-secondary">{g.def}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
