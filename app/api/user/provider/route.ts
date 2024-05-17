import connectMongo from "@/lib/connectMongo"
import { NextRequest, NextResponse } from "next/server"
import User from "@/models/UserModel"

export async function POST(request: NextRequest) {

  const { email, secret } = await request.json()

  if (secret !== process.env.NEXT_PUBLIC_PROVIDER_SECRET) return NextResponse.json({error: "Invalid Secret"}) 

  try {
    await connectMongo()

    const user = await User.findOne({email})

    if (user) {
      const {password, ...userWithoutPassword} = user._doc
      return NextResponse.json({ user: userWithoutPassword })
    }
        
    const newUser = await User.create({email, password: "password123"})
    await newUser.save()

    const {password: _password, ...userWithoutPassword} = newUser._doc

    return NextResponse.json({user: userWithoutPassword})
  } catch (error) {
    return NextResponse.json({error: "Cant Create User"})
  }
}