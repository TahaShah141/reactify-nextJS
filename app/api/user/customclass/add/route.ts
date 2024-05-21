import connectMongo from "@/lib/connectMongo"
import { NextRequest, NextResponse } from "next/server"
import Style from '@/models/StyleModel'
import { getSingularValue } from "@/lib/utils"

export async function POST(request: NextRequest) {

  const { styleOptions } = await request.json()

  try {
    await connectMongo()

    return NextResponse.json({style: styleOptions})
  } catch (error) {
    console.log({error})
    return NextResponse.json({error: "Cant Create Style"})
  }
}