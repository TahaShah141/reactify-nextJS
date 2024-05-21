import connectMongo from "@/lib/connectMongo"
import { NextRequest, NextResponse } from "next/server"
import Project from "@/models/ProjectModel"

export async function POST(request: NextRequest) {

  const { tabs, _id } = await request.json()

  try {
    await connectMongo()

    const project = await Project.findByIdAndUpdate(_id, {tabs: tabs}, {new: true}).exec()

    return NextResponse.json({project})

  } catch (error) {
    console.log({error})
    return NextResponse.json({error: "Cant Create Project"})
  }
}