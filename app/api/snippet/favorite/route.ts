import connectMongo from "@/lib/connectMongo"
import { NextRequest, NextResponse } from "next/server"
import Snippet from "@/models/SnippetModel"
import User from "@/models/UserModel"

export async function POST(request: NextRequest) {

  const { user: userId, snippet: snippetId } = await request.json()
  console.log({userId, snippetId})

  try {
    await connectMongo()

    const user = await User.findById(userId)

    if (!user) return NextResponse.json({error: "User Not Found"})

    if (user.favoriteSnippets.includes(snippetId)) {

      await User.findByIdAndUpdate(userId, {
        $pull: {
          favoriteSnippets: snippetId
        }
      }).exec()

      await Snippet.findByIdAndUpdate(snippetId, {
        $dec: {
          favorites: 1
        }
      }).exec()

      return NextResponse.json({message: "Removed From Favorites"})
      
    } else {

      await User.findByIdAndUpdate(userId, {
        $addToSet: {
          favoriteSnippets: snippetId
        }
      }).exec()

      await Snippet.findByIdAndUpdate(snippetId, {
        $inc: {
          favorites: 1
        }
      }).exec()

      return NextResponse.json({message: "Added To Favorites"})
    }

  } catch (error) {
    console.log({error})
    return NextResponse.json({error: "Cant Update Favorite"})
  }
}