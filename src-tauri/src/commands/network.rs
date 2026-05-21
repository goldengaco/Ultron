use crate::db::models::PublicIpInfo;
use crate::network::http;
use crate::AppState;
use tauri::State;

#[tauri::command]
pub async fn get_public_ip(state: State<'_, AppState>) -> Result<PublicIpInfo, String> {
    // Check cache first (TTL: 5 minutes)
    {
        let db = state.db.lock().map_err(|e| format!("Lock error: {}", e))?;
        let cached = db.conn()
            .query_row(
                "SELECT ip, city, region, country, country_code, isp, asn, lat, lon
                 FROM ip_cache
                 WHERE cached_at > CURRENT_TIMESTAMP - INTERVAL '5 minutes'
                 ORDER BY cached_at DESC LIMIT 1",
                [],
                |row| {
                    Ok(PublicIpInfo {
                        ip: row.get(0)?,
                        city: row.get(1)?,
                        region: row.get(2)?,
                        country: row.get(3)?,
                        country_code: row.get(4)?,
                        isp: row.get(5)?,
                        asn: row.get(6)?,
                        lat: row.get(7)?,
                        lon: row.get(8)?,
                    })
                },
            );

        if let Ok(info) = cached {
            return Ok(info);
        }
    } // MutexGuard dropped here

    // Fetch from network (no lock held during await)
    let client = reqwest::Client::builder()
        .timeout(std::time::Duration::from_secs(10))
        .build()
        .map_err(|e| format!("Client error: {}", e))?;

    let resp = http::fetch_public_ip(&client).await?;

    // Cache the result
    {
        let db = state.db.lock().map_err(|e| format!("Lock error: {}", e))?;
        db.conn().execute(
            "INSERT OR REPLACE INTO ip_cache (ip, city, region, country, country_code, isp, asn, lat, lon, cached_at)
             VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, CURRENT_TIMESTAMP)",
            duckdb::params![
                resp.ip, resp.city, resp.region, resp.country,
                resp.country_code, resp.isp, resp.asn, resp.lat, resp.lon
            ],
        ).map_err(|e| format!("Cache error: {}", e))?;
    }

    Ok(PublicIpInfo {
        ip: resp.ip,
        city: resp.city,
        region: resp.region,
        country: resp.country,
        country_code: resp.country_code,
        isp: resp.isp,
        asn: resp.asn,
        lat: resp.lat,
        lon: resp.lon,
    })
}
