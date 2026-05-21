pub mod http;

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct PublicIpResponse {
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
