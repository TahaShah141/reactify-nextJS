import { useDraggable, useDroppable } from "@dnd-kit/core";
import { ComponentType, ForeignComponentType, getCSSStyle } from "../lib/componentType";
import React from "react"
import { componentsToClone } from "@/lib/componentsToClone";
import { updateSelected } from "@/lib/redux/slices/componentsSlice";
import { ForeignComponent } from "./ForeignComponent";
import { useAppDispatch } from "@/lib/redux/hooks";

type ComponentProps = {
  component: ComponentType;
};

export const verbosity = false;

export const Component: React.FC<ComponentProps> = ({ component }) => {
  
  const dispatch = useAppDispatch()

  const { id, tag, children, className, data, styleOptions, innerText} = component;

  const { attributes, listeners, setNodeRef: setDragRef, transform, isDragging } = useDraggable({ id, data });

  const { setNodeRef: setDropRef, isOver, active } = useDroppable({ id, data });

  const componentStyle = getCSSStyle(styleOptions)

  const style = {
    ...componentStyle,
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    backgroundColor: isOver ? "#1f1f1f" : componentStyle?.backgroundColor,
  };
  
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (data.rootID === "SUPPLY") return;
    dispatch(updateSelected({selectedID: id}));
  };

  const type = data.droppable && active && active.id !== id ? "DROP" : data.draggable ? "DRAG" : "";

  const ref = type === "DRAG" ? setDragRef : type === "DROP" ? setDropRef : undefined;

  const newClassName = `${className || ""} ${
    isDragging ? "bg-opacity-80" : ""
  } ${data.selected ? "relative " : ""}`;

  const props = type ? 
    {
      ref,
      onClick,
      style,
      className: newClassName,
      ...listeners,
      ...attributes,
    } : 
    {
      onClick,
      className: newClassName,
      style,
    };

  const inside = data.canHaveChildren ?
  <>
    {data.selected && <p className="absolute top-0 -translate-y-full left-1/2 -translate-x-1/2 text-center w-full min-w-fit max-w-20 bg-red-500 rounded-tl-sm rounded-tr-sm p-0.5 text-white text-sm">{data.path.length === 0 ? data.tabID : tag}</p>}
    {verbosity &&
      data.rootID !== "SUPPLY" &&
      `${id.toString().slice(0, 11)} ${data.tabID} [${data.path.toString()}] ${data.selected}`}
    {innerText !== "" && <>{innerText}</>}
    {children.map((childComponent) => ('children' in childComponent) ? 
      (<Component key={childComponent.id} component={childComponent as ComponentType} />) :
      (<ForeignComponent key={childComponent.id} foreignComponent={childComponent as ForeignComponentType} />)
    )}
  </> : null

  const injected = React.cloneElement(componentsToClone[tag] || <div></div>, props, inside);

  return (
    <>
      {injected}
    </>
  );
};
