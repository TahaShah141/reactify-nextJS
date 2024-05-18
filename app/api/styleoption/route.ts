import connectMongo from "@/lib/connectMongo"
import { NextRequest, NextResponse } from "next/server"
import Style from '@/models/StyleModel'
import { getSingularValue } from "@/lib/utils"

export async function POST(request: NextRequest) {

  const { styleOption } = await request.json()

  try {
    await connectMongo()

    const style = await Style.findOne({tailwind: styleOption.tailwind})

    if (style) return NextResponse.json({style})

    if (!(styleOption.CSSKey instanceof Array && styleOption.CSSValue instanceof Array)) {
      styleOption.CSSKey = [getSingularValue(styleOption.CSSKey)]
      styleOption.CSSValue = [getSingularValue(styleOption.CSSValue)]
    }
        
    const newStyle = await Style.create({...styleOption})
    await newStyle.save()

    return NextResponse.json({style: newStyle})
  } catch (error) {
    console.log({error})
    return NextResponse.json({error: "Cant Create Style"})
  }
}