use crate::AppState;
use tauri::State;

#[tauri::command]
pub fn add_favorite(state: State<AppState>, tool_id: String) -> Result<(), String> {
    let db = state.db.lock().map_err(|e| format!("Lock error: {}", e))?;

    let max_order: i32 = db.conn()
        .query_row("SELECT COALESCE(MAX(sort_order), -1) + 1 FROM favorites", [], |row| row.get(0))
        .unwrap_or(0);

    db.conn().execute(
        "INSERT OR REPLACE INTO favorites (tool_id, added_at, sort_order) VALUES (?1, CURRENT_TIMESTAMP, ?2)",
        duckdb::params![tool_id, max_order],
    ).map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
pub fn remove_favorite(state: State<AppState>, tool_id: String) -> Result<(), String> {
    let db = state.db.lock().map_err(|e| format!("Lock error: {}", e))?;
    db.conn().execute(
        "DELETE FROM favorites WHERE tool_id = ?1",
        duckdb::params![tool_id],
    ).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub fn get_favorites(state: State<AppState>) -> Result<Vec<String>, String> {
    let db = state.db.lock().map_err(|e| format!("Lock error: {}", e))?;

    let mut stmt = db.conn().prepare(
        "SELECT tool_id FROM favorites ORDER BY sort_order"
    ).map_err(|e| e.to_string())?;

    let rows = stmt.query_map([], |row| {
        row.get::<_, String>(0)
    }).map_err(|e| e.to_string())?;

    let mut results = Vec::new();
    for row in rows {
        results.push(row.map_err(|e| e.to_string())?);
    }
    Ok(results)
}

#[tauri::command]
pub fn log_history(state: State<AppState>, tool_id: String) -> Result<(), String> {
    let db = state.db.lock().map_err(|e| format!("Lock error: {}", e))?;

    // Use nanosecond timestamp as ID (unique enough)
    let id = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .map(|d| d.as_nanos() as i64)
        .unwrap_or(0);

    db.conn().execute(
        "INSERT INTO history (id, tool_id, opened_at) VALUES (?1, ?2, CURRENT_TIMESTAMP)",
        duckdb::params![id, tool_id],
    ).map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
pub fn get_recent_tools(state: State<AppState>, limit: i32) -> Result<Vec<String>, String> {
    let db = state.db.lock().map_err(|e| format!("Lock error: {}", e))?;

    let mut stmt = db.conn().prepare(
        "SELECT DISTINCT tool_id FROM history ORDER BY MAX(opened_at) DESC LIMIT ?1"
    ).map_err(|e| e.to_string())?;

    let rows = stmt.query_map(duckdb::params![limit], |row| {
        row.get::<_, String>(0)
    }).map_err(|e| e.to_string())?;

    let mut results = Vec::new();
    for row in rows {
        results.push(row.map_err(|e| e.to_string())?);
    }
    Ok(results)
}
