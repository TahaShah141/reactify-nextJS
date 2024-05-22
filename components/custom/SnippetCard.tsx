"use client"
import { ComponentType, SnippetType } from "@/lib/types"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Separator } from "../ui/separator"
import { CopyIcon, Pencil2Icon, StarFilledIcon, StarIcon } from "@radix-ui/react-icons"
import { Button } from "../ui/button"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { selectMemo, selectUser } from "@/lib/redux/store"
import { updateFavorites } from "@/lib/redux/slices/userSlice"
import { deepCopy, generateCode, generateComponentCode, parseRoot } from "@/lib/utils"
import { addStyleOptions } from "@/lib/redux/slices/memoSlice"
import { openSnippetAsProject } from "@/lib/redux/slices/projectSlice"
import { useRouter } from "next/navigation"
import { useToast } from "../ui/use-toast"

type SnippetCardProps = {
  snippet: SnippetType
}

export const SnippetCard: React.FC<SnippetCardProps> = ({snippet}) => {

  const { user } = useAppSelector(selectUser)
  const { styleOptionsMemo } = useAppSelector(selectMemo)
  const dispatch = useAppDispatch()

  const router = useRouter()

  const isFavorite = (user?.favoriteSnippets.findIndex((fav: string) => fav === snippet._id) !== -1) 

  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const toggleFavorite = async () => {

    if (!user) return;

    const {error} = await (await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/snippet/favorite`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({user: user._id, snippet: snippet._id}), 
    })).json()

    if (!error) {
      dispatch(updateFavorites({snippetID: snippet._id}))
    } else {
      console.log(error)
    }

    setLoading(false)
    toast({
      description: isFavorite ? "Removed from favorites" : "Added to favorites",
    })
  }

  const openInEditor = async () => {
    const {root, newMemos} = await parseRoot(snippet.root as string, true, deepCopy(styleOptionsMemo))
    dispatch(addStyleOptions({styleOptions: newMemos}))
    dispatch(openSnippetAsProject({snippet: root as ComponentType}))
    setLoading(false)
    router.push("/project?tab=layers")
  }

  return (
    <Card className="flex flex-col rounded-sm gap-4 p-6 h-full w-full max-w-md">
      <div className="flex justify-between gap-2">
        <div className="flex flex-1 flex-col gap-2">
          <h3 className="text-xl font-semibold">{snippet.name}</h3>
          <p className="text-sm text-muted-foreground">{`by ${snippet.creator}`}</p>
        </div>
        <div className="flex flex-col gap-2 h-full">
          <p className="text-sm flex-1 flex items-center text-muted-foreground">{new Date(snippet.updatedAt).toLocaleDateString()}</p>
          <button className="p-1 flex flex-1 group gap-1 w-fit items-center justify-end" disabled={loading} onClick={() => {setLoading(true); toggleFavorite()}}>
            {isFavorite ? <StarFilledIcon className="size-5" /> : <StarIcon className="size-5"/>}
            <p className="text-sm text-muted-foreground group-hover:text-foreground">{snippet.favorites}</p>
          </button>
        </div>
      </div>
      <Separator />
      <p className="text-sm text-muted-foreground flex-1">{snippet.description.substring(0, 100) + (snippet.description.length > 100 ? "..." : "")}</p>
      <div className="flex gap-2">
        {user && <Button onClick={() => {setLoading(true); openInEditor()}} disabled={loading} variant={"outline"} className="flex items-center gap-2 flex-1">
          <Pencil2Icon />
          <p>Open in Editor</p>
        </Button>}
        <Button onClick={async () => {
          toast({
            description: "Compiling Code..."
          })
          navigator.clipboard.writeText(generateComponentCode((await parseRoot(snippet.root as string, true, styleOptionsMemo)).root as ComponentType, 'Component'))
          toast({
            description: "Copied Code into Clipboard."
          })
        }} variant={"outline"} className="flex items-center gap-2 flex-1">
          <CopyIcon />
          <p>Copy Code</p>
        </Button>
      </div>
    </Card>
  )
}

