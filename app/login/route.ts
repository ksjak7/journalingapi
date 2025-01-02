import { userExists } from "@/db/dbfunctions"
import { NextRequest } from "next/server"

type loginRequest = {
  username: string,
  password: string
}

export async function POST(
  request: NextRequest
) {
  const origin = request.nextUrl.origin
  console.log(origin)
  const data: loginRequest = await request.json()
  
  if (userExists(data.username)) {
    return new Response(
      JSON.stringify({
        message: "User Exists"
      }),
      { status: 200 }
    )
  }

  return new Response(
    JSON.stringify({
      message: "Login Failed"
    }),
    { status: 401 }
  )
}