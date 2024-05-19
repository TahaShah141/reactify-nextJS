import { useEffect, useState } from "react"
import { SidebarSnippetCard } from "./SidebarSnippetCard"
import { SnippetType } from "@/lib/types"
import { Loading } from "@/components/custom/Loading"
import { useAppSelector } from "@/lib/redux/hooks"
import { selectUser } from "@/lib/redux/store"

export const FavoriteSnippets = () => {

  const [snippets, setSnippets] = useState<SnippetType[]>([])
  const [loading, setLoading] = useState(true)

  const { user } = useAppSelector(selectUser)

  useEffect(() => {
    const fetchSnippets = async () => {
      if (!user) return;
      const {snippets} = await (await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/snippet/favorite/${user._id}`, {
        method: "GET",
        // next: {revalidate: 10}        
      })).json()
      setSnippets(snippets)
      setLoading(false)
    }
    fetchSnippets()
  }, [user])
  

  return (
    <div className="flex flex-wrap gap-4">
      {!loading && <>
      {snippets.length === 0 ? 
      <p className="font-mono">No Favorite Snippets Yet.</p> : 
      snippets.map(snippet => <SidebarSnippetCard key={snippet._id} snippet={snippet} />)}
      </>}
      {loading && <Loading />}
    </div>
  )
}
