import connectMongo from "@/lib/connectMongo"
import { NextRequest, NextResponse } from "next/server"
import Snippet from "@/models/SnippetModel"
import User from "@/models/UserModel"

type RouteParams = {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, {params}: RouteParams) {

  const {id} = params

  try {
    await connectMongo()

    const user = await User.findById(id)

    if (!user) return NextResponse.json({error: "User Not Found"})

    const snippets = await Snippet.find({ _id: { $in: user.favoriteSnippets } })

    return NextResponse.json({snippets})

  } catch (error) {
    console.log({error})
    return NextResponse.json({error: "Cant Get Snippets"})
  }
}