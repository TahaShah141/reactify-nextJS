import { memo, useEffect, useState } from "react"
import { SidebarSnippetCard } from "./SidebarSnippetCard"
import { SnippetType } from "@/lib/types"
import { Loading } from "@/components/custom/Loading"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { fetchSnippets } from "@/lib/redux/slices/snippetsSlice"

export const AllSnippets = memo(() => {
  // const [snippets, setSnippets] = useState<SnippetType[]>([])
  const { snippets, loading } = useAppSelector(state => state.snippets);
  const dispatch = useAppDispatch();

  
  useEffect(() => {
    if (snippets.length === 0) {
      dispatch(fetchSnippets());
    }
  }, [snippets.length])
  
  console.log({snippets})
  
  return (
    <div className="flex flex-wrap gap-4">
      {!loading && snippets.length > 0 && snippets.map(snippet => <SidebarSnippetCard key={snippet._id} snippet={snippet} />)}
      {loading && <Loading />}
    </div>
  )
}
)