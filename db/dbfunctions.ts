import { randomUUID } from "crypto";
import db from "./db";

export function createAccount(accountId: number) {
  db.prepare(`INSERT OR IGNORE INTO accounts (accountId) VALUES (:accountId)`)
    .run({
      accountId: accountId.toString()
    })
}

export function updateSession(accountId: number): string {
  const sessionToken: string = randomUUID()
  const expirationDate = new Date()
  expirationDate.setDate(expirationDate.getDate() + 7)

  db.prepare(`
      INSERT OR REPLACE INTO sessions (accountId, expirationDate, sessionToken) 
      VALUES (:accountId, :expirationDate, :sessionToken)
  `).run({
      accountId: accountId.toString(),
      expirationDate: expirationDate.toISOString(),
      sessionToken: sessionToken,
    })
    
  return sessionToken
}

interface accountIdResult {
  accountId: number
}

export function validateSession(sessionToken: string): string | null {
  const data = db.prepare(`SELECT accountId FROM sessions WHERE sessionToken = :sessionToken AND expirationDate > :currentDate`)
    .get({
      sessionToken: sessionToken,
      currentDate: new Date().toISOString()
    }) as accountIdResult | null

  if (!data) {
    return null
  }

  return updateSession(data.accountId)
}