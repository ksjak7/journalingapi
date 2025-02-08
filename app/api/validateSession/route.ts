import { getAccountIdFromSession } from "@/db/dbfunctions"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest
) {
  const sessionToken: string | null = request.headers.get("SessionToken")

  if (!sessionToken) {
    return NextResponse.json(
      {
        accountId: null,
      },
      {
        status: 400,
      }
    )
  }

  const accountId = getAccountIdFromSession(sessionToken)

  return NextResponse.json(
    {
      accountId: accountId
    },
    {
      status: accountId ? 200 : 401
    }
  )
}