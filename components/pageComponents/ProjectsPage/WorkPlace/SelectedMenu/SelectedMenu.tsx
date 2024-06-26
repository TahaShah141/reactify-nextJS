"use client"

import { getParentChild } from '@/lib/componentType'
import { selectProject } from '@/lib/redux/store'
import { useSelectedListeners } from '@/lib/hooks/useSelectedListeners'
import { ScrollArea } from '@/components/ui/scroll-area'
import { StyleMenu } from './StyleMenu'
import { AttributeMenu } from './AttributeMenu'
import { useAppSelector } from '@/lib/redux/hooks'

export const SelectedMenu = () => {

  const { tabs, selectedPath, currentTab } = useAppSelector(selectProject)

  const component = selectedPath ? getParentChild(tabs[currentTab].root, selectedPath).child : undefined

  useSelectedListeners(component)

  if (!component)
    return (
      <div className={`flex flex-col w-full gap-2 justify-center items-center`} style={{ height: 'calc(100vh - 60px)' }}>
        <p className="text-lg font-bold">Style Menu</p>
        <p className="text-sm text-muted-foreground">No Component Selected</p>
      </div>
    )

  if (!("children" in component))
    return (
      <div className={`flex flex-col w-full gap-2 justify-center items-center`} style={{ height: 'calc(100vh - 60px)' }}>
        <p className="text-lg font-bold">Style Menu</p>
        <p className="text-sm text-muted-foreground">{"Can't change imported component's style"}</p>
      </div>
    )

  return (
    <ScrollArea className='w-full p-4' style={{ height: 'calc(100vh - 60px)' }}>
      <StyleMenu />
    </ScrollArea>
  )
}