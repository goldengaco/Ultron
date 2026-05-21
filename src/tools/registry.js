import { lazy } from 'react';
import { Globe, Server, AlertTriangle, ArrowLeftRight, Key, Network, Terminal, Code2, Book, Fingerprint } from 'lucide-react';

const IpPublic = lazy(() => import('./IpPublic'));
const PortsCatalog = lazy(() => import('./PortsCatalog'));
const HttpCodes = lazy(() => import('./HttpCodes'));
const Base64Decoder = lazy(() => import('./Base64Decoder'));
const JwtDecoder = lazy(() => import('./JwtDecoder'));
const IpSubnetCalculator = lazy(() => import('./IpSubnetCalculator'));
const TerminalTool = lazy(() => import('./TerminalTool'));
const JsonYamlConverter = lazy(() => import('./JsonYamlConverter'));
const GlossaryViewer = lazy(() => import('./GlossaryViewer'));
const UuidGenerator = lazy(() => import('./UuidGenerator'));

export const TOOLS = [
  {
    id: 'ip-public',
    name: 'IP Pública',
    description: 'Geolocalización, ISP, ASN y flag de país',
    category: 'Network',
    icon: Globe,
    component: IpPublic,
    keywords: ['ip', 'public ip', 'geolocation', 'isp', 'asn', 'network'],
  },
  {
    id: 'ports-catalog',
    name: 'Catálogo de Puertos',
    description: 'Búsqueda de puertos, servicios y protocolos',
    category: 'Reference',
    icon: Server,
    component: PortsCatalog,
    keywords: ['ports', 'services', 'tcp', 'udp', 'protocol'],
  },
  {
    id: 'http-codes',
    name: 'Códigos HTTP',
    description: 'Catálogo de códigos de estado HTTP con causas y solución',
    category: 'Reference',
    icon: AlertTriangle,
    component: HttpCodes,
    keywords: ['http', 'status code', 'api', 'error', 'rest'],
  },
  {
    id: 'base64',
    name: 'Base64',
    description: 'Codificar y decodificar Base64',
    category: 'Security',
    icon: ArrowLeftRight,
    component: Base64Decoder,
    keywords: ['base64', 'encode', 'decode', 'crypto'],
  },
  {
    id: 'jwt',
    name: 'JWT Decoder',
    description: 'Decodificar tokens JWT',
    category: 'Security',
    icon: Key,
    component: JwtDecoder,
    keywords: ['jwt', 'token', 'oidc', 'oauth', 'auth'],
  },
  {
    id: 'subnet',
    name: 'Calculadora de Subredes',
    description: 'Cálculo de CIDR, hosts, broadcast y máscara',
    category: 'Network',
    icon: Network,
    component: IpSubnetCalculator,
    keywords: ['subnet', 'cidr', 'ip', 'calculator', 'network'],
  },
  {
    id: 'terminal',
    name: 'Terminal',
    description: 'Terminal embebida real (PowerShell/CMD)',
    category: 'Terminal',
    icon: Terminal,
    component: TerminalTool,
    keywords: ['terminal', 'shell', 'cmd', 'powershell', 'console'],
  },
  {
    id: 'json-yaml',
    name: 'JSON / YAML Converter',
    description: 'Conversión bidireccional entre JSON y YAML',
    category: 'Data',
    icon: Code2,
    component: JsonYamlConverter,
    keywords: ['json', 'yaml', 'xml', 'convert', 'format'],
  },
  {
    id: 'glossary',
    name: 'Glosario Técnico',
    description: 'Términos de red, cloud y seguridad',
    category: 'Reference',
    icon: Book,
    component: GlossaryViewer,
    keywords: ['glossary', 'terms', 'network', 'cloud', 'security'],
  },
  {
    id: 'uuid',
    name: 'Generador UUID',
    description: 'Generar UUID v4 y v7',
    category: 'Data',
    icon: Fingerprint,
    component: UuidGenerator,
    keywords: ['uuid', 'guid', 'generator', 'id'],
  },
];
