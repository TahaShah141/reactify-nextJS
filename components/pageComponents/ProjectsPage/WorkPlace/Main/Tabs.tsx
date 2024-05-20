import { selectProject } from "@/lib/redux/store"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { deleteTab, switchTab } from "@/lib/redux/slices/projectSlice"
import { AddComponent } from "./AddComponent"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"

const maxWorkTabsWidth = `max-w-[calc(100vw-40rem-40px)]`

export const Tabs = () => {

  const { tabs, currentTab } = useAppSelector(selectProject)
  const dispatch = useAppDispatch()

  return (
    <div className="flex w-full justify-center gap-2">
      <ScrollArea className={`w-full h-full ${maxWorkTabsWidth}`}>
        <div className={`flex-1 items-center flex gap-2 overflow-hidden`}>
        {Object.keys(tabs).map(tab =>
          <ContextMenu>
            <ContextMenuTrigger asChild>
              <button className={`px-4 min-w-48 w-48 h-9 flex items-center justify-center border rounded-sm hover:bg-foreground/10 ${currentTab === tab ? "text-primary bg-foreground/5" : "text-muted-foreground"}`} onClick={() => dispatch(switchTab({newTab: tab}))}>{`${tab.substring(0, 15)}${tab.length >= 15 ? "..." : ""}`}</button>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem disabled={tab === currentTab || tab === "App"} onSelect={() => dispatch(deleteTab({tab}))}>
                Delete
              </ContextMenuItem>
              <ContextMenuItem>
                Rename
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        )}
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
      <AddComponent />
    </div>
  )
}