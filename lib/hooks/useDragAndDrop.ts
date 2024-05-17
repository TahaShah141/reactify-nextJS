import { useCallback } from "react";
import { getNewChild, getParentChild, isImportAllowed } from "../componentType";
import { DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { selectComponents } from "../redux/store";
import { useControlPressed } from "./useControlPressed";
import { v4 as randomID } from "uuid"
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { addForeignComponent, moveChildToIndex, moveComponent } from "../redux/slices/componentsSlice";
import { ComponentType, ForeignComponentType } from "@/lib/types";

export type DragAndDropType = {  
  sensors: ReturnType<typeof useSensors>,
  handleDragEnd: (e: DragEndEvent) => void
}

export const useDragAndDrop: () => DragAndDropType = () => {
  
  const { tabs, supply, currentTab } = useAppSelector(selectComponents)
  const dispatch = useAppDispatch()
  const { controlPressed } = useControlPressed()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5
      }
    })
  )

  const handleDragEnd = useCallback((e: DragEndEvent) => {

    const {active, over} = e

    const droppedIntoSupply = over?.id === "SUPPLY" || over?.data.current?.rootID === "SUPPLY"

    //if not over anything or dropping into supply
    if (!over || droppedIntoSupply) {
      return
    }

    // Check if the active item is being supplied
    const supplying = active.data.current?.rootID === "SUPPLY"

    const {path: activePath, rootID: activeRoot, isTab: importingForeign, tabID} = active.data.current || {}
    const activeRootComponent = supplying ? supply : tabs[activeRoot].root
    
    const {path: overPath, rootID: overRoot} = over.data.current || {}
    const overRootComponent = tabs[overRoot].root

    
    if (importingForeign) {
      if (!isImportAllowed(tabs, currentTab, tabID)) return console.log("IMPORT NOT ALLOWED");
      const {parent, child} = getParentChild(overRootComponent, overPath)
      const newGrandParent = parent as ComponentType
      const newParent = child as ComponentType
      const newParentPath = controlPressed ? newGrandParent.data.path : newParent.data.path
      const overIndex = overPath[overPath.length - 1]
      const index = controlPressed && overIndex !== undefined ? overIndex : newParent.children.length

      const newForeign: ForeignComponentType = {
        id: randomID(),
        data: {
          rootID: overRoot,
          tabID: tabID,
          path: [...newParentPath, index],
          selected: false,
          draggable: true,
          droppable: false,
        }
      }

      dispatch(addForeignComponent({parentPath: newParentPath, component: newForeign, index}))
      return;
    }
    
    const {parent: draggedParent, child: draggedComponent } = getParentChild(activeRootComponent, activePath)
    const {parent: droppedParent, child: droppedChild } = getParentChild(overRootComponent, overPath)

    if (!controlPressed && droppedChild.data.rootID !== droppedChild.data.tabID && droppedChild.data.tabID !== "SUPPLY") {
      console.log("NOT ALLOWED")
      return;
    }
    
    const droppedInto = droppedChild as ComponentType

    //cant send parent into its own child
    if (!supplying && activePath.length < overPath.length) {
      let samePath = true
      for (let i = 0; i < activePath.length; i++) {
        if (activePath[i] !== overPath[i]) {
          samePath = false
          break
        }
      }
      if (samePath) {
        return
      }
    }

    // If active is dropped back into its own parent, move it to the end
    if (draggedParent === droppedInto && !controlPressed) {
      dispatch(moveChildToIndex({childPath: activePath, index: draggedParent.children.length}))
      return
    }
    
    //if active and over are siblings...and ctrl pressed...move active to above over
    if (draggedParent === droppedParent && controlPressed) {
      //handle special case of Root being parent
      const newIndex = 
      overPath[overPath.length - 1] !== undefined ? 
      overPath[overPath.length - 1] : 
      draggedParent.children.length

      dispatch(moveChildToIndex({childPath: activePath, index: newIndex}))
      return
    }
    
    const overIndex = overPath[overPath.length - 1]
    const index = controlPressed && overIndex !== undefined ? overIndex : -1
    const newParent = controlPressed ? droppedParent : droppedInto 
    
    const newChild = getNewChild(newParent, draggedComponent, index)
    const parentCanHaveChildren = newParent.data.canHaveChildren
    
    if (parentCanHaveChildren) {
      const removing = (!supplying || (activeRoot !== "SUPPLY"))
      const adding = true

      dispatch(moveComponent({oldParentPath: draggedParent.data.path, newParentPath: newParent.data.path, child: newChild, adding, removing}))
    }
    
  }, [tabs, controlPressed])

  return {
    sensors,
    handleDragEnd,
  }

}