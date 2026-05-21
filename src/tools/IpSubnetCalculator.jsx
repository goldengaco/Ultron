import React, { useState, useMemo } from 'react';

function cidrToMask(cidr) {
  const mask = ~(2 ** (32 - cidr) - 1);
  return [
    (mask >>> 24) & 255,
    (mask >>> 16) & 255,
    (mask >>> 8) & 255,
    mask & 255,
  ].join('.');
}

function ipToInt(ip) {
  return ip.split('.').reduce((acc, oct) => (acc << 8) + parseInt(oct, 10), 0) >>> 0;
}

function intToIp(int) {
  return [(int >>> 24) & 255, (int >>> 16) & 255, (int >>> 8) & 255, int & 255].join('.');
}

export default function IpSubnetCalculator() {
  const [ip, setIp] = useState('192.168.1.0');
  const [cidr, setCidr] = useState('24');

  const result = useMemo(() => {
    try {
      const c = parseInt(cidr, 10);
      if (c < 0 || c > 32) return null;
      const ipInt = ipToInt(ip);
      const mask = c === 0 ? 0 : ~(2 ** (32 - c) - 1);
      const network = ipInt & mask;
      const broadcast = network | (~mask >>> 0);
      const totalHosts = 2 ** (32 - c);
      const usableHosts = totalHosts - 2;
      return {
        network: intToIp(network),
        broadcast: intToIp(broadcast),
        firstUsable: totalHosts > 2 ? intToIp(network + 1) : '-',
        lastUsable: totalHosts > 2 ? intToIp(broadcast - 1) : '-',
        mask: cidrToMask(c),
        totalHosts,
        usableHosts,
        cidr: c,
      };
    } catch { return null; }
  }, [ip, cidr]);

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label className="text-xs text-text-muted mb-1 block">Dirección IP</label>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="192.168.1.0"
            className="w-full px-3 h-10 rounded-lg border border-border-default bg-bg-secondary text-text-primary font-mono placeholder-text-muted"
          />
        </div>
        <div className="w-24">
          <label className="text-xs text-text-muted mb-1 block">CIDR</label>
          <input
            type="number"
            min="0"
            max="32"
            value={cidr}
            onChange={(e) => setCidr(e.target.value)}
            className="w-full px-3 h-10 rounded-lg border border-border-default bg-bg-secondary text-text-primary font-mono placeholder-text-muted"
          />
        </div>
      </div>

      {result && (
        <div className="rounded-xl border border-border-default overflow-hidden" style={{ background: '#161b22' }}>
          <div className="grid grid-cols-2 gap-px bg-border-default">
            {[
              ['Red', result.network],
              ['Broadcast', result.broadcast],
              ['Primer usable', result.firstUsable],
              ['Último usable', result.lastUsable],
              ['Máscara', result.mask],
              ['CIDR', `/${result.cidr}`],
              ['Hosts totales', result.totalHosts.toLocaleString()],
              ['Hosts utilizables', result.usableHosts.toLocaleString()],
            ].map(([label, value]) => (
              <div key={label} className="p-3 bg-bg-secondary">
                <div className="text-xs text-text-muted">{label}</div>
                <div className="text-sm font-mono font-medium text-text-primary">{value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
