import { useEffect, useState } from "react"
import { SidebarSnippetCard } from "./SidebarSnippetCard"
import { SnippetType } from "@/lib/types"
import { Loading } from "@/components/custom/Loading"

export const AllSnippets = () => {

  const [snippets, setSnippets] = useState<SnippetType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSnippets = async () => {
      const {snippets} = await (await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/snippet/all", {
        method: "GET",
        // next: {revalidate: 10}        
      })).json()
      setSnippets(snippets)
      setLoading(false)
    }
    fetchSnippets()
  }, [])
  

  return (
    <div className="flex flex-wrap gap-4">
      {!loading && snippets.map(snippet => <SidebarSnippetCard key={snippet._id} snippet={snippet} />)}
      {loading && <Loading />}
    </div>
  )
}
