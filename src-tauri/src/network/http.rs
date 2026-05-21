use super::PublicIpResponse;
use reqwest::Client;

pub async fn fetch_public_ip(client: &Client) -> Result<PublicIpResponse, String> {
    // Try ip-api.com first (free, no key)
    match fetch_from_ip_api(client).await {
        Ok(resp) => return Ok(resp),
        Err(_) => {}
    }

    // Fallback to ipify.org
    match fetch_from_ipify(client).await {
        Ok(resp) => return Ok(resp),
        Err(e) => Err(format!("All IP providers failed: {}", e)),
    }
}

async fn fetch_from_ip_api(client: &Client) -> Result<PublicIpResponse, String> {
    let resp = client
        .get("http://ip-api.com/json/")
        .timeout(std::time::Duration::from_secs(5))
        .send()
        .await
        .map_err(|e| format!("HTTP error: {}", e))?
        .json::<serde_json::Value>()
        .await
        .map_err(|e| format!("Parse error: {}", e))?;

    Ok(PublicIpResponse {
        ip: resp["query"].as_str().unwrap_or("unknown").to_string(),
        city: resp["city"].as_str().map(String::from),
        region: resp["regionName"].as_str().map(String::from),
        country: resp["country"].as_str().map(String::from),
        country_code: resp["countryCode"].as_str().map(String::from),
        isp: resp["isp"].as_str().map(String::from),
        asn: resp["as"].as_str().map(String::from),
        lat: resp["lat"].as_f64(),
        lon: resp["lon"].as_f64(),
    })
}

async fn fetch_from_ipify(client: &Client) -> Result<PublicIpResponse, String> {
    let ip = client
        .get("https://api.ipify.org?format=json")
        .timeout(std::time::Duration::from_secs(5))
        .send()
        .await
        .map_err(|e| format!("HTTP error: {}", e))?
        .json::<serde_json::Value>()
        .await
        .map_err(|e| format!("Parse error: {}", e))?
        .get("ip")
        .and_then(|v| v.as_str())
        .unwrap_or("unknown")
        .to_string();

    Ok(PublicIpResponse {
        ip,
        city: None,
        region: None,
        country: None,
        country_code: None,
        isp: None,
        asn: None,
        lat: None,
        lon: None,
    })
}
