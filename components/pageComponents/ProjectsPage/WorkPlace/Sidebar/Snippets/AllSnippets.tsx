import { memo, useEffect, useState } from "react"
import { SidebarSnippetCard } from "./SidebarSnippetCard"
import { Loading } from "@/components/custom/Loading"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { fetchSnippets } from "@/lib/redux/slices/snippetsSlice"
import { SnippetType } from "@/lib/types"
import { selectUser } from "@/lib/redux/store"

export const AllSnippets = memo(() => {
  // const { snippets, loading } = useAppSelector(state => state.snippets);
  // const dispatch = useAppDispatch();

  
  // useEffect(() => {
  //   if (snippets.length === 0) {
  //     dispatch(fetchSnippets());
  //   }
  // }, [snippets.length, dispatch])

  const [snippets, setSnippets] = useState<SnippetType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSnippets = async () => {
      const {snippets} = await (await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/snippet/all`, {
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
      {!loading && snippets.length > 0 && snippets.map(snippet => <SidebarSnippetCard key={snippet._id} snippet={snippet} />)}
      {loading && <Loading />}
    </div>
  )
})

AllSnippets.displayName = "AllSnippets"