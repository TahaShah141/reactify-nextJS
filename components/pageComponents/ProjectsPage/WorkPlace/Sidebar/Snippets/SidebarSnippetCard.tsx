import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { copyIntoClipboard } from "@/lib/redux/slices/projectSlice"
import { addStyleOptions } from "@/lib/redux/slices/memoSlice"
import { updateFavorites } from "@/lib/redux/slices/userSlice"
import { selectMemo, selectUser } from "@/lib/redux/store"
import { SnippetType } from "@/lib/types"
import { deepCopy, parseRoot } from "@/lib/utils"
import { CopyIcon, StarFilledIcon, StarIcon } from "@radix-ui/react-icons"
import { useCallback, useState } from "react"
import { useToast } from "@/components/ui/use-toast"

type Props = {
  snippet: SnippetType
}

export const SidebarSnippetCard: React.FC<Props> = ({snippet}) => {

  const { styleOptionsMemo } = useAppSelector(selectMemo)
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const { user } = useAppSelector(selectUser)

  const isFavorite = (user?.favoriteSnippets.findIndex(fav => fav === snippet._id) !== -1) 

  const copyToClipboard = useCallback(async () => {
      const {root: component, newMemos} = await parseRoot(snippet.root as string, true, deepCopy(styleOptionsMemo))
      dispatch(addStyleOptions({styleOptions: newMemos}))
      dispatch(copyIntoClipboard({component}))
      setLoading(false)
    }, [styleOptionsMemo, dispatch, snippet])

  const toggleFavorite = async () => {

    if (!user) return;

    const {error} = await (await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/snippet/favorite`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({user: user._id, snippet: snippet._id}), 
    })).json()

    if (!error) {
      dispatch(updateFavorites({snippetID: snippet._id}))
      toast({
        description: isFavorite ? "Removed from favorites" : "Added to favorites",
      })
    } else {
      console.log(error)
    }

    setLoading(false)
  }

  return (
    <Card className="flex flex-col rounded-sm gap-3 p-3 w-full max-w-md">
      <div className="flex flex-1 items-center justify-between gap-1">
        <h3 className="text-md font-semibold">{snippet.name}</h3>
        <p className="text-xs text-muted-foreground">{`by ${snippet.creator}`}</p>
      </div>
      <Separator />
      <p className="text-xs text-muted-foreground">{snippet.description.substring(0, 100) + (snippet.description.length > 100 ? "..." : "")}</p>
      <div className="flex gap-2">
        <Button disabled={loading} onClick={() => {setLoading(true); copyToClipboard()}} variant={"outline"} className="flex flex-1 items-center gap-2">
          <CopyIcon />
          <p>Copy Code</p>
        </Button>
        {user && <Button disabled={loading} onClick={() => {setLoading(true); toggleFavorite()}} variant={"outline"} size={"icon"}>
          {isFavorite ? <StarFilledIcon /> : <StarIcon />}
        </Button>}
      </div>
    </Card>
  )
}
