import connectMongo from "@/lib/connectMongo"
import { NextRequest, NextResponse } from "next/server"
import Project from "@/models/ProjectModel"
import User from "@/models/UserModel"

type RouteParams = {
  params: {
    user: string
    proj: string
  }
}

export async function GET(request: NextRequest, {params}: RouteParams) {

  const {user: id, proj} = params

  console.log(id,proj)

  try {
    await connectMongo()

    const project = await Project.findByIdAndDelete(proj).exec()

    if (!project) return NextResponse.json({error: "Project Not Found"})

    await User.findByIdAndUpdate(id, {
      $pull: {
        projects: proj
      }
    }).exec()

    return NextResponse.json({project})

  } catch (error) {
    console.log({error})
    return NextResponse.json({error: "Cant Get Projects"})
  }
}