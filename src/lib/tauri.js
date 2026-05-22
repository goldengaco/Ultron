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
  getAllHttpCodes: () => invoke ? safeInvoke('get_all_http_codes') : Promise.resolve(FALLBACK_HTTP_CODES),
};

const FALLBACK_HTTP_CODES = [
  { code: 100, name: "Continue", category: "1xx", description: "El servidor ha recibido los headers y el cliente debe continuar.", common_causes: ["N/A"], troubleshooting: ["N/A"] },
  { code: 101, name: "Switching Protocols", category: "1xx", description: "El servidor acepta cambiar de protocolo.", common_causes: ["Upgrade header enviado"], troubleshooting: ["Verificar compatibilidad del cliente"] },
  { code: 200, name: "OK", category: "2xx", description: "Petición exitosa.", common_causes: ["N/A"], troubleshooting: ["N/A"] },
  { code: 201, name: "Created", category: "2xx", description: "Recurso creado exitosamente.", common_causes: ["N/A"], troubleshooting: ["Verificar Location header"] },
  { code: 204, name: "No Content", category: "2xx", description: "Petición exitosa sin contenido.", common_causes: ["N/A"], troubleshooting: ["Verificar si esperabas respuesta"] },
  { code: 301, name: "Moved Permanently", category: "3xx", description: "El recurso fue movido permanentemente.", common_causes: ["URL desactualizada"], troubleshooting: ["Actualizar la URL"] },
  { code: 302, name: "Found", category: "3xx", description: "Redirección temporal.", common_causes: ["Load balancer", "Auth redirect"], troubleshooting: ["Verificar Location header"] },
  { code: 304, name: "Not Modified", category: "3xx", description: "Recurso no modificado.", common_causes: ["Cache-Control headers"], troubleshooting: ["Usar versión en caché del cliente"] },
  { code: 400, name: "Bad Request", category: "4xx", description: "La petición es inválida.", common_causes: ["JSON mal formado", "Faltan campos"], troubleshooting: ["Validar payload", "Revisar documentación API"] },
  { code: 401, name: "Unauthorized", category: "4xx", description: "Autenticación requerida.", common_causes: ["Token expirado", "Sin credenciales"], troubleshooting: ["Renovar token", "Reautenticar"] },
  { code: 403, name: "Forbidden", category: "4xx", description: "Sin permisos para el recurso.", common_causes: ["Roles insuficientes", "IP bloqueada"], troubleshooting: ["Revisar permisos IAM", "Verificar whitelist IP"] },
  { code: 404, name: "Not Found", category: "4xx", description: "El recurso no existe.", common_causes: ["URL incorrecta", "Recurso eliminado"], troubleshooting: ["Verificar URL", "Revisar ruta"] },
  { code: 405, name: "Method Not Allowed", category: "4xx", description: "Método HTTP no permitido.", common_causes: ["Usaste POST en vez de GET"], troubleshooting: ["Cambiar método HTTP"] },
  { code: 408, name: "Request Timeout", category: "4xx", description: "La petición excedió el tiempo de espera.", common_causes: ["Red lenta", "Servidor saturado"], troubleshooting: ["Aumentar timeout", "Verificar conectividad"] },
  { code: 409, name: "Conflict", category: "4xx", description: "Conflicto con el estado actual.", common_causes: ["Recurso duplicado"], troubleshooting: ["Verificar unicidad"] },
  { code: 429, name: "Too Many Requests", category: "4xx", description: "Rate limit excedido.", common_causes: ["Muchas peticiones"], troubleshooting: ["Esperar y reintentar", "Verificar Retry-After header"] },
  { code: 500, name: "Internal Server Error", category: "5xx", description: "Error interno del servidor.", common_causes: ["Bug en código", "Base de datos caída"], troubleshooting: ["Revisar logs del servidor", "Contactar equipo backend"] },
  { code: 502, name: "Bad Gateway", category: "5xx", description: "El gateway recibió respuesta inválida.", common_causes: ["Upstream caído"], troubleshooting: ["Verificar upstream"] },
  { code: 503, name: "Service Unavailable", category: "5xx", description: "Servicio no disponible temporalmente.", common_causes: ["Mantenimiento", "Sobrecarga"], troubleshooting: ["Esperar", "Verificar status page"] },
  { code: 504, name: "Gateway Timeout", category: "5xx", description: "El gateway excedió el tiempo de espera.", common_causes: ["Upstream lento", "Red congestionada"], troubleshooting: ["Aumentar timeout", "Verificar upstream"] }
];
