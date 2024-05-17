import connectMongo from "@/lib/connectMongo";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  
  const { id, credentials } = await request.json()
  
  try {

    await connectMongo()
  
    const user = id !== undefined ? await User.findById(id) : await User.findOne({email: credentials.email})
  
    return user ?
    id !== undefined ? 
    NextResponse.json({user}) : 
    user.password === credentials.password ? 
    NextResponse.json({user}) : 
    NextResponse.json({error: "Password Incorrect"}) :
    NextResponse.json({error: "User Not Found"})
  } catch (error) {
    NextResponse.json({error})
  }
}