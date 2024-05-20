'use client';

import { getParentChild } from "@/lib/componentType"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { setSelectedInnerText } from "@/lib/redux/slices/projectSlice"
import { selectProject } from "@/lib/redux/store"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { ComponentType } from "@/lib/types"
import { useEffect, useRef } from "react"

export const AttributeMenu = () => {

  const { tabs, selectedPath, currentTab } = useAppSelector(selectProject)

  const dispatch = useAppDispatch()

  const component = selectedPath ? getParentChild(tabs[currentTab].root, selectedPath).child : undefined;

  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (!inputRef.current) return;

    function handler(e: KeyboardEvent) {
      if (e.ctrlKey && e.key === 'i' && component) {
        console.log("first");
        (inputRef.current as HTMLInputElement).focus();
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler);
    
  }, [inputRef.current]);

  return (
    <div className="flex flex-col gap-2 p-2">
      <Label className="text-md">Inner Text:</Label>
      <Input ref={inputRef} placeholder={"Inner Text"} value={(component as ComponentType).innerText || ""} onChange={(e) => dispatch(setSelectedInnerText({ text: e.target.value }))} className="w-full" />
    </div>
  )
}
