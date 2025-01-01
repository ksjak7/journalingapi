import path from 'path'
import Database from 'better-sqlite3'

const dbPath = path.resolve('./db/db.db')
const db = new Database(dbPath)

db.prepare(`
  CREATE TABLE IF NOT EXISTS user (
    uuid TEXT NOT NULL UNIQUE PRIMARY KEY,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL
    );
`).run()

db.prepare(`
  CREATE TABLE IF NOT EXISTS userLogin (
    uuid TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    FOREIGN KEY(uuid) REFERENCES user(uuid)
    );
`).run()

export default db