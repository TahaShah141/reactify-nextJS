import { Section, getStylingSections } from "@/lib/StyleOptions/getStylingSections"
import { ComponentType, getParentChild } from "@/lib/componentType"
import { selectComponents } from "@/lib/redux/store"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { useMemo } from "react"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { removeFromSelectedStyle, updateSelectedStyle } from "@/lib/redux/slices/componentsSlice"
import { Cross1Icon } from "@radix-ui/react-icons"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"

export const StyleMenu = () => {
  
  const { tabs, selectedPath, currentTab, customClasses } = useAppSelector(selectComponents)
  const dispatch = useAppDispatch()

  const component = getParentChild(tabs[currentTab].root, selectedPath!).child as ComponentType
  
  const sections: Section[] = useMemo(() => {
    const customClassButtons = 
    customClasses.map(Class => 
      <Button className="w-full" variant="outline" 
      onClick={() => 
        Class.styles.forEach(style => 
          dispatch(updateSelectedStyle({newStyle: style}))
        )
      }>{Class.name}</Button>)

    return component ? getStylingSections(component, customClassButtons) : []
  }, [component, customClasses])
  
  return (
    <Accordion type="single" collapsible className="w-full">
      {sections.map(section => 
        <AccordionItem value={section.title} key={section.title}>
          <AccordionTrigger className='text-lg'>{section.title}</AccordionTrigger>
          <AccordionContent className="flex w-full h-fit flex-col gap-2">
            {section.items.map((item, i) =>

            <>
              {item !== undefined && <>
                {section.showCards ? 
                <Card key={i} className="relative group p-3 rounded-sm">
                  {item.node}
                  <Button onClick={() => dispatch(removeFromSelectedStyle({CSSKeys: item.CSSKeys !== undefined ? item.CSSKeys : [""] }))} className="absolute hidden group-hover:flex top-1 right-1 size-4 p-1 rounded-sm" size={"icon"} variant="destructive"><Cross1Icon /></Button>
                </Card>: <>{item.node}</>}
              </>}
            </>)}
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>
  )
}