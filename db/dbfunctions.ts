import db from "./db";

export function userExists(username: string): boolean {
  const results = db.prepare(`
    SELECT * FROM userLogin WHERE userName = ?
  `).all(username)

  if (results !== undefined
    && results.length > 0) {
    return true
  }
  return false
}