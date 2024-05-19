import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useDispatch, useSelector } from 'react-redux'
import { updateSelectedStyle } from '@/lib/redux/slices/projectSlice'
import { getSingularValue } from '@/lib/utils'
import { selectProject } from '@/lib/redux/store'
import { getParentChild } from '@/lib/componentType'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { StyleType, ComponentType } from '@/lib/types'

type TailwindColorPickerProps = {
  label: string
  minimal?: boolean
  options: StyleType[]
}

export const TailwindColorPicker: React.FC<TailwindColorPickerProps> = ({label, options, minimal=false}) => {

  const { tabs, currentTab, selectedPath } = useSelector(selectProject)

  const component = getParentChild(tabs[currentTab].root, selectedPath!).child as ComponentType

  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)

  const componentColor = getSingularValue(component.styleOptions.find((styleOption) => styleOption.CSSKey === options[0].CSSKey)?.CSSValue);

  const popover =
  <Popover open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
    <PopoverTrigger asChild>
      <button className='size-8 rounded-md bg-black border border-white' style={{backgroundColor: componentColor}}></button>
    </PopoverTrigger>
    <PopoverContent className='w-fit'>
      <div className='flex flex-col gap-2'>
        <div className='grid gap-0.5' style={{gridTemplateColumns: `repeat(22, minmax(0, 1fr))`}}>
          {options.map(option => 
            <div key={option.tailwind} className={`size-4 rounded-[2px]`} style={{backgroundColor: getSingularValue(option.CSSValue)}} 
            onClick={() => {
              setIsOpen(false)
              dispatch(updateSelectedStyle({newStyle: option}))
            }}></div>
          )}
        </div>

        todo: Custom color with HSL sliders and input box
      </div>
    </PopoverContent>
  </Popover>
  
  return (
    <>
    {minimal ? 
    <>{popover}</> :
    <div className='flex flex-col gap-2'>
      <Label className="text-sm">{label}</Label>
      <div className='flex gap-2 px-2'>
        <Input className='flex-1' value={componentColor || "None"} />
        {popover}
      </div>
    </div>}
    </>
  )
}