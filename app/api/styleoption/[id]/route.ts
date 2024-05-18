import connectMongo from "@/lib/connectMongo"
import { NextRequest, NextResponse } from "next/server"
import Style from "@/models/StyleModel"

type RouteParams = {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, {params}: RouteParams) {

  const {id} = params

  try {
    await connectMongo()

    const style = await Style.findById(id)

    return NextResponse.json({style})


  } catch (error) {
    console.log({error})
    return NextResponse.json({error: "Cant Send Snippets"})
  }
}