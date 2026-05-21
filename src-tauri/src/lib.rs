mod commands;
mod db;
mod network;

use std::sync::Mutex;
use db::init::Database;

pub struct AppState {
    pub db: Mutex<Database>,
}

pub fn run() {
    let db = Database::new().expect("Failed to initialize DuckDB");

    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_process::init())
        .manage(AppState { db: Mutex::new(db) })
        .invoke_handler(tauri::generate_handler![
            commands::system::get_app_info,
            commands::network::get_public_ip,
            commands::database::search_catalog,
            commands::database::get_port_info,
            commands::database::search_ports,
            commands::database::get_http_code,
            commands::database::get_glossary_entry,
            commands::favorites::add_favorite,
            commands::favorites::remove_favorite,
            commands::favorites::get_favorites,
            commands::favorites::log_history,
            commands::favorites::get_recent_tools,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
