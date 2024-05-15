import { ComponentType, getParentChild } from "@/lib/componentType"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { setSelectedInnerText } from "@/lib/redux/slices/componentsSlice"
import { selectComponents } from "@/lib/redux/store"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"

export const AttributeMenu = () => {

  const { tabs, selectedPath, currentTab } = useAppSelector(selectComponents)
  
  const dispatch = useAppDispatch()

  const component = selectedPath ? getParentChild(tabs[currentTab].root, selectedPath).child : undefined

  return (
    <div className="flex flex-col gap-2 p-2">
      <Label className="text-md">Inner Text:</Label>
      <Input placeholder={"Inner Text"} value={(component as ComponentType).innerText || ""} onChange={(e) => dispatch(setSelectedInnerText({text: e.target.value}))} className="w-full" />
    </div>
  )
}
