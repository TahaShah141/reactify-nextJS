import { Button } from "@/components/ui/button"
import { PlusIcon } from "@radix-ui/react-icons"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { PopoverClose } from "@radix-ui/react-popover"
import { useEffect, useState } from "react"
import { addNewTab } from "@/lib/redux/slices/projectSlice"
import { selectProject } from "@/lib/redux/store"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { ComponentType } from "@/lib/types"

export const AddComponent = () => {

  const { tabs, supply } = useAppSelector(selectProject)
  const dispatch = useAppDispatch()
  const [componentName, setComponentName] = useState<string>("")
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    if (`!@#$%^&*()=+-{}\|;\\,',./`.split('').some(c => componentName.includes(c))) {
      setError('Name can only contain letters, numbers, and underscores');
    }
    if (componentName.endsWith('Icon')) {
      setError('Name cannot end with "Icon"');
    }
    if (componentName.includes(' ')) {
      setError('Name cannot include spaces');
    }
    if (componentName in tabs) {
      setError('Name is taken by another component');
    }
    if (componentName === "SUPPLY") {
      setError('Name cannot be SUPPLY');
    }
    supply.children.forEach(child =>
      (child as ComponentType).children.some(grandChild => { if ((grandChild as ComponentType).tag === componentName) setError('This name is not allowed') })
    )
  }, [componentName]);

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
          <p className="text-sm  text-red-400">
            {error}
          </p>
        </div>
        <form className="flex gap-2">
          <Input value={componentName} onChange={(e) => setComponentName(e.target.value)} placeholder="Component Name" />
          <PopoverClose>
            <Button disabled={!!error || componentName === ''} onClick={() => { setComponentName(""); dispatch(addNewTab({ newTab: componentName })) }} >Add</Button>
          </PopoverClose>
        </form>
      </PopoverContent>
    </Popover>
  )
}