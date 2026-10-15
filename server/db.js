import Database from 'better-sqlite3'

const db = new Database('agrismart.db')
db.pragma('journal_mode = WAL')

// --- Schema ---
db.exec(`
  CREATE TABLE IF NOT EXISTS crops (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    growing_period TEXT NOT NULL,
    water TEXT NOT NULL,
    season TEXT DEFAULT '',
    soil_type TEXT DEFAULT '',
    image TEXT NOT NULL,
    description TEXT DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS diseases_pests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    affected_crop TEXT NOT NULL,
    severity TEXT NOT NULL,
    type TEXT DEFAULT 'Disease',
    symptoms TEXT NOT NULL,
    treatment TEXT DEFAULT '',
    prevention TEXT DEFAULT '',
    image TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS tips (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS offer_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    link TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS steps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    body TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS farming_guides (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    difficulty TEXT DEFAULT 'Beginner',
    image TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS weather_forecasts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    location TEXT NOT NULL,
    temperature INTEGER NOT NULL,
    condition TEXT NOT NULL,
    humidity INTEGER NOT NULL,
    wind_speed INTEGER NOT NULL,
    rainfall_chance INTEGER NOT NULL,
    forecast_date TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS cost_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    icon TEXT DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS cost_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    default_cost REAL NOT NULL,
    unit TEXT DEFAULT '',
    FOREIGN KEY (category_id) REFERENCES cost_categories(id)
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`)

export default db
