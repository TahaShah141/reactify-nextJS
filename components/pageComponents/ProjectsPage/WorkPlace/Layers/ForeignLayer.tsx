import { ForeignComponentType } from "@/lib/componentType";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Accordion, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { CSSProperties } from "react";


export const ForeignLayer: React.FC<{component: ForeignComponentType}> = ({component}) => {

  const {id, data} = component

  const { attributes,  listeners,  setNodeRef: setDragRef,  transform, isDragging } = useDraggable({id, data});

  const {setNodeRef: setDropRef, active} = useDroppable({id, data});
  
  const style: CSSProperties = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
  }  
  
  const ref = active && active.id === id ? setDragRef : setDropRef;

  const className = `${isDragging ? "bg-opacity-80" : ""}`

  const props = {
    ref,
    style,
    ...listeners,
    ...attributes,
    className
  }

  return (
    <Accordion {...props} type='single' collapsible>
      <AccordionItem className='border-b-0' value={id as string}>
        <AccordionTrigger disabled={true} className={`bg-background text-foreground border-l-4 px-2 ${data.selected ? "border-foreground" : "border-secondary"}`} >{`${data.tabID} [${data.path}]`}</AccordionTrigger>    
      </AccordionItem> 
    </Accordion>  
  );

}