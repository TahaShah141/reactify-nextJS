import { SnippetCard } from "@/components/custom/SnippetCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SnippetType } from "@/lib/types";


export default async function SnippetsPage() {

  const {snippets}: {snippets: SnippetType[]} = await (await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/snippet/all", {
    method: "GET",
    next: { revalidate: 10 },
  })).json()

  return (
    <ScrollArea className="w-full" style={{ height: "calc(100vh - 60px)" }}>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-auto-rows gap-4 items-center justify-center p-4">
        {snippets.map((snippet) => (
          <SnippetCard key={snippet._id} snippet={snippet} />
        ))}
      </div>
    </ScrollArea>
  )
} 
