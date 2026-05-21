use crate::db::models::{CatalogResults, PortInfo, HttpCode, GlossaryEntry};
use crate::AppState;
use tauri::State;

#[tauri::command]
pub fn search_catalog(state: State<AppState>, query: String) -> Result<CatalogResults, String> {
    let db = state.db.lock().map_err(|e| format!("Lock error: {}", e))?;
    let q = format!("%{}%", query);

    let ports = {
        let mut stmt = db.conn().prepare(
            "SELECT port, protocol, service, description, risk FROM ports
             WHERE service ILIKE ?1 OR port::VARCHAR ILIKE ?1 OR description ILIKE ?1
             LIMIT 10"
        ).map_err(|e| e.to_string())?;

        let rows = stmt.query_map(duckdb::params![q], |row| {
            Ok(PortInfo {
                port: row.get(0)?,
                protocol: row.get(1)?,
                service: row.get(2)?,
                description: row.get(3)?,
                risk: row.get(4)?,
            })
        }).map_err(|e| e.to_string())?;

        let mut result = Vec::new();
        for row in rows {
            result.push(row.map_err(|e| e.to_string())?);
        }
        result
    };

    let http_codes = {
        let mut stmt = db.conn().prepare(
            "SELECT code, name, category, description FROM http_codes
             WHERE code::VARCHAR ILIKE ?1 OR name ILIKE ?1 OR description ILIKE ?1
             LIMIT 10"
        ).map_err(|e| e.to_string())?;

        let rows = stmt.query_map(duckdb::params![q], |row| {
            Ok(HttpCode {
                code: row.get(0)?,
                name: row.get(1)?,
                category: row.get(2)?,
                description: row.get(3)?,
            })
        }).map_err(|e| e.to_string())?;

        let mut result = Vec::new();
        for row in rows {
            result.push(row.map_err(|e| e.to_string())?);
        }
        result
    };

    let glossary = {
        let mut stmt = db.conn().prepare(
            "SELECT term, category, definition FROM glossary
             WHERE term ILIKE ?1 OR definition ILIKE ?1
             LIMIT 10"
        ).map_err(|e| e.to_string())?;

        let rows = stmt.query_map(duckdb::params![q], |row| {
            Ok(GlossaryEntry {
                term: row.get(0)?,
                category: row.get(1)?,
                definition: row.get(2)?,
            })
        }).map_err(|e| e.to_string())?;

        let mut result = Vec::new();
        for row in rows {
            result.push(row.map_err(|e| e.to_string())?);
        }
        result
    };

    Ok(CatalogResults { ports, http_codes, glossary })
}

#[tauri::command]
pub fn get_port_info(state: State<AppState>, port: i32) -> Result<Option<PortInfo>, String> {
    let db = state.db.lock().map_err(|e| format!("Lock error: {}", e))?;

    let mut stmt = db.conn().prepare(
        "SELECT port, protocol, service, description, risk FROM ports WHERE port = ?1"
    ).map_err(|e| e.to_string())?;

    let result = stmt.query_row(duckdb::params![port], |row| {
        Ok(PortInfo {
            port: row.get(0)?,
            protocol: row.get(1)?,
            service: row.get(2)?,
            description: row.get(3)?,
            risk: row.get(4)?,
        })
    });

    match result {
        Ok(info) => Ok(Some(info)),
        Err(duckdb::Error::QueryReturnedNoRows) => Ok(None),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
pub fn search_ports(state: State<AppState>, query: String) -> Result<Vec<PortInfo>, String> {
    let db = state.db.lock().map_err(|e| format!("Lock error: {}", e))?;
    let q = format!("%{}%", query);

    let mut stmt = db.conn().prepare(
        "SELECT port, protocol, service, description, risk FROM ports
         WHERE service ILIKE ?1 OR port::VARCHAR ILIKE ?1 OR description ILIKE ?1
         ORDER BY port"
    ).map_err(|e| e.to_string())?;

    let rows = stmt.query_map(duckdb::params![q], |row| {
        Ok(PortInfo {
            port: row.get(0)?,
            protocol: row.get(1)?,
            service: row.get(2)?,
            description: row.get(3)?,
            risk: row.get(4)?,
        })
    }).map_err(|e| e.to_string())?;

    let mut results = Vec::new();
    for row in rows {
        results.push(row.map_err(|e| e.to_string())?);
    }
    Ok(results)
}

#[tauri::command]
pub fn get_http_code(state: State<AppState>, code: i32) -> Result<Option<HttpCode>, String> {
    let db = state.db.lock().map_err(|e| format!("Lock error: {}", e))?;

    let mut stmt = db.conn().prepare(
        "SELECT code, name, category, description FROM http_codes WHERE code = ?1"
    ).map_err(|e| e.to_string())?;

    let result = stmt.query_row(duckdb::params![code], |row| {
        Ok(HttpCode {
            code: row.get(0)?,
            name: row.get(1)?,
            category: row.get(2)?,
            description: row.get(3)?,
        })
    });

    match result {
        Ok(info) => Ok(Some(info)),
        Err(duckdb::Error::QueryReturnedNoRows) => Ok(None),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
pub fn get_glossary_entry(state: State<AppState>, term: String) -> Result<Vec<GlossaryEntry>, String> {
    let db = state.db.lock().map_err(|e| format!("Lock error: {}", e))?;
    let q = format!("%{}%", term);

    let mut stmt = db.conn().prepare(
        "SELECT term, category, definition FROM glossary WHERE term ILIKE ?1 OR definition ILIKE ?1"
    ).map_err(|e| e.to_string())?;

    let rows = stmt.query_map(duckdb::params![q], |row| {
        Ok(GlossaryEntry {
            term: row.get(0)?,
            category: row.get(1)?,
            definition: row.get(2)?,
        })
    }).map_err(|e| e.to_string())?;

    let mut results = Vec::new();
    for row in rows {
        results.push(row.map_err(|e| e.to_string())?);
    }
    Ok(results)
}
