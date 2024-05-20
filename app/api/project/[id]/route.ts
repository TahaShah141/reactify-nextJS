import connectMongo from "@/lib/connectMongo"
import { NextRequest, NextResponse } from "next/server"
import Project from "@/models/ProjectModel"
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

    const projects = await Project.find({ _id: { $in: user.projects } })

    return NextResponse.json({projects})

  } catch (error) {
    console.log({error})
    return NextResponse.json({error: "Cant Get Projects"})
  }
}