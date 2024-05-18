import connectMongo from "@/lib/connectMongo"
import { NextResponse } from "next/server"
import Snippet from "@/models/SnippetModel"

export async function GET() {

  try {
    await connectMongo()

    const snippets = await Snippet.find().sort({updatedAt: -1 })
    
    return NextResponse.json({snippets})
  } catch (error) {
    console.log({error})
    return NextResponse.json({error: "Cant Send Snippets"})
  }
}