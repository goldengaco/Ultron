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
            description TEXT, risk VARCHAR, used_by VARCHAR[]
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
            code INTEGER, name VARCHAR, category VARCHAR, description TEXT,
            common_causes VARCHAR[], troubleshooting VARCHAR[]
        );
        INSERT INTO http_codes VALUES
            (200, 'OK', '2xx', 'Petición exitosa', ['N/A'], ['N/A']),
            (201, 'Created', '2xx', 'Recurso creado exitosamente', ['N/A'], ['Verificar Location header']),
            (204, 'No Content', '2xx', 'Petición exitosa sin contenido', ['N/A'], ['Verificar si esperabas respuesta']),
            (301, 'Moved Permanently', '3xx', 'El recurso cambió de URL permanentemente', ['URL desactualizada', 'Migración'], ['Actualizar la URL', 'Seguir Location header']),
            (302, 'Found', '3xx', 'Redirección temporal', ['Load balancer', 'Auth redirect'], ['Verificar Location header']),
            (400, 'Bad Request', '4xx', 'La petición es inválida', ['JSON mal formado', 'Faltan campos', 'Headers incorrectos'], ['Validar payload', 'Revisar documentación API']),
            (401, 'Unauthorized', '4xx', 'Autenticación requerida o inválida', ['Token expirado', 'Token inválido', 'Sin credenciales'], ['Renovar token', 'Verificar bearer token', 'Reautenticar']),
            (403, 'Forbidden', '4xx', 'No tienes permisos para el recurso', ['IAM policy', 'Roles insuficientes', 'IP bloqueada'], ['Revisar permisos IAM', 'Verificar whitelist IP', 'Contactar admin']),
            (404, 'Not Found', '4xx', 'El recurso no existe', ['URL incorrecta', 'DNS mal resuelto', 'Recurso eliminado'], ['Verificar URL', 'Hacer DNS lookup', 'Revisar ruta']),
            (405, 'Method Not Allowed', '4xx', 'Método HTTP no soportado', ['Usaste POST en vez de GET', 'Endpoint incorrecto'], ['Cambiar método HTTP', 'Verificar documentación']),
            (408, 'Request Timeout', '4xx', 'La petición excedió el tiempo de espera', ['Red lenta', 'Servidor saturado', 'Firewall'], ['Aumentar timeout', 'Verificar conectividad']),
            (409, 'Conflict', '4xx', 'Conflicto con el estado actual', ['Recurso duplicado', 'Versión desactualizada'], ['Verificar unicidad', 'Actualizar versión']),
            (429, 'Too Many Requests', '4xx', 'Rate limit excedido', ['Muchas peticiones', 'Sin backoff'], ['Esperar y reintentar', 'Implementar backoff', 'Verificar Retry-After header']),
            (500, 'Internal Server Error', '5xx', 'Error interno del servidor', ['Bug en código', 'Excepción no manejada', 'Base de datos caída'], ['Revisar logs del servidor', 'Contactar equipo backend']),
            (502, 'Bad Gateway', '5xx', 'El gateway recibió respuesta inválida', ['Upstream caído', 'Timeout entre servicios'], ['Verificar upstream', 'Revisar conectividad entre servicios']),
            (503, 'Service Unavailable', '5xx', 'El servicio no está disponible', ['Mantenimiento', 'Sobrecarga', 'Deploy en curso'], ['Esperar', 'Verificar status page', 'Reintentar con backoff']),
            (504, 'Gateway Timeout', '5xx', 'El gateway excedió el tiempo de espera', ['Upstream lento', 'Red congestionada'], ['Aumentar timeout', 'Verificar upstream', 'Revisar red'])
        ON CONFLICT DO NOTHING;"
    )?;
    Ok(())
}

fn seed_glossary(conn: &Connection) -> Result<()> {
    conn.execute_batch(
        "CREATE TABLE IF NOT EXISTS glossary (
            term VARCHAR, category VARCHAR, definition TEXT, cloud_providers VARCHAR[]
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
        "CREATE TABLE IF NOT EXISTS dns_codes (rcode INTEGER, name VARCHAR, description TEXT);
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
        "CREATE TABLE IF NOT EXISTS tls_errors (error_pattern VARCHAR, description TEXT, solutions TEXT);
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
