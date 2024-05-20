import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { IconsList } from "@/lib/IconsList"
import { useAppDispatch } from "@/lib/redux/hooks"
import { copyIntoClipboard } from "@/lib/redux/slices/projectSlice"
import { ComponentType } from "@/lib/types"

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
    styleOptions: [
      {
        label: "Width",
        tailwind: "w-8",
        CSSKey: "width",
        CSSValue: "2rem"
      },
      {
        label: "Height",
        tailwind: "h-8",
        CSSKey: "height",
        CSSValue: "2rem"
      },
    ],
  }
}

export const Icons = () => {

  const dispatch = useAppDispatch()

  return (
    <div className="w-full flex flex-col gap-4">
      {Object.keys(IconsList).map(letter => 
        <div className="flex flex-col gap-2" key={letter}>
          <Label className="font-bold">{letter}</Label>
          <div className="flex flex-wrap gap-px px-2">
            {Object.keys(IconsList[letter]).map(iconName => 
              <Button onClick={() => dispatch(copyIntoClipboard({component: getComponent(iconName)}))} size={"icon"} variant="outline" key={iconName}>
                {IconsList[letter][iconName]}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
