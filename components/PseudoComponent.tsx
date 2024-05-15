import { ComponentType, ForeignComponentType, getCSSStyle } from "@/lib/componentType"
import { componentsToClone } from "@/lib/componentsToClone"
import { selectComponents } from "@/lib/redux/store"
import React from "react"
import { useSelector } from "react-redux"


type PseudoComponentProps = {
  component: ComponentType | ForeignComponentType
}

export const PseudoComponent: React.FC<PseudoComponentProps> = ({ component }) => {

  const { tabs } = useSelector(selectComponents)

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