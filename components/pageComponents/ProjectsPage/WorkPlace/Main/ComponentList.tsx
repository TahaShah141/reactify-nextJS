import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { selectComponents } from "@/lib/redux/store"
import { mod } from "@/lib/utils"
import { SupplyComponent } from "@/components/SupplyComponent"
import { Tab } from "./Tab"
import { useAppSelector } from "@/lib/redux/hooks"
import { ComponentType } from "@/lib/types"

const maxListWidth = `max-w-[calc(100vw-40rem-40px)]`

export const ComponentList = () => {

  const { supply, tabs } = useAppSelector(selectComponents)

  const tabList: Record<string, JSX.Element[]> = useMemo(() => ({
    "Basic": (supply.children[0] as ComponentType).children.map(child => <SupplyComponent component={child as ComponentType} />),
    "Typography": (supply.children[1] as ComponentType).children.map(child => <SupplyComponent component={child as ComponentType} />),
    "ShadCN": (supply.children[2] as ComponentType).children.map(child => <SupplyComponent component={child as ComponentType} />),
    "Custom": Object.keys(tabs).map(tab => <Tab key={tab} id={tab} />),
    "Snippets": [] 
  }), [tabs])

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
  }, [startIndex, tab])


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
            {tabList[tab].length !== 0 ? <>{indices.map(index => tabList[tab][index])}</> : <p className="font-mono">Nothing to see here.</p>}
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
