use crate::db::models::AppInfo;
use tauri::State;
use crate::AppState;

#[tauri::command]
pub fn get_app_info(_state: State<AppState>) -> AppInfo {
    AppInfo {
        version: "1.0.0".to_string(),
        rust_version: "Rust nightly 2024".to_string(),
        engine: "DuckDB in-memory".to_string(),
    }
}
