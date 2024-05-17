import { getCSSStyle } from "@/lib/componentType"
import { componentsToClone } from "@/lib/componentsToClone"
import { useAppSelector } from "@/lib/redux/hooks"
import { selectComponents } from "@/lib/redux/store"
import { ComponentType, ForeignComponentType } from "@/lib/types"
import React from "react"


type PseudoComponentProps = {
  component: ComponentType | ForeignComponentType
}

export const PseudoComponent: React.FC<PseudoComponentProps> = ({ component }) => {

  const { tabs } = useAppSelector(selectComponents)

  if (!('children' in component)) {
    return <PseudoComponent component={tabs[component.data.tabID].root} />
  }

  const { className, styleOptions, tag, children, data} = component as ComponentType

  const componentStyle = getCSSStyle(styleOptions)

  const props = {
    className,
    style: componentStyle,
  }

  const inside = data.canHaveChildren ? 
  <> {children.map(child => 
    <PseudoComponent component={child} key={child.id} />
  )} </> : null

  const injected = React.cloneElement(componentsToClone[tag] || <div></div>, props, inside)

  return <>{injected}</>
}