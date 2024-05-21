import connectMongo from "@/lib/connectMongo"
import { NextRequest, NextResponse } from "next/server"
import Snippet from "@/models/SnippetModel"
import { revalidateTag } from "next/cache"

export async function POST(request: NextRequest) {

  const { email: creator, name, description, root } = await request.json()

  try {
    await connectMongo()

    const snippet = await Snippet.create({ creator, name, description, root })
    await snippet.save()
    revalidateTag('all_snippets');

    return NextResponse.json({snippet})

  } catch (error) {
    console.log({error})
    return NextResponse.json({error: "Cant Create Snippet"})
  }
}