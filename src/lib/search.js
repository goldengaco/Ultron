const CATEGORY_ORDER = [
  'Network', 'Security', 'Data', 'Reference', 'Terminal',
];

const SEARCH_TERMS = {
  ip: ['public ip', 'ip address', 'geolocation', 'network'],
  port: ['ports', 'service', 'protocol', 'tcp', 'udp'],
  http: ['status code', 'api', 'rest', 'error code'],
  base64: ['encode', 'decode', 'base 64', 'crypto'],
  jwt: ['token', 'jwt', 'oidc', 'oauth', 'auth'],
  subnet: ['cidr', 'network', 'ip range', 'calculator'],
  terminal: ['shell', 'cmd', 'powershell', 'bash', 'console'],
  json: ['yaml', 'xml', 'convert', 'format'],
  uuid: ['guid', 'generator', 'id'],
};

export function searchTools(tools, query) {
  const q = query.toLowerCase().trim();
  if (!q) return tools;

  return tools
    .map((tool) => {
      let score = 0;
      const name = tool.name.toLowerCase();
      const desc = (tool.description || '').toLowerCase();
      const kw = (tool.keywords || []).join(' ').toLowerCase();

      if (name === q) score += 100;
      else if (name.includes(q)) score += 50;

      if (desc.includes(q)) score += 30;
      if (kw.includes(q)) score += 20;

      const synonyms = SEARCH_TERMS[q];
      if (synonyms) {
        synonyms.forEach((s) => {
          if (name.includes(s)) score += 25;
          if (desc.includes(s)) score += 15;
        });
      }

      return { ...tool, score };
    })
    .filter((t) => t.score > 0)
    .sort((a, b) => b.score - a.score);
}
