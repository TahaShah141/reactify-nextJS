import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { selectComponents } from "@/lib/redux/store"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "./ui/button"
import { saveSelectedStyle } from "@/lib/redux/slices/componentsSlice"
import { PopoverClose } from "@radix-ui/react-popover"
import { Input } from "./ui/input"

export const AddCustomClass = () => {

  const { customClasses } = useSelector(selectComponents)
  const dispatch = useDispatch()

  const [className, setClassName] = useState("")

  const isNameAvailable = (() => {
    for (const Class of customClasses) {
      if (Class.name === className) return false
    }
    return true
  })()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Add Custom Class</Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <h4 className="font-medium leading-none">Add Custom Class</h4>
            <p className="text-sm text-muted-foreground">
              Save Selected Component's style to class
            </p>
          </div>
          <div className="flex gap-2">
            <Input value={className} onChange={(e) => setClassName(e.target.value)} placeholder="Class Name" />
            <PopoverClose>  
            <Button disabled={!isNameAvailable} onClick={() => {setClassName(""); dispatch(saveSelectedStyle({name: className}))}} >Add</Button>
            </PopoverClose>
          </div>
        </PopoverContent>
    </Popover>
  )
}
