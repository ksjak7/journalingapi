import { NextRequest, NextResponse } from "next/server";

interface SessionResponse {
  sessionToken: string
}

export default async function middleware(
  request: NextRequest,
) {
  if (request.method == "OPTIONS") {
    return NextResponse.next()
  }

  const sessionToken: string | null = request.headers.get("Authorization")
  if (!sessionToken) {
    return NextResponse.json(
      null,
      {
        status: 401,
      }
    )
  }

  const sessionResponse = await fetch("/api/validateSession",
    {
      method: "GET",
      headers: {
        Authorization: sessionToken
      }
    })
    .then(response => response.json()) as SessionResponse | null

  if (sessionResponse?.sessionToken) {
    const response = NextResponse.next()
  } else {
    return NextResponse.json(
      null,
      {
        status: 401,
      }
    )
  }
}

export const config = {
  matcher: '/((?!api/validateSession|api/user|favicon.ico|sitemap.xml|robots.txt).*)'
}