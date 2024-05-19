import { fixPathAndSelected, getNewChild, getParentChild } from '@/lib/componentType'
import { ComponentType, CustomStyleType, ForeignComponentType, StyleType, TabType } from '@/lib/types'
import { getRootComponent, supplyComponent } from '@/lib/defaultComponents'
import { UniqueIdentifier } from '@dnd-kit/core'
import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import { deepCopy, getSingularValue, sameCSSKey } from '@/lib/utils'

export interface ComponentsState {
  tabs: Record<string, TabType>
  supply: ComponentType
  currentTab: string
  clipboard?: ComponentType
  selectedID?: UniqueIdentifier
  selectedPath?: number[]
  customClasses: CustomStyleType[]
}

const initialState: ComponentsState = {
  //holds all components of the project
  tabs: {
    "App": {
      root: getRootComponent("App"),
      imports: [],
    },
  },
  //constants
  supply: supplyComponent,
  currentTab: "App",
  customClasses: [],
}

export const componentsSlice = createSlice({
  name: "components",
  initialState,
  reducers: {
    //TABS
    switchTab: (state, action: PayloadAction<{newTab: string}>) => {
      const { currentTab, tabs } = state
      const root = tabs[currentTab].root
      const { newTab } = action.payload
      if (newTab === currentTab) return;

      //reset prevSelected before switching tabs
      root.data.selected = false
      root.children = fixPathAndSelected([] , root.children, () => {}, undefined)
      state.selectedID = undefined
      state.selectedPath = undefined

      //switch tabs
      state.currentTab = newTab
    },
    addNewTab: (state, action: PayloadAction<{newTab: string}>) => {
      const { currentTab, tabs } = state
      const root = tabs[currentTab].root
      const { newTab } = action.payload

      tabs[newTab] = {
        root: getRootComponent(newTab),
        imports: []
      }

      //reset prevSelected before switching tabs
      root.data.selected = false
      root.children = fixPathAndSelected([] , root.children, () => {}, undefined)
      state.selectedID = undefined
      state.selectedPath = undefined

      //switch tabs
      state.currentTab = newTab
    },

    //SELECTED COMPONENT
    updateSelected: (state, action: PayloadAction<{ selectedID?: UniqueIdentifier }>) => {
      const { selectedID: prevSelectedID, currentTab, tabs } = state
      const root = tabs[currentTab].root
      const { selectedID: newSelectedID } = action.payload

      //base case of selecting a component
      const setSelected = (selectedPath?: number[], selectedID?: UniqueIdentifier) => {
        state.selectedID = selectedID
        state.selectedPath = selectedPath
      }

      const newID = newSelectedID !== prevSelectedID ? newSelectedID : undefined
      root.children = fixPathAndSelected([] , root.children, setSelected, newID)

      //manually set states to avoid bugs incase of clicking a selected component
      if (newSelectedID === prevSelectedID) {
        state.selectedID = undefined
        state.selectedPath = undefined
      }

      //handle special case of root
      if (prevSelectedID === currentTab && newSelectedID !== currentTab)
        root.data.selected = false
      if (newSelectedID === currentTab) {
        root.data.selected = !root.data.selected
        state.selectedID = prevSelectedID !== currentTab ? currentTab : undefined
        state.selectedPath = prevSelectedID !== currentTab ? [] : undefined
      }

    },
  
    updateSelectedStyle: (state, action: PayloadAction<{ newStyle: StyleType }>) => {
      //get required variables
      const { selectedPath, currentTab, tabs } = state
      const root = tabs[currentTab].root
      const { newStyle } = action.payload
      const { child: selected } = getParentChild(root, selectedPath!)

      //ignore ForeignComponent
      if (!('styleOptions' in selected)) return;

      let found = false
      selected.styleOptions = selected.styleOptions.map((option) => {
        if (option.CSSKey instanceof Array) {
          for (let i = 0; i < option.CSSKey.length; i++) {
            if (option.CSSKey[i] === newStyle.CSSKey[i]) {
              found = true
              return newStyle
            }
          }
        } else
        if (option.CSSKey === newStyle.CSSKey) {
          found = true
          return newStyle
        }
        return option
      })

      if (!found) selected.styleOptions.push(newStyle)
    },

    removeFromSelectedStyle: (state, action: PayloadAction<{ CSSKeys: string[] | (string | string[])[] }>) => {
      //get required variables
      const { selectedPath, currentTab, tabs } = state
      const root = tabs[currentTab].root
      const { CSSKeys } = action.payload
      const { child: selected } = getParentChild(root, selectedPath!)

      //ignore ForeignComponent
      if (!('styleOptions' in selected)) return;

      for (const key of CSSKeys) {
        if (key instanceof Array) {
          selected.styleOptions = selected.styleOptions.filter((option) => !sameCSSKey(key, option.CSSKey))
        } else {
          selected.styleOptions = selected.styleOptions.filter((option) => option.CSSKey !== key)
        }
      }
    },

    saveSelectedStyle: (state, action: PayloadAction<{name: string}>) => {
      //get required variables
      const { selectedPath, currentTab, tabs, customClasses } = state
      const root = tabs[currentTab].root
      const { name } = action.payload
      const { child: selected } = getParentChild(root, selectedPath!)

      //ignore ForeignComponent
      if (!('styleOptions' in selected)) return;

      customClasses.push({name, styles: selected.styleOptions})
    },

    setSelectedInnerText: (state, action: PayloadAction<{text: string}>) => {
      const { selectedPath, currentTab, tabs } = state
      const root = tabs[currentTab].root
      const { text } = action.payload
      const { child: selected } = getParentChild(root, selectedPath!)

      if (!('innerText' in selected)) return;

      selected.innerText = text
    },

    removeStyleFromSelected: (state, action: PayloadAction<{ tailwind: string | string[] }>) => {
      const { selectedPath, currentTab, tabs } = state
      const root = tabs[currentTab].root
      const { child: selected } = getParentChild(root, selectedPath!)
      const { tailwind } = action.payload

      //ignore ForeignComponent
      if (!('styleOptions' in selected)) return;

      selected.styleOptions = selected.styleOptions.filter((option) => getSingularValue(option.tailwind) !== getSingularValue(tailwind))
    },

    deleteSelected: (state) => {
      const { selectedPath, currentTab, tabs } = state
      const root = tabs[currentTab].root
      const { parent, child } = getParentChild(root, selectedPath!)

      //ignore if child is root of tab
      if (child.data.path.length === 0) return;
      
      parent.children = parent.children.filter((Child) => Child.id !== child.id)

      //reset selected and fix the paths
      state.selectedID = undefined
      state.selectedPath = undefined
      root.children = fixPathAndSelected([] , root.children, () => {}, undefined)
    },
    copySelected: (state) => {
      const { selectedPath, currentTab, tabs } = state
      const root = tabs[currentTab].root
      const { child } = getParentChild(root, selectedPath!)

      state.clipboard = deepCopy(child)
      if (state.clipboard) {
        state.clipboard.data.selected = false
        state.clipboard.data.draggable = true
      }
    },

    copyIntoClipboard: (state, action: PayloadAction<{component: ComponentType}>) => {
      const {component} = action.payload
      console.log("COPIED", component)
      state.clipboard = deepCopy(component)
      if (state.clipboard) {
        state.clipboard.data.selected = false
        state.clipboard.data.draggable = true
      }
    },

    pasteIntoSelected: (state) => {
      const { selectedPath, currentTab, tabs, clipboard } = state
      const root = tabs[currentTab].root
      
      const { child: selected } = getParentChild(root, selectedPath!)
      if (!clipboard || !selectedPath || !('children' in selected)) return;

      const toPaste = getNewChild(selected, clipboard, -1, true, currentTab)
      
      const index = toPaste.data.path.slice(-1)[0]
      selected.children = [...selected.children.slice(0, index), toPaste, ...selected.children.slice(index)]
    },

    //DRAG AND DROP
    moveChildToIndex: (state, action: PayloadAction<{childPath: number[], index: number}>) => {
      //get required variables
      const { tabs, currentTab } = state
      const root = tabs[currentTab].root
      const { childPath, index } = action.payload
      const { parent, child } = getParentChild(root, childPath)

      //remove from prevIndex and add to new Index
      parent.children = [...parent.children.slice(0, index), child, ...parent.children.slice(index)]
      parent.children = parent.children.filter((Child, i) => !(Child.id === child.id && i !== index))
      
      //toggle selected and fix the paths
      const setSelected = (selectedPath?: number[], selectedID?: UniqueIdentifier) => {
        state.selectedPath = selectedPath
        state.selectedID = selectedID
      }
      
      root.children = fixPathAndSelected([] , root.children, setSelected, child.id)      
      root.data.selected = false
    },
    moveComponent: (state, action: PayloadAction<{oldParentPath: number[], newParentPath: number[], child: ComponentType | ForeignComponentType, adding: boolean, removing: boolean}>) => {
      //get required variables
      const { tabs, currentTab } = state
      const { oldParentPath, newParentPath, child, adding, removing } = action.payload
      const index = child.data.path.slice(-1)[0]
      const root = tabs[currentTab].root
      
      const oldParent = getParentChild(root, oldParentPath).child as ComponentType
      const newParent = getParentChild(root, newParentPath).child as ComponentType
      
      //remove from old parent if needed and add to new if needed 
      if (removing) oldParent.children = oldParent.children.filter(Child => Child.id !== child.id)
      if (adding) newParent.children = [...newParent.children.slice(0, index), child, ...newParent.children.slice(index)]
            
      //toggle selected and fix paths
      const setSelected = (selectedPath?: number[], selectedID?: UniqueIdentifier) => {
        state.selectedPath = selectedPath
        state.selectedID = selectedID
      }
      root.children = fixPathAndSelected([] , root.children, setSelected, child.id)
      root.data.selected = false      
    },
    addForeignComponent: (state, action: PayloadAction<{parentPath: number[], component: ForeignComponentType, index: number}>) => {
      //get required variables
      const { tabs, currentTab } = state
      const { parentPath, component, index } = action.payload
      const root = tabs[currentTab].root
      const parent = getParentChild(root, parentPath).child as ComponentType

      //add component
      parent.children = [...parent.children.slice(0, index), component, ...parent.children.slice(index)]
      
      root.data.selected = false
      root.children = fixPathAndSelected([] , root.children, () => {}, undefined)
      state.selectedID = undefined
      state.selectedPath = undefined

      //add tabID to imports
      if (!state.tabs[currentTab].imports.includes(component.data.tabID))
        state.tabs[currentTab].imports.push(component.data.tabID)
    }
  }
})

export const { 
  addNewTab,
  switchTab,

  updateSelected, 
  updateSelectedStyle,
  removeFromSelectedStyle,
  saveSelectedStyle,
  setSelectedInnerText,
  deleteSelected, 

  copySelected,
  copyIntoClipboard,
  pasteIntoSelected,

  moveChildToIndex, 
  moveComponent,
  addForeignComponent,
} = componentsSlice.actions

export default componentsSlice.reducer

