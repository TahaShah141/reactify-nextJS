import { selectProject } from "@/lib/redux/store"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { switchTab } from "@/lib/redux/slices/projectSlice"
import { AddComponent } from "./AddComponent"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"

const maxWorkTabsWidth = `max-w-[calc(100vw-40rem-40px)]`

export const Tabs = () => {

  const { tabs, currentTab } = useAppSelector(selectProject)
  const dispatch = useAppDispatch()

  return (
    <div className="flex w-full justify-center gap-2">
      <ScrollArea className={`w-full h-full ${maxWorkTabsWidth}`}>
        <div className={`flex-1 items-center flex gap-2 overflow-hidden`}>
        {Object.keys(tabs).map(tab =>
          <button className={`px-4 min-w-48 w-48 h-9 flex items-center justify-center border rounded-sm hover:bg-foreground/10 ${currentTab === tab ? "text-primary bg-foreground/5" : "text-muted-foreground"}`} onClick={() => dispatch(switchTab({newTab: tab}))}>{`${tab.substring(0, 15)}${tab.length >= 15 ? "..." : ""}`}</button>
        )}
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
      <AddComponent />
    </div>
  )
}