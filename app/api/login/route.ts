import { userExists } from "@/db/dbfunctions"
import { NextResponse } from "next/server"

type loginRequest = {
  username: string,
  password: string
}

export async function POST(
  request: Request
) {
  try {
    const data: loginRequest = await request.json()
  
    if (userExists(data.username)) {
      const response =  NextResponse.json({
        message: "User Exists",
      }, {
        status: 200,
      })
      
      return response
    }
  
    const response = NextResponse.json({
      message: "Login Failed",
    }, {
      status: 401,
    })
  
    return response
  } catch (ex) {
    console.log(ex)
  }
}