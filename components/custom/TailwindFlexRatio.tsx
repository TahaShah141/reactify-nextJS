import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { useDispatch, useSelector } from "react-redux"
import { selectComponents } from "@/lib/redux/store"
import { ComponentType, StyleType, getParentChild } from "@/lib/componentType"
import { getSingularValue } from "@/lib/utils"
import { updateSelectedStyle } from "@/lib/redux/slices/componentsSlice"

export const TailwindFlexRatio = () => {

  const { tabs, currentTab, selectedPath } = useSelector(selectComponents)

  const component = getParentChild(tabs[currentTab].root, selectedPath!).child as ComponentType

  const dispatch = useDispatch()

  const styleOption = component.styleOptions.find((option) => getSingularValue(option.CSSKey) === "flex")?.label as string || "flex-0"
  const value = +styleOption.split("-")[1]

  const getFlexStyle = (val: number): StyleType => {
    return ({
      label: `flex-${val}`,
      tailwind: val === 1 ? "flex-1" : val === 0 ? "flex-auto" : `flex-[${val}_0_0]`,
      CSSKey: "flex",
      CSSValue: val !== 0 ? `${val} ${val} 0%` : "none"
    })
  }

  return (
    <div className='flex flex-1 justify-between items-center'>
      <Label className="text-sm">Flex Ratio</Label>
      <div className="flex items-center gap-2">
        <Button size={"icon"} variant={"ghost"} onClick={() => value !== 0 && dispatch(updateSelectedStyle({newStyle: getFlexStyle(Math.max(0, value-1))}))}><MinusIcon /></Button>
        <p>{value}</p>
        <Button size={"icon"} variant={"ghost"} onClick={() => value !== 12 && dispatch(updateSelectedStyle({newStyle: getFlexStyle(Math.min(12, value+1))}))}><PlusIcon /></Button>
      </div>
    </div>
  )
}