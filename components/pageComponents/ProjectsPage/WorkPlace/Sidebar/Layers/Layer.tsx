import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { CSSProperties, useCallback } from "react";
import { useControlPressed } from "@/lib/hooks/useControlPressed";
import { updateSelected } from "@/lib/redux/slices/projectSlice";
import { ForeignLayer } from "./ForeignLayer";
import { useAppDispatch } from "@/lib/redux/hooks";
import { ComponentType, ForeignComponentType } from "@/lib/types";


export const Layer: React.FC<{component: ComponentType}> = ({component}) => {
  const {id, tag, children, data} = component
  const dispatch = useAppDispatch()
  
  const { rootID, tabID } = data
  const { controlPressed } = useControlPressed()

  const { attributes,  listeners,  setNodeRef: setDragRef,  transform, isDragging } = useDraggable({id, data});

  const {setNodeRef: setDropRef, active} = useDroppable({id, data});
  
  const style: CSSProperties = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
  }
  
  const type = 
  data.droppable && active && active.id !== id ? "DROP" : 
  data.draggable ? "DRAG" : ""
  
  const ref = type === "DRAG" ? setDragRef : type === "DROP" ? setDropRef : undefined

  const className = `${isDragging ? "bg-opacity-80" : ""}`

  const props = type ? {
    ref,
    style,
    ...listeners,
    ...attributes,
    className
  } : {
    style,
    className
  }

  const label = `${rootID === tabID ? tabID : tag} [${data.path}]`
  const triggerClassName = `bg-background text-foreground border-l-4 px-2 ${data.selected ? "border-foreground" : "border-secondary"}`

  const layerClicked = useCallback(() => {
    if (!controlPressed) return;
    dispatch(updateSelected({selectedID: id}))
  }, [controlPressed, id, dispatch])

  return (
    <Accordion {...props} type='single' collapsible>
      <AccordionItem className='border-b-0' value={id as string}>
        {children.length === 0 || controlPressed ? 
        <div onClick={layerClicked} className={`flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline ${controlPressed ? 'hover:border-foreground/80' : ""} ${triggerClassName}`}>{label}</div> :
        <AccordionTrigger className={`${triggerClassName}`} disabled={children.length === 0}>{label}</AccordionTrigger>}
        <AccordionContent className={"pl-3 py-0 overflow-visible flex flex-col gap-0.5"}>
          {children.map((child) => ('children' in child) ?
            <Layer key={child.id} component={child as ComponentType} />:
            <ForeignLayer key={child.id} component={child as ForeignComponentType} />
          )}
        </AccordionContent>    
      </AccordionItem> 
    </Accordion>  
  );

}