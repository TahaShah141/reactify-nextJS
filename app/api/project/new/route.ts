import connectMongo from "@/lib/connectMongo"
import { NextRequest, NextResponse } from "next/server"
import { generateRootString } from "@/lib/utils"
import Project from "@/models/ProjectModel"
import User from "@/models/UserModel"

export async function POST(request: NextRequest) {

  const { name, description, tabs, _id } = await request.json()

  try {
    await connectMongo()

    const newTabs: Record<string, {imports: string[], root: string}> = {}

    //TODO: change to promise.all for performance
    for (const key of Object.keys(tabs)) {
      newTabs[key] = {
        ...tabs[key],
        root: await generateRootString(tabs[key].root)
      }
    }

    const finalTabs = JSON.stringify(newTabs)

    const project = await Project.create({ name, description, tabs: finalTabs })
    await project.save()

    await User.findByIdAndUpdate(_id, {
      $addToSet: {
        projects: project._id.toString()
      }
    }).exec()

    return NextResponse.json({project})

  } catch (error) {
    console.log({error})
    return NextResponse.json({error: "Cant Create Project"})
  }
}