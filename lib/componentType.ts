import { UniqueIdentifier } from "@dnd-kit/core"
import { ComponentType } from "react"
import { v4 as randomID } from "uuid"
import { StyleType, ComponentChildren, ForeignComponentType, TabType } from "./types"

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