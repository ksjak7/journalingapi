import path from 'path'
import sqlite3 from 'sqlite3'

const dbPath = path.resolve('db.db')
const db = new sqlite3.Database(dbPath)

db.run(`
  CREATE TABLE IF NOT EXISTS test (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
  )
`)

export default db