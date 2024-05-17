import connectMongo from "@/lib/connectMongo"
import { NextRequest, NextResponse } from "next/server"
import User from "@/models/UserModel"

export async function POST(request: NextRequest) {

  const { email, password } = await request.json()

  try {
    await connectMongo()
        
    const newUser = await User.create({email, password})
    await newUser.save()

    return NextResponse.json({user: newUser})
  } catch (error) {
    return NextResponse.json({error})
  }
}