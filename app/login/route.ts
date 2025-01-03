import { userExists } from "@/db/dbfunctions"
import { NextResponse } from "next/server"

type loginRequest = {
  username: string,
  password: string
}

export async function POST(
  request: Request
) {
  
  const data: loginRequest = await request.json()

  if (userExists(data.username)) {
    const response =  NextResponse.json({
      message: "User Exists",
      status: 200,
    })
    
    response.headers.set('Access-Control-Allow-Origin', '*')

    return response
  }

  const response = NextResponse.json({
    message: "Login Failed",
    status: 401
  })

  response.headers.set('Access-Control-Allow-Origin', '*')

  return response
}