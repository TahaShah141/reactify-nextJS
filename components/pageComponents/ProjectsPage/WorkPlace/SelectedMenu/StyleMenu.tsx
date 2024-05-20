// 'use client';

import { getStylingSections } from "@/lib/StyleOptions/getStylingSections"
import { getParentChild } from "@/lib/componentType"
import { selectProject } from "@/lib/redux/store"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { removeFromSelectedStyle, updateSelectedStyle } from "@/lib/redux/slices/projectSlice"
import { Cross1Icon } from "@radix-ui/react-icons"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { ComponentType, Section } from "@/lib/types"
import { AttributeMenu } from "./AttributeMenu"
import { Input } from "@/components/ui/input"
import fuzzysort from 'fuzzysort';

export const StyleMenu = () => {
  const [query, setQuery] = useState('');
  const { tabs, selectedPath, currentTab, customClasses } = useAppSelector(selectProject)
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

  let matchingSections = sections;

  if (query !== '') {
    const results = fuzzysort.go(query, sections, {
      keys: ['title', obj => obj.items.map(o => o?.tags?.flat().join(' ') || '').join(' ')]
    });
    matchingSections = results.map(res => res.obj);
  }

  return (
    <div className="">
      <Input className="text-md my-4" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Sections ..." />

      <div className="flex flex-col gap-6">
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
      </div>
    </div>


  )
}