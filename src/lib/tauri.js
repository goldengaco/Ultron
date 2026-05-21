const isTauri = typeof window !== 'undefined' && window.__TAURI_INTERNALS__;

let invoke;
if (isTauri) {
  try {
    const tauri = await import('@tauri-apps/api/core');
    invoke = tauri.invoke;
  } catch {}
}

async function safeInvoke(command, args) {
  if (!invoke) throw new Error('Backend no disponible');
  return invoke(command, args || {});
}

export const commands = {
  getAppInfo: () => safeInvoke('get_app_info'),

  getPublicIp: async () => {
    if (invoke) return safeInvoke('get_public_ip');
    try {
      const res = await fetch('https://api.ipify.org?format=json').then(r => r.json());
      return { ip: res.ip, city: null, region: null, country: null, country_code: null, isp: null, asn: null, lat: null, lon: null };
    } catch {
      throw new Error('No disponible');
    }
  },

  searchPorts: (query) => invoke ? safeInvoke('search_ports', { query }) : Promise.resolve([]),
  getFavorites: () => invoke ? safeInvoke('get_favorites') : Promise.resolve([]),
  getRecentTools: (limit) => invoke ? safeInvoke('get_recent_tools', { limit }) : Promise.resolve([]),
  addFavorite: (toolId) => invoke ? safeInvoke('add_favorite', { toolId }) : Promise.resolve(),
  removeFavorite: (toolId) => invoke ? safeInvoke('remove_favorite', { toolId }) : Promise.resolve(),
  logHistory: (toolId) => invoke ? safeInvoke('log_history', { toolId }) : Promise.resolve(),
};
