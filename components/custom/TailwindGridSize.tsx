import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useDispatch, useSelector } from 'react-redux'
import { updateSelectedStyle } from '@/lib/redux/slices/projectSlice'
import { selectProject } from '@/lib/redux/store'
import { getParentChild } from '@/lib/componentType'
import { Label } from '../ui/label'
import { ComponentType } from '@/lib/types'

export const TailwindGridSize = () => {
  const [hoverIndex, setHoverIndex] = useState<[number, number]>([-1, -1])
  const [isOpen, setIsOpen] = useState(false)

  const dispatch = useDispatch()


  const { tabs, selectedPath, currentTab } = useSelector(selectProject)
  // if (!selectedPath) return null;

  const component = (selectedPath ? getParentChild(tabs[currentTab].root, selectedPath).child as ComponentType : undefined) as ComponentType;
  const CurrentStyle = component.styleOptions.find((styleOption) => styleOption.label === "Grid Size");
  const tailwind = CurrentStyle?.tailwind.split(" ") || ["", "", ""];
  const rows = +(tailwind[0].split("-")[2]!) - 1;
  const cols = +(tailwind[1].split("-")[2]!) - 1;

  useEffect(() => {
    if (component && hoverIndex[0] !== rows && hoverIndex[1] !== cols) {
      setHoverIndex([rows, cols])
    }
  }, [rows, cols])

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex justify-between items-center px-2'>
        <Label className=''>Set Grid Size</Label>
        {(rows && cols) ? <p className='text-xs text-muted-foreground'>{`${rows+1} x ${cols+1}`}</p> : <></>}
      </div>
      <Popover open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <PopoverTrigger asChild>
          <Button className='w-full'>Set Size</Button>
        </PopoverTrigger>
        <PopoverContent className='w-fit'>
          <div onMouseLeave={() => setHoverIndex([rows, cols])} className='flex flex-col gap-2'>
            <div className='flex flex-col gap-0.5'>
              {Array.from({ length: 12 }).map((_, row) => (
                <div className='flex gap-0.5'>
                  {Array.from({ length: 12 }).map((_, col) => (
                    <div className={`size-5 rounded-sm ${row <= hoverIndex[0] && col <= hoverIndex[1] ? "bg-foreground" : "bg-secondary" } ${
                      row <= rows && col <= cols ? "bg-foreground" : ""
                    } ${row === hoverIndex[0] && col === hoverIndex[1] ? "bg-foreground" : ""
                    }`}
                      onMouseEnter={() => setHoverIndex([row, col])}
                      onClick={() => {
                        setIsOpen(false);
                        dispatch(updateSelectedStyle({
                          newStyle: {
                            label: "Grid Size",
                            tailwind: `grid-rows-${row + 1} grid-cols-${col + 1}`,
                            CSSKey: ["gridTemplateRows", "gridTemplateColumns"],
                            CSSValue: [`repeat(${row + 1}, minmax(0, 1fr))`, `repeat(${col + 1}, minmax(0, 1fr))`]
                          }
                        }))
                      }}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}