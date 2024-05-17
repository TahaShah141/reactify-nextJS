import { SnippetCard } from "@/components/custom/SnippetCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SnippetType } from "@/lib/types";

const dummySnippet: SnippetType = {
  _id: "dkj9wsks8989HBHs",
  name: "Dummy Snippet",
  creator: "tahashah411@gmail.com".split("@")[0],
  lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
  description: "This is a dummy snippet to see how to snippet card looks",
  favorites: 101
}

export default function SnippetsPage() {
  return (
    <ScrollArea className="w-full" style={{ height: "calc(100vh - 60px)" }}>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-auto-rows gap-4 items-center justify-center p-4">
      {Array.from({ length: 40 }).map((_, i) => (
        <SnippetCard snippet={dummySnippet} />
      ))}
      </div>
    </ScrollArea>
  )
} 
