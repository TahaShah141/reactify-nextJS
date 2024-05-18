"use client"

import { DndContext, pointerWithin } from '@dnd-kit/core'
import { useDragAndDrop } from '@/lib/hooks/useDragAndDrop';
import { selectComponents } from '@/lib/redux/store';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Layer } from './Layer';
import { useAppSelector } from '@/lib/redux/hooks';

export const Layers = () => {

  const { tabs, currentTab } = useAppSelector(selectComponents)
  const { sensors, handleDragEnd } = useDragAndDrop()

  return (
    <DndContext
    sensors={sensors}
    onDragEnd={handleDragEnd}
    collisionDetection={pointerWithin}
    >
      <Layer component={tabs[currentTab].root} />
    </DndContext>
  )
}