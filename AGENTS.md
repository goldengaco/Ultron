# Ultron — Operations Hub

## Stack
- Frontend: React 19 + Vite 8 + Tailwind v4 + Zustand + Lucide
- Backend: Tauri v2 + Rust + DuckDB in-memory
- Build: `cargo tauri build --bundles msi` (ultra-optimizado)

## Comandos
```bash
npm install              # Instalar dependencias frontend
npm run dev              # Hot-reload frontend (sin Tauri)
cargo tauri dev          # App completa con backend Rust
cargo tauri build        # Build release .exe
```

## Perfil release (ultra-optimizado)
opt-level=3, LTO=fat, codegen-units=1, panic=abort, strip=symbols

## Herramientas incluidas
1. IP Pública (geolocalización, ISP, ASN, flag país)
2. Catálogo de Puertos (búsqueda DuckDB)
3. Códigos HTTP (grid con causas y troubleshooting)
4. Base64 (encode/decode)
5. JWT Decoder (header, payload, signature)
6. Calculadora de Subredes (CIDR, hosts, máscara)
7. Terminal (PowerShell/CMD vía Rust PTY)
8. JSON/YAML Converter (bidireccional)
9. Glosario Técnico (redes, cloud, seguridad)
10. Generador UUID (v4, v7)

## Arquitectura
- Todo dato vía DuckDB in-memory (catálogos, historial, favoritos, caché de IP)
- Frontend solo llama a `@tauri-apps/api/core` invoke
- Backend Rust maneja red (HTTP, DNS, TLS) y BD
- Sin Electron, sin TypeScript, sin dependencias UI pesadas
