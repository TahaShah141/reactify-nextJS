import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { switchTab } from "@/lib/redux/slices/projectSlice"
import { selectProject } from "@/lib/redux/store"
import { useDraggable } from "@dnd-kit/core"
import React from "react"


type TabProps = {
  id: string
}

export const Tab: React.FC<TabProps> = ({ id }) => {
  const { currentTab } = useAppSelector(selectProject)
  const dispatch = useAppDispatch()

  const { attributes, listeners, setNodeRef: setDragRef, transform, isDragging } = 
  useDraggable({
    id: "tab-" + id, 
    data: {
      rootID: id,
      tabID: id,
      isTab: true,
    }
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    backgroundColor: isDragging ? "white" : undefined,
    color: isDragging ? "black" : undefined
  };

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch(switchTab({newTab: id}))
  };

  const isDraggable = id !== currentTab

  const ref = setDragRef

  const className = `px-4 min-w-48 w-48 h-9 flex items-center justify-center border rounded-sm hover:bg-foreground/10 ${currentTab === id ? "text-primary bg-foreground/5" : "text-muted-foreground"}`

  const props = isDraggable ? {
    ref,
    onClick,
    style,
    className,
    ...listeners,
    ...attributes
  } : {
    onClick,
    className
  }

  const cutOff = 15

  return (
    <button {...props}>
      {`${id.substring(0, cutOff)}${id.length >= cutOff ? "..." : ""}`}
    </button>
  )
}