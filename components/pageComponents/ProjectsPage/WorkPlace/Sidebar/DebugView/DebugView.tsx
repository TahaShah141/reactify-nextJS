import { getParentChild } from "@/lib/componentType"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { copyIntoClipboard } from "@/lib/redux/slices/projectSlice"
import { selectMemo, selectProject } from "@/lib/redux/store"
import { deepCopy, generateRootString, parseRoot } from "@/lib/utils"

export const DebugView = () => {

  const {tabs, currentTab, selectedPath} = useAppSelector(selectProject)
  const { styleOptionsMemo } = useAppSelector(selectMemo)
  const dispatch = useAppDispatch()

  const component = selectedPath ? getParentChild(tabs[currentTab].root, selectedPath).child : undefined

  if (!component) return <div>No Component Selected</div>

  return (
    <div className="flex flex-col">
      <p>ID {component.id}</p>
      <p>Path [{component.data.path}]</p>
      <p>root {component.data.rootID}</p>
      <p>tab {component.data.tabID}</p>
      <button onClick={() => {console.log("CLICKED"); console.log({component}); generateRootString(component).then(str => parseRoot(str, false, deepCopy(styleOptionsMemo)).then(({root}) => {console.log({root}); dispatch(copyIntoClipboard({component: root}))}))}} 
      className="p-2 bg-red-500 border-2 border-black rounded-sm hover:bg-red-600 text-white">Test</button>
    </div>
  )
}
