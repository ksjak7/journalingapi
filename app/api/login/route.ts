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
      return NextResponse.json(
        {
          message: "User Exists",
        },
        {
          status: 200,
        }
      )
    }

    return NextResponse.json(
      {
        message: "Login Failed",
      },
      {
        status: 401,
      }
    )
  } catch (ex) {
    console.log(ex)
  }
}