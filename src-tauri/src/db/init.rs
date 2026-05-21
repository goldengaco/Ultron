use duckdb::{Connection, Result};
use super::seeds;

pub struct Database {
    pub conn: Connection,
}

impl Database {
    pub fn new() -> Result<Self> {
        let conn = Connection::open_in_memory()?;

        // Enable optimizations
        conn.execute_batch(
            "SET threads TO 4;
             SET memory_limit = '256MB';"
        )?;

        let db = Database { conn };
        seeds::seed_database(&db.conn)?;

        // Create favorites and history tables
        db.conn.execute_batch(
            "CREATE TABLE IF NOT EXISTS favorites (
                tool_id VARCHAR PRIMARY KEY,
                added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                sort_order INTEGER DEFAULT 0
            );
            CREATE TABLE IF NOT EXISTS history (
                id BIGINT PRIMARY KEY,
                tool_id VARCHAR NOT NULL,
                opened_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                metadata VARCHAR
            );
            CREATE TABLE IF NOT EXISTS ip_cache (
                ip VARCHAR PRIMARY KEY,
                city VARCHAR, region VARCHAR, country VARCHAR,
                country_code VARCHAR, isp VARCHAR, asn VARCHAR,
                lat DOUBLE, lon DOUBLE,
                cached_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );"
        )?;

        Ok(db)
    }

    pub fn conn(&self) -> &Connection {
        &self.conn
    }
}
