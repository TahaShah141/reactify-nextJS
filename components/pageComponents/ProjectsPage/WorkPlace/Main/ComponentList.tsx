import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { selectComponents, selectMemo, selectUser } from "@/lib/redux/store"
import { deepCopy, mod, recursiveParse } from "@/lib/utils"
import { SupplyComponent } from "@/components/SupplyComponent"
import { Tab } from "./Tab"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { ComponentType } from "@/lib/types"
import { addStyleOptions } from "@/lib/redux/slices/memoSlice"
import { Loading } from "@/components/custom/Loading"
import { upsertSnippets } from "@/lib/redux/slices/componentsSlice"

const maxListWidth = `max-w-[calc(100vw-40rem-40px)]`

export const ComponentList = () => {

  const { supply, tabs, snippets } = useAppSelector(selectComponents)
  const dispatch = useAppDispatch()

  const { user } = useAppSelector(selectUser)
  const { styleOptionsMemo } = useAppSelector(selectMemo)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSnippets = async () => {

      if (!user) return;
      const {snippets: fetchedSnippets} = await (await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/snippet/favorite/${user._id}`, {
        method: "GET",
        // next: {revalidate: 10}        
      })).json()

      let memosToAdd = {}
      const newSnippets: ComponentType[] = []
      for (const fetchedSnippet of fetchedSnippets) {
        const {component, newMemos} = await recursiveParse(fetchedSnippet.root, deepCopy(styleOptionsMemo))
        component.id = fetchedSnippet.name
        newSnippets.push(component)
        memosToAdd = {...memosToAdd, ...newMemos}
      }
      dispatch(upsertSnippets({newSnippets}))
      dispatch(addStyleOptions({styleOptions: memosToAdd}))
    }
    fetchSnippets()
  }, [user, user?.favoriteSnippets])

  useEffect(() => {
    if (snippets.children.length > 0) {
      setLoading(false)
    }
  }, [snippets])

  const tabList: Record<string, JSX.Element[]> = useMemo(() => ({
    "Basic": (supply.children[0] as ComponentType).children.map(child => <SupplyComponent key={child.id} component={child as ComponentType} />),
    "Typography": (supply.children[1] as ComponentType).children.map(child => <SupplyComponent key={child.id} component={child as ComponentType} />),
    "ShadCN": (supply.children[2] as ComponentType).children.map(child => <SupplyComponent key={child.id} component={child as ComponentType} />),
    "Custom": Object.keys(tabs).map(tab => <Tab key={tab} id={tab} />),
    "Snippets":  snippets.children.map(child => <SupplyComponent key={child.id} component={child as ComponentType} />
  )
  }), [tabs, snippets])

  const [tab, setTab] = useState<string>("Basic")

  const [startIndex, setStartIndex] = useState(0)

  const [indices, setIndices] = useState<number[]>([])
  
  useEffect(() => {
    setStartIndex(0)
  }, [tab])
  
  useEffect(() => {
    const newIndices = []
    for (let i = 0; i < Math.min(5, tabList[tab].length); i++) {
      newIndices.push((startIndex + i) % tabList[tab].length)
    }
    setIndices(newIndices)
  }, [startIndex, tab, tabList])

  const incrementIndex = () => {
    setStartIndex(mod((startIndex + 1), tabList[tab].length))
  }

  const decrementIndex = () => {
    setStartIndex(mod((startIndex - 1), tabList[tab].length))
  }

  return (
    <div className={`w-full ${maxListWidth} h-24 flex justify-center items-center`}>
      <div className="size-full flex flex-col gap-2 items-center">
        <div className={`w-full flex-1 flex gap-2 items-center`}>
          <Button size={"icon"} variant={"ghost"} onClick={decrementIndex}><ChevronLeftIcon /></Button>
          <div className="flex-1 flex gap-2 justify-center">
            {tabList[tab].length !== 0 ? <>{indices.map(index => tabList[tab][index])}</> : loading ? <Loading /> : <p className="font-mono">Nothing to see here.</p>}
          </div>
          <Button size={"icon"} variant={"ghost"} onClick={incrementIndex}><ChevronRightIcon /></Button>
        </div>
        <Card className="flex-1 w-full rounded-sm max-w-3xl p-1 flex gap-1 justify-center items-center">
          {Object.keys(tabList).map(type => <Button className="flex-1 rounded-sm" variant={type === tab ? "secondary" : "ghost"} onClick={() => setTab(type)}>{type}</Button>)}
        </Card>
      </div>    
    </div>
  )
}
