import { ForeignComponentType, getCSSStyle } from "@/lib/componentType"
import { componentsToClone } from "@/lib/componentsToClone"
import { selectComponents } from "@/lib/redux/store"
import { useDraggable, useDroppable } from "@dnd-kit/core"
import React from "react"
import { verbosity } from "./Component"
import { updateSelected } from "@/lib/redux/slices/componentsSlice"
import { PseudoComponent } from "./PseudoComponent"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"

type ForeignComponentProps = {
  foreignComponent: ForeignComponentType
}

export const ForeignComponent: React.FC<ForeignComponentProps> = ({ foreignComponent }) => {
  
  const { tabs } = useAppSelector(selectComponents)
  const dispatch = useAppDispatch()

  const { id, data } = foreignComponent
  const { tabID, selected, path } = data

  const { attributes, listeners, setNodeRef: setDragRef, transform, isDragging } = useDraggable({ id, data });
  const { setNodeRef: setDropRef, isOver, active } = useDroppable({ id, data });
  
  const {className, styleOptions, tag, children, data: componentData} = tabs[tabID].root

  const componentStyle = getCSSStyle(styleOptions)
  
  const style = {
    ...componentStyle,
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    backgroundColor: isOver ? "#1f1f1f" : undefined,
  };

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch(updateSelected({selectedID: id}));
  };

  const ref = active && active.id === id ? setDragRef : setDropRef;

  const newClassName = `${className || ""} ${
    isDragging ? "bg-opacity-80" : ""
  } ${data.selected ? "relative" : ""}`;

  const props = {
    ref,
    onClick,
    style,
    className: newClassName,
    ...listeners,
    ...attributes,
  }

  const inside = componentData.canHaveChildren ? 
  <>
  {selected && <p className="absolute top-0 -translate-y-full left-1/2 -translate-x-1/2 text-center w-full min-w-fit max-w-20 bg-sky-500 rounded-tl-sm rounded-tr-sm p-0.5 text-white text-sm">{tabID}</p>}
  {verbosity && <>{`FOREIGN ${tabID} ${id.toString().substring(0, 5)} [${path}] ${selected}`}</>}
  {children.map(child => 
    <PseudoComponent component={child} key={child.id} />
  )}
  </> : null

  const injected = React.cloneElement(componentsToClone[tag] || <div></div>, props, inside)

  return <>{injected}</>
}

