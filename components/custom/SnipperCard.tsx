import { SnippetType } from "@/lib/types"
import React from "react"
import { Card } from "@/components/ui/card"
import { Separator } from "../ui/separator"
import { CopyIcon, Pencil2Icon, StarFilledIcon, StarIcon } from "@radix-ui/react-icons"
import { Button } from "../ui/button"

const dummySnippet: SnippetType = {
  _id: "dkj9wsks8989HBHs",
  name: "Dummy Snippet",
  creator: "tahashah411@gmail.com".split("@")[0],
  lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
  description: "This is a dummy snippet to see how to snippet card looks",
  favorites: 101
}

type SnippetCardProps = {
  snippet: SnippetType
}

export const SnippetCard: React.FC<SnippetCardProps> = ({snippet=dummySnippet}) => {
  return (
    <Card className="flex flex-col rounded-sm gap-4 p-4 w-96">
      <div className="flex justify-between gap-2">
        <div className="flex flex-1 flex-col gap-2">
          <h3 className="text-xl font-semibold">{snippet.name}</h3>
          <p className="text-sm text-muted-foreground">{`by ${snippet.creator}`}</p>
        </div>
        <div className="flex flex-col gap-2 h-full">
          <p className="text-sm flex-1 flex items-center text-muted-foreground">{snippet.lastUpdated.toLocaleDateString()}</p>
          <button className="p-1 flex flex-1 gap-1 group w-fit items-center justify-end">
            <StarIcon className="size-5 group-hover:hidden"/>
            <StarFilledIcon className="size-5 hidden group-hover:flex" />
            <p className="text-sm text-muted-foreground group-hover:text-foreground">{snippet.favorites}</p>
          </button>
        </div>
      </div>
      <Separator />
      <p className="text-sm text-muted-foreground">{snippet.description}</p>
      {/* <Separator /> */}
      <div className="flex gap-2">
        <Button variant={"outline"} className="flex items-center gap-2 flex-1">
          <Pencil2Icon />
          <p>Open in Editor</p>
        </Button>
        <Button variant={"outline"} className="flex items-center gap-2 flex-1">
          <CopyIcon />
          <p>Copy Code</p>
        </Button>
      </div>
    </Card>
  )
}
