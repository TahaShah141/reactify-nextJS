import { UniqueIdentifier } from "@dnd-kit/core"
import { v4 as randomID } from "uuid"

export type CustomStyleType = {
  name: string
  styles: StyleType[]
}

export type StyleType = {
  label: string | React.ReactNode
  tailwind: string,
  CSSKey: string | string[],
  CSSValue: string | string[]
}

export type ComponentChildren = (ComponentType | ForeignComponentType)[]

export type ForeignComponentType = {
  id: UniqueIdentifier
  data: {
    path: number[]
    rootID: string
    tabID: string
    selected: boolean
    droppable: boolean
    draggable: boolean
  }
}

export type TabType = {
  root: ComponentType
  imports: string[]
}

// Define a type for a component, which has the following fields
export type ComponentType = {
  // Unique identifier for the component
  id: UniqueIdentifier
  // The tag name of the component
  tag: string
  // Optional class name for styling
  className?: string
  styleOptions: StyleType[]
  innerText: string
  // style: Record<string, string>
  // Data associated with the component
  data: {
    //where to start the path
    rootID: string
    //where the actual component lives
    tabID: string
    // Path of the component relative to the root
    path: number[]
    // Indicates if the component is selected
    selected: boolean
    // Indicates if the component is droppable
    droppable: boolean
    // Indicates if the component is draggable
    draggable: boolean
    // Indicates if the component can have children
    canHaveChildren: boolean
  }
  // Array of child components
  children: ComponentChildren
}

export const getCSSStyle = (options: StyleType[]): Record<string, string> => {

  const style: Record<string, string> = {}
  for (const option of options) {
    if (option.CSSKey instanceof Array || option.CSSValue instanceof Array) {
      for (let i = 0; i < option.CSSKey.length; i++) {
        style[option.CSSKey[i]] = option.CSSValue[i]
      }
    } else {
      style[option.CSSKey] = option.CSSValue
    } 
  }

  return style
}

export const fixPathAndSelected = (parentPath: number[], children: ComponentChildren, setSelected: (selectedPath?: number[], selectedID?: UniqueIdentifier) => void, selectedID?: UniqueIdentifier): ComponentChildren => {

  return (children.map((child, i) => {
    const isForeign = !('children' in child)

    if (isForeign) {
      return {
        ...child,
        data: {
          ...child.data,
          path: [...parentPath, i],
          selected: selectedID === child.id ? (() => {
            setSelected([...parentPath, i], selectedID)
            return true;
          })() : false
        }
      }
    } else {
      return {
        ...child,
        data: {
          ...child.data,
          path: [...parentPath, i],
          selected: selectedID === child.id ? (() => {
            setSelected([...parentPath, i], selectedID)
            return true;
          })() : false
        },
        children: fixPathAndSelected([...parentPath, i], (child as ComponentType).children, setSelected, selectedID)
      }
    }
  }))
}

export const getNewChild = (parent: ComponentType , child: ComponentType | ForeignComponentType , index: number, shouldChangeID: boolean=false, rootID?: string): ComponentType | ForeignComponentType => {

  const changeID = shouldChangeID || parent.data.rootID !== child.data.rootID
  const root = rootID || parent.data.rootID

  //need to manually omit children as children: undefined does not work
  const withoutChildren = {
    ...child,
    id: changeID ? randomID() : child.id,
    data: {
      ...child.data,
      rootID: root,
      path: [...parent.data.path, index === -1 ? parent.children.length : index],
    }
  }

  return ('children' in child) ? {
    ...withoutChildren,
    children: child.children.map((grandchild, i) => (getNewChild(child, grandchild as ComponentType, i, changeID, root)))
  } : withoutChildren
}

//Last index of path can be ForeignType...but not any preceding ones
export const getParentChild = (root: ComponentType, path: number[]): {parent: ComponentType, child: ComponentType | ForeignComponentType} => {
  
  let parent = root 
  for (const i of path.slice(0, -1)) {
    parent = parent.children[i] as ComponentType
  }

  let child = parent.children[path[path.length - 1]] || parent
  
  return {parent, child}
}

export const isImportAllowed = (tabs: Record<string, TabType>, hostTab: string, guestTab: string) => {
  const visited: Record<string, boolean> = {}
  for (const tab of Object.keys(tabs)) visited[tab] = false

  const Queue = [guestTab]
  let found = false

  while (Queue.length !== 0 && !found) {
    const currentTab = Queue.shift()!
    visited[currentTab] = true

    for (const importedTab of tabs[currentTab].imports) {
      if (importedTab === hostTab) found = true
      if (!visited[importedTab]) Queue.push(importedTab)
    }
  }

  return !found
}