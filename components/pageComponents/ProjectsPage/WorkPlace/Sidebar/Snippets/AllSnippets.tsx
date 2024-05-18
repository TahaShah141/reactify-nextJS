import { useMemo } from "react"
import { SidebarSnippetCard } from "./SidebarSnippetCard"

export const AllSnippets = () => {

  const allSnippets = useMemo(() => {
    return (
      <>
      {Array.from(Array(10).keys()).map((i) => (
        <SidebarSnippetCard key={i} />
      ))}
      </>
    )
  }, [])

  return (
    <div className="flex flex-wrap gap-4">
      {allSnippets}
    </div>
  )
}
