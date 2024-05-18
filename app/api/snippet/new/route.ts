import connectMongo from "@/lib/connectMongo"
import { NextRequest, NextResponse } from "next/server"
import Snippet from "@/models/SnippetModel"
import { generateRootString } from "@/lib/utils"

export async function POST(request: NextRequest) {

  const { email: creator, name, description, root } = await request.json()

  try {
    await connectMongo()

    const newRoot = await generateRootString(root)

    const snippet = await Snippet.create({ creator, name, description, root: newRoot })
    await snippet.save()

    return NextResponse.json({snippet})

  } catch (error) {
    console.log({error})
    return NextResponse.json({error: "Cant Create Snippet"})
  }
}