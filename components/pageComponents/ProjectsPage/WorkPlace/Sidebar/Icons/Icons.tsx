import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { IconsList } from "@/lib/IconsList"
import { useAppDispatch } from "@/lib/redux/hooks"
import { copyIntoClipboard } from "@/lib/redux/slices/projectSlice"
import { ComponentType } from "@/lib/types"
import { useRef, useState } from "react"

import { CheckIcon, CopyIcon } from '@radix-ui/react-icons';
import { useToast } from "@/components/ui/use-toast"

const getComponent = (name: string): ComponentType => {
  return {
    id: name,
    tag: name,
    children: [],
    className: "",
    data: {
      tabID: "SUPPLY",
      rootID: "SUPPLY",
      selected: false,
      draggable: true,
      droppable: true,
      canHaveChildren: false,
      path: [],      
    },
    innerText: "",
    styleOptions: [],
  }
}

export const Icons = () => {

  const dispatch = useAppDispatch()

  const [showCopied, setShowCopied] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout>();
  const {toast} = useToast(); 

  function handleClick(iconName: string) {
    dispatch(copyIntoClipboard({component: getComponent(iconName)}))
    setShowCopied(iconName);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowCopied(''), 1000);
    toast({
      description: `Copied ${iconName}!`
    })
  } 


  return (
    <div className="w-full flex flex-col gap-4">
      {Object.keys(IconsList).map(letter => 
        <div className="flex flex-col gap-2" key={letter}>
          <Label className="font-bold">{letter}</Label>
          <div className="flex flex-wrap gap-px px-2">
            {Object.keys(IconsList[letter]).map(iconName => 
              <Button onClick={() => handleClick(iconName)} size={"icon"} variant="outline" key={iconName}>
                {showCopied == iconName ? <CheckIcon color="#00f0f4"/> :IconsList[letter][iconName]}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
