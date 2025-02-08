import { createAccount, updateSession } from "@/db/dbfunctions"
import { NextRequest, NextResponse } from "next/server"

type MetadataSource = {
  type: string,
  id: number,
}
type NameMetaData = {
  primary: boolean,
  source: MetadataSource,
}

type Names = {
  displayName: string,
  displayNameLastFirst: string,
  familyName: string,
  givenName: string,
  unstructuredName: string,
  metadata: NameMetaData,
}

type PhotoMetadata = {
  primary: boolean,
  source: MetadataSource,
}

type Photo = {
  default: true,
  url: string,
  metadata: PhotoMetadata,
}

type PeopleMeResponseData = {
  names: Names[],
  photos: Photo[],
  resourceName: string,
}

export async function GET(
  request: NextRequest
) {
  const access_token: string | null = request.nextUrl.searchParams.get("accessToken")

  if (access_token === null) {
    return NextResponse.json(
      {
        message: "accessToken not provided",
      },
      {
        status: 400,
      }
    )
  }

  const response = await fetch(`https://content-people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos&sources=READ_SOURCE_TYPE_PROFILE&key=${process.env.GOOGLE_API_KEY}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }
  )
    .then(data => data.json()) as PeopleMeResponseData

  const accountId = Number.parseInt(response.resourceName.split("/")[1])
  const name = response.names.find(name => name.metadata.primary)?.displayName || null
  const photoUrl = response.photos.find(photo => photo.default)?.url || null

  if (!(accountId
    && name
    && photoUrl)) {
    return NextResponse.json(
      {
        message: "invalid data returned from Google api",
      },
      {
        status: 400,
      }
    )
  }

  console.log(JSON.stringify({
    accountId: accountId,
    name: name,
    photoUrl: photoUrl,
  }))

  createAccount(accountId)
  const sessionToken = updateSession(accountId)

  return NextResponse.json(
    {
      accountId: accountId,
      name: name,
      photoUrl: photoUrl,
      sessionToken: sessionToken,
    },
    {
      status: 200,
    }
  )
}