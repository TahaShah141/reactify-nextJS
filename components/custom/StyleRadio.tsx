import { ComponentType, StyleType, getParentChild } from '@/lib/componentType'
import React from 'react'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import { Label } from '../ui/label'
import { useDispatch, useSelector } from 'react-redux'
import { updateSelectedStyle } from '@/lib/redux/slices/componentsSlice'
import { getSingularValue } from '@/lib/utils'
import { selectComponents } from '@/lib/redux/store'

type RadioProps = {
  label: string
  options: StyleType[]
  rows: number
  cols: number
}

export const StyleRadio: React.FC<RadioProps> = ({label, options, rows, cols}) => {

  const dispatch = useDispatch()

  const { tabs, selectedPath, currentTab } = useSelector(selectComponents)
  
  const component = (selectedPath ? getParentChild(tabs[currentTab].root, selectedPath).child as ComponentType : undefined) as ComponentType;
  
  
  let index = options.findIndex((option) => {
    return component?.styleOptions.some((styleOption) => styleOption.tailwind === option.tailwind)
  });  
    
  return (
    <div className='flex flex-col gap-2'>
      <Label className="text-sm">{label}</Label>
      <ToggleGroup className="grid gap-1" type="single" 
      style={{gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`}}
      variant={"outline"} 
      value={index === -1 ? undefined : getSingularValue(options[index].tailwind)}
      onValueChange={(value) => {
        const newStyle = options.find((option) => option.tailwind === value);
        if (newStyle) dispatch(updateSelectedStyle({newStyle}))
      }}>
        {options.map((option) => (
          <ToggleGroupItem className="" key={getSingularValue(option.tailwind)} value={getSingularValue(option.tailwind)}>
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}