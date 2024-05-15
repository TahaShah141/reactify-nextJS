import { Button } from "@/components/ui/button"
import { PlusIcon } from "@radix-ui/react-icons"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { PopoverClose } from "@radix-ui/react-popover"
import { useState } from "react"
import { addNewTab } from "@/lib/redux/slices/componentsSlice"
import { selectComponents } from "@/lib/redux/store"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"

export const AddComponent = () => {

  const { tabs } = useAppSelector(selectComponents)
  const dispatch = useAppDispatch()
  const [componentName, setComponentName] = useState<string>("")
  const isNameAvailable = (componentName !== "" && !(componentName in tabs) && !(componentName === "SUPPLY"))

  return (
    
    <Popover>
        <PopoverTrigger>
          <Button variant="outline" size={"icon"}><PlusIcon /></Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <h4 className="font-medium leading-none">Add New Component</h4>
            <p className="text-sm text-muted-foreground">
              Please enter the name of the component
            </p>
          </div>
          <div className="flex gap-2">
            <Input value={componentName} onChange={(e) => setComponentName(e.target.value)} placeholder="Component Name" />
            <PopoverClose>  
              <Button disabled={!isNameAvailable} onClick={() => {setComponentName(""); dispatch(addNewTab({newTab: componentName}))}} >Add</Button>
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
  )
}