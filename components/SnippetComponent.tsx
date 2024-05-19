import { useDraggable } from "@dnd-kit/core";
import { Button } from "./ui/button";
import { ComponentType } from "@/lib/types";

type SnippetComponentProps = {
  component: ComponentType
}

export const SnippetComponent: React.FC<SnippetComponentProps> = ({component}) => {

  const { id, data} = component;

  const { attributes, listeners, setNodeRef: setDragRef, transform, isDragging } = useDraggable({ id, data });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    backgroundColor: isDragging ? "white" : undefined,
    color: isDragging ? "black" : undefined
  };
  
  const props = 
    {
      ref: setDragRef,
      style,
      ...listeners,
      ...attributes,
    }

  return (
    <Button variant="outline" className="flex-1" {...props}>
      {id}
    </Button>
  );
}