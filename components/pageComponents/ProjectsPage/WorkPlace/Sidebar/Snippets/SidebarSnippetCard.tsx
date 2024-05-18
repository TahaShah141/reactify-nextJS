import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAppDispatch } from "@/lib/redux/hooks"
import { copyIntoClipboard } from "@/lib/redux/slices/componentsSlice"
import { ComponentType, SnippetType } from "@/lib/types"
import { recursiveParse } from "@/lib/utils"
import { CopyIcon } from "@radix-ui/react-icons"
import { useEffect } from "react"

type Props = {
  snippet: SnippetType
}

const dummySnippet: SnippetType = {
  "_id": "6648bf5a57d016d49a03ee01",
  "creator": "tahashah411",
  "name": "Basic Form",
  "description": "Basic form using shadcn components that takes input name and password",
  "favorites": 0,
  "root": "{\"id\":\"d533b306-a273-4952-bc28-ea7c1fef629f\",\"tag\":\"Card\",\"innerText\":\"\",\"className\":\"\",\"styleOptions\":[\"6648be8905921f614aa34722\",\"6648be8905921f614aa3471a\",\"6648be8905921f614aa34729\",\"664892aaf8a4d3bfbc4cc4c9\",\"6648be8905921f614aa3471c\",\"6648be8905921f614aa3471e\",\"6648be8905921f614aa34720\"],\"children\":[\"{\\\"id\\\":\\\"71097d53-384a-4867-a50b-5e714af03e83\\\",\\\"tag\\\":\\\"Label\\\",\\\"innerText\\\":\\\"Name\\\",\\\"className\\\":\\\"\\\",\\\"styleOptions\\\":[],\\\"children\\\":[],\\\"data\\\":{\\\"rootID\\\":\\\"App\\\",\\\"tabID\\\":\\\"SUPPLY\\\",\\\"path\\\":[1,0],\\\"selected\\\":false,\\\"draggable\\\":true,\\\"droppable\\\":true,\\\"canHaveChildren\\\":true}}\",\"{\\\"id\\\":\\\"d0bad0b3-5f24-4853-a368-2e0183f9cd15\\\",\\\"tag\\\":\\\"Input\\\",\\\"innerText\\\":\\\"\\\",\\\"className\\\":\\\"\\\",\\\"styleOptions\\\":[],\\\"children\\\":[],\\\"data\\\":{\\\"rootID\\\":\\\"App\\\",\\\"tabID\\\":\\\"SUPPLY\\\",\\\"path\\\":[1,1],\\\"selected\\\":false,\\\"draggable\\\":true,\\\"droppable\\\":true,\\\"canHaveChildren\\\":false}}\",\"{\\\"id\\\":\\\"4dc61f6e-bb8c-4447-8baf-62ead74d3d5e\\\",\\\"tag\\\":\\\"Label\\\",\\\"innerText\\\":\\\"Password\\\",\\\"className\\\":\\\"\\\",\\\"styleOptions\\\":[],\\\"children\\\":[],\\\"data\\\":{\\\"rootID\\\":\\\"App\\\",\\\"tabID\\\":\\\"SUPPLY\\\",\\\"path\\\":[1,2],\\\"selected\\\":false,\\\"draggable\\\":true,\\\"droppable\\\":true,\\\"canHaveChildren\\\":true}}\",\"{\\\"id\\\":\\\"60a26cf0-da34-417f-94fe-e5d4ca801676\\\",\\\"tag\\\":\\\"Input\\\",\\\"innerText\\\":\\\"\\\",\\\"className\\\":\\\"\\\",\\\"styleOptions\\\":[],\\\"children\\\":[],\\\"data\\\":{\\\"rootID\\\":\\\"App\\\",\\\"tabID\\\":\\\"SUPPLY\\\",\\\"path\\\":[1,3],\\\"selected\\\":false,\\\"draggable\\\":true,\\\"droppable\\\":true,\\\"canHaveChildren\\\":false}}\",\"{\\\"id\\\":\\\"028c5595-7742-4053-9da3-63298c4f0c1b\\\",\\\"tag\\\":\\\"Button\\\",\\\"className\\\":\\\"\\\",\\\"innerText\\\":\\\"Submit\\\",\\\"styleOptions\\\":[],\\\"children\\\":[],\\\"data\\\":{\\\"rootID\\\":\\\"App\\\",\\\"tabID\\\":\\\"SUPPLY\\\",\\\"path\\\":[1,4],\\\"selected\\\":false,\\\"draggable\\\":true,\\\"droppable\\\":true,\\\"canHaveChildren\\\":true}}\"],\"data\":{\"rootID\":\"App\",\"tabID\":\"SUPPLY\",\"path\":[1],\"selected\":true,\"draggable\":true,\"droppable\":true,\"canHaveChildren\":true}}",
  "updatedAt": new Date("2024-05-18T14:46:50.711Z"),
}

export const SidebarSnippetCard: React.FC<Props> = ({snippet=dummySnippet}) => {

  useEffect(() => {
    const updateRoot = async () => {
      if (typeof snippet.root === "string")
      snippet = {
        ...snippet,
        root: await recursiveParse(snippet.root)
      }
    }
    updateRoot()
  }, [snippet])

  const dispatch = useAppDispatch()
  
  return (
    <Card className="flex flex-col rounded-sm gap-3 p-3 w-full max-w-md">
      <div className="flex flex-1 items-center justify-between gap-1">
        <h3 className="text-md font-semibold">{snippet.name}</h3>
        <p className="text-xs text-muted-foreground">{`by ${snippet.creator}`}</p>
      </div>
      <Separator />
      <p className="text-xs text-muted-foreground">{snippet.description.substring(0, 100) + (snippet.description.length > 100 ? "..." : "")}</p>
      <Button onClick={() => dispatch(copyIntoClipboard({root: snippet.root as ComponentType}))} variant={"outline"} className="flex items-center gap-2">
        <CopyIcon />
        <p>Copy Code</p>
      </Button>
    </Card>
  )
}
