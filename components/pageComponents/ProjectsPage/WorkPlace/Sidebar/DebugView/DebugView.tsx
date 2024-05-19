import { getParentChild } from "@/lib/componentType"
import { useAppSelector } from "@/lib/redux/hooks"
import { selectComponents } from "@/lib/redux/store"

export const DebugView = () => {

  const {tabs, currentTab, selectedPath} = useAppSelector(selectComponents)

  const component = selectedPath ? getParentChild(tabs[currentTab].root, selectedPath).child : undefined

  if (!component) return <div>No Component Selected</div>

  return (
    <div className="flex flex-col">
      <p>ID {component.id}</p>
      <p>Path [{component.data.path}]</p>
      <p>root {component.data.rootID}</p>
      <p>tab {component.data.tabID}</p>
    </div>
  )
}
