"use client"

import { DndContext, pointerWithin } from '@dnd-kit/core'
import { useDragAndDrop } from '@/lib/hooks/useDragAndDrop';
import { useSelector } from 'react-redux';
import { selectComponents } from '@/lib/redux/store';
import { ScrollArea } from '../ui/scroll-area';
import { Layer } from '../Layer';

export const Layers = () => {

  const { tabs, currentTab } = useSelector(selectComponents)
  const { sensors, handleDragEnd } = useDragAndDrop()

  return (
    <DndContext
    sensors={sensors}
    onDragEnd={handleDragEnd}
    collisionDetection={pointerWithin}
    >
      <ScrollArea className='w-full p-2' style={{ height: 'calc(100vh - 60px)' }}>
          <Layer component={tabs[currentTab].root} />
      </ScrollArea>
    </DndContext>
  )
}