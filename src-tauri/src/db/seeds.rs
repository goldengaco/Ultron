use duckdb::{Connection, Result};

pub fn seed_database(conn: &Connection) -> Result<()> {
    seed_ports(conn)?;
    seed_http_codes(conn)?;
    seed_glossary(conn)?;
    seed_dns_codes(conn)?;
    seed_tls_errors(conn)?;
    Ok(())
}

fn seed_ports(conn: &Connection) -> Result<()> {
    conn.execute_batch(
        "CREATE TABLE IF NOT EXISTS ports (
            port INTEGER, protocol VARCHAR, service VARCHAR,
            description TEXT, risk VARCHAR, used_by VARCHAR[],
            PRIMARY KEY (port, protocol)
        );
        INSERT INTO ports VALUES
            (22, 'TCP', 'SSH', 'Secure Shell - acceso remoto seguro', 'medium', ['Linux', 'Unix']),
            (80, 'TCP', 'HTTP', 'Hypertext Transfer Protocol - web sin cifrar', 'low', ['Web', 'APIs']),
            (443, 'TCP', 'HTTPS', 'HTTP sobre TLS - web cifrada', 'low', ['Web', 'APIs', 'Todos']),
            (53, 'UDP', 'DNS', 'Domain Name System - resolución de nombres', 'low', ['Infraestructura']),
            (25, 'TCP', 'SMTP', 'Simple Mail Transfer Protocol - envío de correo', 'medium', ['Email']),
            (3306, 'TCP', 'MySQL', 'Base de datos MySQL/MariaDB', 'medium', ['Bases de datos']),
            (5432, 'TCP', 'PostgreSQL', 'Base de datos PostgreSQL', 'medium', ['Bases de datos']),
            (1521, 'TCP', 'Oracle DB', 'Base de datos Oracle', 'medium', ['Bases de datos']),
            (6379, 'TCP', 'Redis', 'Redis - caché en memoria', 'medium', ['Caché', 'Bases de datos']),
            (9092, 'TCP', 'Kafka', 'Apache Kafka - mensajería distribuida', 'medium', ['Mensajería']),
            (5672, 'TCP', 'RabbitMQ', 'RabbitMQ - cola de mensajes AMQP', 'medium', ['Mensajería']),
            (8443, 'TCP', 'HTTPS Alt', 'HTTPS alternativo (tomcat, admin)', 'low', ['Web admin']),
            (8080, 'TCP', 'HTTP Alt', 'HTTP alternativo (proxy, dev)', 'low', ['Web dev']),
            (27017, 'TCP', 'MongoDB', 'Base de datos MongoDB', 'medium', ['Bases de datos']),
            (3389, 'TCP', 'RDP', 'Remote Desktop Protocol - escritorio remoto Windows', 'high', ['Windows']),
            (1433, 'TCP', 'SQL Server', 'Microsoft SQL Server', 'medium', ['Bases de datos']),
            (9200, 'TCP', 'Elasticsearch', 'Elasticsearch HTTP API', 'medium', ['Búsqueda']),
            (3000, 'TCP', 'Grafana', 'Grafana - dashboards y monitoreo', 'low', ['Monitoreo']),
            (8448, 'TCP', 'Matrix', 'Matrix - federación de mensajería', 'low', ['Comunicación']),
            (9000, 'TCP', 'Portainer', 'Portainer - gestión Docker', 'medium', ['Contenedores'])
        ON CONFLICT DO NOTHING;"
    )?;
    Ok(())
}

fn seed_http_codes(conn: &Connection) -> Result<()> {
    conn.execute_batch(
        "CREATE TABLE IF NOT EXISTS http_codes (
            code INTEGER PRIMARY KEY, name VARCHAR, category VARCHAR, description TEXT,
            common_causes VARCHAR[], troubleshooting VARCHAR[]
        );
        INSERT INTO http_codes VALUES
            (100, 'Continue', '1xx', 'El servidor recibió los headers y el cliente debe seguir enviando el cuerpo.', ['N/A'], ['N/A']),
            (101, 'Switching Protocols', '1xx', 'El servidor acepta el cambio de protocolo solicitado (ej. WebSockets).', ['Upgrade header enviado'], ['Verificar compatibilidad del cliente']),
            (102, 'Processing', '1xx', 'El servidor ha recibido la petición y la está procesando, pero no hay respuesta aún.', ['Procesos largos', 'Consultas lentas'], ['N/A']),
            (103, 'Early Hints', '1xx', 'Retorna algunos headers antes del mensaje HTTP final para precargar recursos.', ['Optimización de carga', 'Preload headers'], ['N/A']),
            (200, 'OK', '2xx', 'Petición exitosa.', ['N/A'], ['N/A']),
            (201, 'Created', '2xx', 'Recurso creado exitosamente.', ['N/A'], ['Verificar Location header']),
            (202, 'Accepted', '2xx', 'Petición aceptada para procesamiento, pero no ha finalizado (asíncrono).', ['Procesamiento batch', 'Cola de tareas'], ['Monitorear el status endpoint']),
            (203, 'Non-Authoritative Information', '2xx', 'La respuesta viene de un proxy modificado en lugar del servidor de origen.', ['Intercepción de proxy', 'CDN caching'], ['Verificar headers del proxy']),
            (204, 'No Content', '2xx', 'Petición exitosa sin contenido en la respuesta.', ['N/A'], ['Verificar si esperabas respuesta']),
            (205, 'Reset Content', '2xx', 'Le pide al cliente que resetee la vista/formulario que originó la petición.', ['Formulario enviado'], ['N/A']),
            (206, 'Partial Content', '2xx', 'El servidor envía solo una parte del recurso debido a un Range header.', ['Descarga parcial', 'Streaming de video/audio'], ['Verificar Range header en el cliente']),
            (207, 'Multi-Status', '2xx', 'Transmite información sobre múltiples recursos con estados individuales (WebDAV).', ['Peticiones WebDAV'], ['Leer XML/JSON de respuesta']),
            (208, 'Already Reported', '2xx', 'Evita listar miembros de WebDAV repetidamente.', ['N/A'], ['N/A']),
            (226, 'IM Used', '2xx', 'El servidor completó una petición GET y la respuesta es una representación de diferencias.', ['Deltas de recurso'], ['N/A']),
            (300, 'Multiple Choices', '3xx', 'El recurso solicitado tiene múltiples opciones disponibles.', ['Negociación de contenido'], ['Elegir una de las opciones en la respuesta']),
            (301, 'Moved Permanently', '3xx', 'El recurso cambió de URL permanentemente.', ['URL desactualizada', 'Migración'], ['Actualizar la URL', 'Seguir Location header']),
            (302, 'Found', '3xx', 'Redirección temporal.', ['Load balancer', 'Auth redirect'], ['Verificar Location header']),
            (303, 'See Other', '3xx', 'Dirige al cliente a obtener el recurso en otra URI usando GET.', ['Redirección post-POST'], ['Realizar petición GET a la Location dada']),
            (304, 'Not Modified', '3xx', 'El recurso no ha cambiado (caché válida).', ['Cache-Control headers', 'ETag igual'], ['Usar versión en caché del cliente']),
            (305, 'Use Proxy', '3xx', 'El recurso solo debe accederse mediante el proxy indicado (deprecado).', ['Proxy corporativo requerido'], ['Configurar proxy indicado']),
            (307, 'Temporary Redirect', '3xx', 'Redirección temporal manteniendo el método HTTP original.', ['Mantenimiento temporal'], ['Seguir Location header con el mismo método']),
            (308, 'Permanent Redirect', '3xx', 'Redirección permanente manteniendo el método HTTP original.', ['Cambio de dominio/API'], ['Actualizar enlaces y seguir Location con mismo método']),
            (400, 'Bad Request', '4xx', 'La petición es inválida.', ['JSON mal formado', 'Faltan campos', 'Headers incorrectos'], ['Validar payload', 'Revisar documentación API']),
            (401, 'Unauthorized', '4xx', 'Autenticación requerida o inválida.', ['Token expirado', 'Token inválido', 'Sin credenciales'], ['Renovar token', 'Verificar bearer token', 'Reautenticar']),
            (402, 'Payment Required', '4xx', 'Reservado para uso futuro o APIs de pago.', ['Falta de pago', 'Suscripción inactiva'], ['Completar transacción o pago']),
            (403, 'Forbidden', '4xx', 'No tienes permisos para el recurso.', ['IAM policy', 'Roles insuficientes', 'IP bloqueada'], ['Revisar permisos IAM', 'Verificar whitelist IP', 'Contactar admin']),
            (404, 'Not Found', '4xx', 'El recurso no existe.', ['URL incorrecta', 'DNS mal resuelto', 'Recurso eliminado'], ['Verificar URL', 'Hacer DNS lookup', 'Revisar ruta']),
            (405, 'Method Not Allowed', '4xx', 'Método HTTP no soportado por el endpoint.', ['Usaste POST en vez de GET', 'Endpoint incorrecto'], ['Cambiar método HTTP', 'Verificar documentación']),
            (406, 'Not Acceptable', '4xx', 'El servidor no genera contenido aceptable para los Accept headers del cliente.', ['Accept header incompatible'], ['Revisar Accept headers del cliente']),
            (407, 'Proxy Authentication Required', '4xx', 'El cliente debe autenticarse primero con el proxy.', ['Credenciales de proxy ausentes'], ['Autenticarse con el proxy de red']),
            (408, 'Request Timeout', '4xx', 'La petición excedió el tiempo de espera del servidor.', ['Red lenta', 'Servidor saturado', 'Firewall'], ['Aumentar timeout', 'Verificar conectividad']),
            (409, 'Conflict', '4xx', 'Conflicto con el estado actual del servidor.', ['Recurso duplicado', 'Versión desactualizada'], ['Verificar unicidad', 'Actualizar versión']),
            (410, 'Gone', '4xx', 'El recurso ya no existe de forma permanente.', ['Recurso purgado', 'Servicio retirado'], ['Eliminar referencias al recurso']),
            (411, 'Length Required', '4xx', 'Falta el header Content-Length requerido.', ['Petición sin Content-Length'], ['Añadir Content-Length header']),
            (412, 'Precondition Failed', '4xx', 'Una condición en los headers de la petición falló (ej. If-Match).', ['ETag/condición obsoleta'], ['Verificar headers If-Match / If-None-Match']),
            (413, 'Payload Too Large', '4xx', 'El tamaño de la petición excede el límite del servidor.', ['Archivo demasiado grande', 'Carga excesiva'], ['Reducir tamaño del payload', 'Aumentar límites en proxy/server']),
            (414, 'URI Too Long', '4xx', 'La URI de la petición es demasiado larga para ser procesada.', ['Exceso de query params', 'Bucle de redirección'], ['Usar método POST con JSON en vez de GET']),
            (415, 'Unsupported Media Type', '4xx', 'El formato del payload (Content-Type) no es soportado.', ['Content-Type incorrecto (ej. XML en vez de JSON)'], ['Cambiar Content-Type header y validar cuerpo']),
            (416, 'Range Not Satisfiable', '4xx', 'El rango solicitado en Range header no es válido.', ['Range fuera de los límites del archivo'], ['Verificar tamaño del recurso']),
            (417, 'Expectation Failed', '4xx', 'La expectativa del Expect header no fue cumplida por el servidor.', ['Expect header no soportado'], ['Eliminar Expect header de la petición']),
            (418, 'I''m a teapot', '4xx', 'El servidor se rehúsa a colar café porque es una tetera (RFC 2324).', ['Broma de April Fools'], ['Utilizar cafetera en su lugar']),
            (421, 'Misdirected Request', '4xx', 'El servidor no puede producir una respuesta para el host solicitado.', ['Configuración TLS incorrecta', 'Reutilización de conexión'], ['Verificar certificados y SNI']),
            (422, 'Unprocessable Content', '4xx', 'La petición está bien formada pero tiene errores semánticos (validación).', ['Fallas de validación', 'Campos incorrectos'], ['Corregir errores de validación en los datos']),
            (423, 'Locked', '4xx', 'El recurso está bloqueado (WebDAV).', ['Recurso en uso'], ['Esperar a que se desbloquee']),
            (424, 'Failed Dependency', '4xx', 'La petición falló debido al fracaso de una petición previa (WebDAV).', ['Error en paso anterior'], ['Resolver la petición de dependencia']),
            (425, 'Too Early', '4xx', 'Servidor rehúsa procesar petición que podría ser repetida en un ataque de replay.', ['TLS 0-RTT replay data'], ['No usar 0-RTT en peticiones no-idempotentes']),
            (426, 'Upgrade Required', '4xx', 'El cliente debe cambiar a un protocolo diferente (ej. TLS 1.3).', ['Protocolo inseguro'], ['Negociar protocolo superior usando Upgrade']),
            (428, 'Precondition Required', '4xx', 'El servidor requiere que la petición sea condicional.', ['Faltan headers de concurrencia'], ['Añadir If-Match o If-None-Match headers']),
            (429, 'Too Many Requests', '4xx', 'Rate limit excedido.', ['Muchas peticiones', 'Sin backoff'], ['Esperar y reintentar', 'Implementar backoff', 'Verificar Retry-After header']),
            (431, 'Request Header Fields Too Large', '4xx', 'Los headers de la petición son demasiado grandes.', ['Cookies excesivas', 'Headers personalizados gigantes'], ['Limpiar cookies o reducir tamaño de cabeceras']),
            (451, 'Unavailable For Legal Reasons', '4xx', 'El recurso es inaccesible debido a demandas legales/censura.', ['Bloqueo geográfico por ley', 'DMCA takedown'], ['N/A']),
            (500, 'Internal Server Error', '5xx', 'Error interno del servidor.', ['Bug en código', 'Excepción no manejada', 'Base de datos caída'], ['Revisar logs del servidor', 'Contactar equipo backend']),
            (501, 'Not Implemented', '5xx', 'El servidor no soporta la funcionalidad requerida.', ['Método HTTP no soportado (ej. PATCH no implementado)'], ['Usar métodos alternativos']),
            (502, 'Bad Gateway', '5xx', 'El gateway recibió una respuesta inválida del servidor upstream.', ['Upstream caído', 'Timeout entre servicios'], ['Verificar upstream', 'Revisar conectividad entre servicios']),
            (503, 'Service Unavailable', '5xx', 'El servicio no está disponible temporalmente.', ['Mantenimiento', 'Sobrecarga', 'Deploy en curso'], ['Esperar', 'Verificar status page', 'Reintentar con backoff']),
            (504, 'Gateway Timeout', '5xx', 'El gateway excedió el tiempo de espera.', ['Upstream lento', 'Red congestionada'], ['Aumentar timeout', 'Verificar upstream', 'Revisar red']),
            (505, 'HTTP Version Not Supported', '5xx', 'El servidor no soporta la versión de HTTP utilizada.', ['Cliente usa versión obsoleta de HTTP'], ['Configurar el cliente para usar HTTP/1.1 o HTTP/2']),
            (506, 'Variant Also Negotiates', '5xx', 'Negociación de contenido circular interna detectada.', ['Mala configuración del servidor'], ['Corregir la negociación de contenido en el servidor']),
            (507, 'Insufficient Storage', '5xx', 'El servidor no tiene espacio para guardar la representación (WebDAV).', ['Disco lleno', 'Límite de cuota superado'], ['Liberar espacio en disco o ampliar cuota']),
            (508, 'Loop Detected', '5xx', 'El servidor detectó un bucle infinito al procesar una petición WebDAV.', ['Bucle infinito en redirección WebDAV'], ['Revisar estructura de carpetas/enlaces WebDAV']),
            (510, 'Not Extended', '5xx', 'Se requieren más extensiones a la petición para cumplirla.', ['Faltan extensiones'], ['Revisar especificación de extensiones de petición']),
            (511, 'Network Authentication Required', '5xx', 'El cliente necesita autenticarse para obtener acceso a la red.', ['Portal cautivo de Wi-Fi'], ['Iniciar sesión en el portal cautivo de la red'])
        ON CONFLICT DO NOTHING;"
    )?;
    Ok(())
}

fn seed_glossary(conn: &Connection) -> Result<()> {
    conn.execute_batch(
        "CREATE TABLE IF NOT EXISTS glossary (
            term VARCHAR PRIMARY KEY, category VARCHAR, definition TEXT, cloud_providers VARCHAR[]
        );
        INSERT INTO glossary VALUES
            ('API Gateway', 'cloud', 'Servicio que actúa como intermediario entre clientes y servicios backend.', ['GCP Apigee', 'AWS API Gateway', 'Azure API Management']),
            ('CIDR', 'network', 'Classless Inter-Domain Routing - notación para rangos de IP.', NULL),
            ('DNS', 'network', 'Domain Name System - traduce nombres de dominio a IPs.', ['GCP Cloud DNS', 'AWS Route53', 'Azure DNS']),
            ('JWT', 'security', 'JSON Web Token - estándar para transmitir claims firmadas.', NULL),
            ('TLS', 'security', 'Transport Layer Security - protocolo criptográfico para comunicaciones seguras.', NULL),
            ('VPC', 'cloud', 'Red virtual aislada dentro de un proveedor cloud.', ['GCP VPC', 'AWS VPC', 'Azure VNet']),
            ('Load Balancer', 'network', 'Distribuye tráfico entre servidores para mejorar disponibilidad.', ['GCP LB', 'AWS ALB/NLB', 'Azure LB']),
            ('IAM', 'cloud', 'Identity and Access Management - gestión de identidades y permisos.', ['GCP IAM', 'AWS IAM', 'Azure Entra ID']),
            ('CDN', 'network', 'Content Delivery Network - red de servidores para entrega con baja latencia.', ['GCP Cloud CDN', 'AWS CloudFront', 'Azure CDN'])
        ON CONFLICT DO NOTHING;"
    )?;
    Ok(())
}

fn seed_dns_codes(conn: &Connection) -> Result<()> {
    conn.execute_batch(
        "CREATE TABLE IF NOT EXISTS dns_codes (rcode INTEGER PRIMARY KEY, name VARCHAR, description TEXT);
        INSERT INTO dns_codes VALUES
            (0, 'NOERROR', 'Query exitosa'),
            (1, 'FORMERR', 'Query mal formada'),
            (2, 'SERVFAIL', 'Fallo del servidor DNS'),
            (3, 'NXDOMAIN', 'El dominio no existe'),
            (4, 'NOTIMP', 'Operación no implementada'),
            (5, 'REFUSED', 'Query rechazada por política'),
            (9, 'NOTAUTH', 'Servidor no autorizado para la zona')
        ON CONFLICT DO NOTHING;"
    )?;
    Ok(())
}

fn seed_tls_errors(conn: &Connection) -> Result<()> {
    conn.execute_batch(
        "CREATE TABLE IF NOT EXISTS tls_errors (error_pattern VARCHAR PRIMARY KEY, description TEXT, solutions TEXT);
        INSERT INTO tls_errors VALUES
            ('certificate_expired', 'El certificado ha expirado', 'Renovar el certificado'),
            ('hostname_mismatch', 'El hostname no coincide con el SAN del certificado', 'Verificar SAN/CN del certificado'),
            ('self_signed', 'El certificado es auto-firmado', 'Agregar a trust store o usar CA válida'),
            ('untrusted_root', 'La CA raíz no es de confianza', 'Instalar el certificado raíz en el sistema'),
            ('revoked', 'El certificado fue revocado', 'Obtener nuevo certificado')
        ON CONFLICT DO NOTHING;"
    )?;
    Ok(())
}
