// 'use client';

import { getStylingSections } from "@/lib/StyleOptions/getStylingSections"
import { getParentChild } from "@/lib/componentType"
import { selectComponents } from "@/lib/redux/store"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { removeFromSelectedStyle, updateSelectedStyle } from "@/lib/redux/slices/componentsSlice"
import { Cross1Icon } from "@radix-ui/react-icons"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { ComponentType, Section } from "@/lib/types"
import { AttributeMenu } from "./AttributeMenu"
import { Input } from "@/components/ui/input"

export const StyleMenu = () => {
  const [ query, setQuery] = useState('');
  const { tabs, selectedPath, currentTab, customClasses } = useAppSelector(selectComponents)
  const dispatch = useAppDispatch()

  const component = getParentChild(tabs[currentTab].root, selectedPath!).child as ComponentType

  const sections: Section[] = useMemo(() => {
    const customClassButtons =
      customClasses.map(Class =>
        <Button className="w-full" variant="outline"
          onClick={() =>
            Class.styles.forEach(style =>
              dispatch(updateSelectedStyle({ newStyle: style }))
            )
          }>{Class.name}</Button>)

    return component ? getStylingSections(component, customClassButtons) : []
  }, [component, customClasses])

  const matchingSections = sections.filter(section => 
    query == "" || section.title.includes(query) || section.items.some(item => item?.CSSKeys?.flat().some(key => key.includes(query)))
  )

  console.log({query, matchingSections})

  return (
    <div className="">
      <Input className="text-md my-4" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search ..."/>

      <div className="flex flex-col gap-6">
        {/* {sections.map(section => */}
        {matchingSections.map(section =>
          <div className="">
            <h2 className="text-lg">{section.title}</h2>
            <div className="flex w-full h-fit flex-col gap-2">
              {section.items.map((item, i) =>

                <>
                  {item !== undefined && <>
                    {section.showCards ?
                      <Card key={i} className="relative group p-3 rounded-sm">
                        {item.node}
                        <Button onClick={() => dispatch(removeFromSelectedStyle({ CSSKeys: item.CSSKeys !== undefined ? item.CSSKeys : [""] }))} className="absolute hidden group-hover:flex top-1 right-1 size-4 p-1 rounded-sm" size={"icon"} variant="destructive"><Cross1Icon /></Button>
                      </Card> : <>{item.node}</>}
                  </>}
                </>)}
            </div>
          </div>
        )}

        <AttributeMenu />

      </div>
    </div>

    // <Accordion type="single" collapsible className="w-full">
    //   {sections.map(section =>
    //     <AccordionItem value={section.title} key={section.title}>
    //       <AccordionTrigger className='text-lg'>{section.title}</AccordionTrigger>
    //       <AccordionContent className="flex w-full h-fit flex-col gap-2">
    //         {section.items.map((item, i) =>

    //           <>
    //             {item !== undefined && <>
    //               {section.showCards ?
    //                 <Card key={i} className="relative group p-3 rounded-sm">
    //                   {item.node}
    //                   <Button onClick={() => dispatch(removeFromSelectedStyle({ CSSKeys: item.CSSKeys !== undefined ? item.CSSKeys : [""] }))} className="absolute hidden group-hover:flex top-1 right-1 size-4 p-1 rounded-sm" size={"icon"} variant="destructive"><Cross1Icon /></Button>
    //                 </Card> : <>{item.node}</>}
    //             </>}
    //           </>)}
    //       </AccordionContent>
    //     </AccordionItem>
    //   )}
    //       <AttributeMenu />

    //   {/* Shortcut not working when Attribute-Menu is not rendered */}
    //   {/* One fix require this whole component to be Client but I am very against this. */}

    //   {/* <AccordionItem value={"Attributes"} key={"Attributes"}>
    //     <AccordionTrigger className='text-lg'>Attributes</AccordionTrigger>
    //     <AccordionContent className="flex w-full h-fit flex-col gap-2">
    //       <AttributeMenu />
    //     </AccordionContent>
    //   </AccordionItem> */}

    // </Accordion>
  )
}