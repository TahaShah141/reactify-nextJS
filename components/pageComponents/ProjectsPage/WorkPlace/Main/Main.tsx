"use client"

import { useDragAndDrop } from "@/lib/hooks/useDragAndDrop"
import { useAppSelector } from "@/lib/redux/hooks"
import { selectProject } from "@/lib/redux/store"
import { DndContext, pointerWithin } from "@dnd-kit/core"
import { Component } from "@/components/Component"
import { ComponentList } from "./ComponentList"
import { Tabs } from "./Tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

export const Main = () => {

  const { sensors, handleDragEnd } = useDragAndDrop()
  const { tabs, currentTab } = useAppSelector(selectProject)

  return (
    <ScrollArea className='flex flex-col border-x justify-center items-center flex-1 h-full bg-background' style={{ height: 'calc(100vh - 60px)' }}>
      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={pointerWithin}
        sensors={sensors}
      >
        <div className="w-full h-full min-h-[calc(100vh-60px)] flex flex-col justify-between items-center p-4 gap-4 bg-background">
          <Tabs />
          <Component component={tabs[currentTab].root} />
          <ComponentList />
        </div>
      </DndContext>
    </ScrollArea>
  )
}
