import connectMongo from "@/lib/connectMongo"
import { NextRequest, NextResponse } from "next/server"
import { generateRootString } from "@/lib/utils"
import { TabType } from "@/lib/types"

export async function POST(request: NextRequest) {

  const { name, description, tabs }: {name: string, description: string, tabs: Record<string, TabType>} = await request.json()

  try {
    await connectMongo()

    const newTabs; //recursively navigate through tabs and make all tab roots into strings using generatRootString then upload project as done in snippets

  } catch (error) {
    console.log({error})
    return NextResponse.json({error: "Cant Create Snippet"})
  }
}