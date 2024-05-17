import connectMongo from "@/lib/connectMongo";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  
  const { id, credentials } = await request.json()

  try {

    await connectMongo()
 
    const user = id !== undefined ? await User.findById(id) : await User.findOne({email: credentials.email})

    if (user) {
      if (id !== undefined) {
        const {password, ...userWithoutPassword} = user._doc
        return NextResponse.json({user: userWithoutPassword})
      } else if (user.email === credentials.email && user.password === credentials.password) {
        const {password, ...userWithoutPassword} = user._doc
        return NextResponse.json({user: userWithoutPassword})
      } else {
        return NextResponse.json({error: "Password Incorrect"})
      }
    } else return NextResponse.json({error: "User Not Found"})
  } catch (error) {
    NextResponse.json({error})
  }
}