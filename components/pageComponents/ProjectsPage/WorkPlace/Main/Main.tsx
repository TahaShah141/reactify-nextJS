"use client"

import { useDragAndDrop } from "@/lib/hooks/useDragAndDrop"
import { useAppSelector } from "@/lib/redux/hooks"
import { selectComponents } from "@/lib/redux/store"
import { DndContext, pointerWithin } from "@dnd-kit/core"
import { Component } from "@/components/Component"
import { ComponentList } from "./ComponentList"
import { Tabs } from "./Tabs"

export const Main = () => {

  const { sensors, handleDragEnd } = useDragAndDrop()
  const { tabs, currentTab } = useAppSelector(selectComponents)

  return (
    <div className="flex flex-col border-x justify-center items-center flex-1 h-full bg-background">
      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={pointerWithin}
        sensors={sensors}
      >
        <div className="w-full h-full flex flex-col justify-between items-center p-4 gap-4 bg-background">
          <Tabs />
          <div className="flex flex-col w-full flex-1 justify-center items-center">
            <div className="w-full aspect-video">
              <Component component={tabs[currentTab].root} />
            </div>
          </div>
          <ComponentList />
        </div>
      </DndContext>
    </div>
  )
}
