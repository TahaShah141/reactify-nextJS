import connectMongo from "@/lib/connectMongo"
import { NextResponse } from "next/server"
import Snippet from "@/models/SnippetModel"

export const dynamic = 'force-dynamic' // defaults to auto


export async function GET() {

  try {
    await connectMongo()

    const snippets = await Snippet.find().sort({favorites: -1 }).limit(10)
    
    return NextResponse.json({snippets})
  } catch (error) {
    console.log({error})
    return NextResponse.json({error: "Cant Send Snippets"})
  }
}