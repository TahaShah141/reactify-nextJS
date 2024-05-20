import { getParentChild } from "@/lib/componentType"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { selectMemo, selectProject } from "@/lib/redux/store"

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
      <button onClick={() => {console.log("CLICKED"); }} 
      className="p-2 bg-red-500 border-2 border-black rounded-sm hover:bg-red-600 text-white">Test</button>
    </div>
  )
}
