import { ComponentType, StyleType, getParentChild } from '@/lib/componentType'
import React from 'react'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useDispatch, useSelector } from 'react-redux'
import { updateSelectedStyle } from '@/lib/redux/slices/componentsSlice'
import { getSingularValue } from '@/lib/utils'
import { selectComponents } from '@/lib/redux/store'

type RangeProps = {
  label: string
  placeholder?: string
  options: StyleType[]
}

export const StyleRange: React.FC<RangeProps> = ({ label, placeholder, options }) => {

  const dispatch = useDispatch();

  const { tabs, selectedPath, currentTab } = useSelector(selectComponents)

  const component = (selectedPath ? getParentChild(tabs[currentTab].root, selectedPath).child as ComponentType : undefined) as ComponentType;


  let index = options.findIndex((option) => {
    return component?.styleOptions.some((styleOption) => styleOption.tailwind === option.tailwind)
  });

  return (
    <div className='flex flex-1 justify-between items-center'>
      {label && <Label className="text-sm">{label}</Label>}
      <Select 
      value={index === -1 ? undefined : getSingularValue(options[index].tailwind)}
      onValueChange={(value) => {
        const newStyle = options.find((option) => option.tailwind === value);
        if (newStyle) dispatch(updateSelectedStyle({ newStyle }))
      }}>
        <SelectTrigger className={`${label ? "max-w-40 flex-1" : "flex-1"}`}>
          <SelectValue placeholder={`Select ${placeholder || label}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={getSingularValue(option.tailwind)} value={getSingularValue(option.tailwind)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}