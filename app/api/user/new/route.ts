import connectMongo from "@/lib/connectMongo"
import { NextRequest, NextResponse } from "next/server"
import User from "@/models/UserModel"

export async function POST(request: NextRequest) {

  const { credentials } = await request.json()

  try {
    await connectMongo()

    const user = await User.findOne({email: credentials.email})

    if (user) return NextResponse.json({error: "User Already Exists."})
        
    const newUser = await User.create({...credentials})
    await newUser.save()

    const {password: _password, ...userWithoutPassword} = newUser._doc

    return NextResponse.json({user: userWithoutPassword})
  } catch (error) {
    return NextResponse.json({error: "Cant Create User"})
  }
}