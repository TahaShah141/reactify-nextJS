import connectMongo from "@/lib/connectMongo"
import { NextResponse } from "next/server"
import Snippet from "@/models/SnippetModel"
import User from "@/models/UserModel"
import Project from "@/models/ProjectModel"

export async function GET() {

  try {
    await connectMongo()

    // const snippets = await Snippet.deleteMany({}).exec()
    const projects = await Project.deleteMany({}).exec()
    const users = await User.updateMany({}, {$set: {projects: []}}, {new: true}).exec()

    return NextResponse.json({users, projects})

  } catch (error) {
    console.log({error})
    return NextResponse.json({error: "Cant Delete"})
  }
}