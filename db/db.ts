//make it persistant

import path from 'path'
import Database from 'better-sqlite3'

const dbPath = path.resolve('./db/db.db')
const db = new Database(dbPath)

db.pragma("journal_mode = WAL")
db.pragma("sychronous = NORMAL")
db.pragma("foreign_keys = ON")

const tables = [
`
  CREATE TABLE IF NOT EXISTS accounts (
    accountId TEXT NOT NULL UNIQUE PRIMARY KEY
  );`,
`
  CREATE TABLE IF NOT EXISTS sessions (
    accountId TEXT NOT NULL UNIQUE,
    sessionToken TEXT NOT NULL UNIQUE,
    expirationDate TEXT NOT NULL,
    FOREIGN KEY(accountId) REFERENCES accounts(accountId) ON UPDATE CASCADE
  );`,
]


tables.forEach(table => db.prepare(table).run())

export default db