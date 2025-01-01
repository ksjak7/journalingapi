import { userExists } from "@/db/dbfunctions"

type loginRequest = {
  username: string,
  password: string
}

export async function POST(
  request: Request
) {
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