import { validateSession } from "@/db/dbfunctions"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
) {
  const sessionToken: string | null = request.headers.get("Authorization")
  console.log(`ValidateSession :: SessionToken: ${sessionToken}`)
  if (!sessionToken) {
    console.log(`ValidateSession :: Forbidden`)
    return NextResponse.json(
      null,
      {
        status: 401,
      }
    )
  }
  
  const newSessionToken = validateSession(sessionToken!)

  console.log(`ValidateSession :: newSessionToken: ${newSessionToken}`)

  if (newSessionToken) {
    console.log(`ValidateSession :: Success`)
    return NextResponse.json(
      {
        sessionToken: newSessionToken,
      },
      {
        status: 200,
      }
    )
  } else {
    console.log(`ValidateSession :: Forbidden`)
    return NextResponse.json(
      null,
      {
        status: 401,
      }
    )
  }
}