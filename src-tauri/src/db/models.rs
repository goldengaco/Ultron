use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct PublicIpInfo {
    pub ip: String,
    pub city: Option<String>,
    pub region: Option<String>,
    pub country: Option<String>,
    pub country_code: Option<String>,
    pub isp: Option<String>,
    pub asn: Option<String>,
    pub lat: Option<f64>,
    pub lon: Option<f64>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct PortInfo {
    pub port: i32,
    pub protocol: String,
    pub service: String,
    pub description: String,
    pub risk: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct HttpCode {
    pub code: i32,
    pub name: String,
    pub category: String,
    pub description: String,
    pub common_causes: Vec<String>,
    pub troubleshooting: Vec<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct GlossaryEntry {
    pub term: String,
    pub category: String,
    pub definition: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct CatalogResults {
    pub ports: Vec<PortInfo>,
    pub http_codes: Vec<HttpCode>,
    pub glossary: Vec<GlossaryEntry>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct AppInfo {
    pub version: String,
    pub rust_version: String,
    pub engine: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[allow(dead_code)]
pub struct IpCache {
    pub ip: String,
    pub city: Option<String>,
    pub region: Option<String>,
    pub country: Option<String>,
    pub country_code: Option<String>,
    pub isp: Option<String>,
    pub asn: Option<String>,
    pub cached_at: String,
}
