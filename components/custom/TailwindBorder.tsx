import { useState } from "react"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { LockClosedIcon, LockOpen1Icon } from "@radix-ui/react-icons"
import { StyleRange } from "./StyleRange"
import { TailwindColorPicker } from "./TailwindColorPicker"
import { borderWidthOptions, borderXWidthOptions, borderYWidthOptions, borderTWidthOptions, borderBWidthOptions, borderLWidthOptions, borderRWidthOptions } from "@/lib/StyleOptions/Border/borderWidthOptions"
import { borderBColorOptions, borderColorOptions, borderLColorOptions, borderRColorOptions, borderTColorOptions, borderXColorOptions, borderYColorOptions } from "@/lib/StyleOptions/Border/borderColorOptions"

export const TailwindBorderWidth = () => {

  const [borderXLocked, setBorderXLocked] = useState(true)
  const [borderYLocked, setBorderYLocked] = useState(true)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <Label className="text-sm">Border</Label>
        <div className="flex gap-2">
          <Button variant={"outline"} size={"sm"} onClick={() => setBorderXLocked(!borderXLocked)} className="flex items-center">
            <div className="flex gap-1">
              {borderXLocked ? <LockClosedIcon /> : <LockOpen1Icon />}
              <p>X</p>
            </div>
          </Button>
          <Button variant={"outline"} size={"sm"} onClick={() => setBorderYLocked(!borderYLocked)} className="flex items-center">
            <div className="flex gap-1">
              {borderYLocked ? <LockClosedIcon /> : <LockOpen1Icon />}
              <p>Y</p>
            </div>
          </Button>
        </div>
      </div>
      {borderXLocked && borderYLocked && 
      <div className="flex gap-2 items-center">
        <StyleRange label="" placeholder="border" options={borderWidthOptions} />
        <TailwindColorPicker minimal label="color" options={borderColorOptions} /> 
      </div>
      }
      {borderXLocked && !borderYLocked && 
      <div className="flex gap-2 items-center">
        <StyleRange label="X"  options={borderXWidthOptions} />
        <TailwindColorPicker minimal label="color" options={borderXColorOptions} /> 
      </div>}
      {borderYLocked && !borderXLocked && 
      <div className="flex gap-2 items-center">
        <StyleRange label="Y" options={borderYWidthOptions} />
        <TailwindColorPicker minimal label="color" options={borderYColorOptions} /> 
      </div>}
      {!borderYLocked && 
      <div className="flex flex-col gap-1">
        <div className="flex gap-2 items-center">
          <StyleRange label="top" options={borderTWidthOptions} />
          <TailwindColorPicker minimal label="color" options={borderTColorOptions} /> 
        </div>
        <div className="flex gap-2 items-center">
          <StyleRange label="bottom" options={borderBWidthOptions} />
          <TailwindColorPicker minimal label="color" options={borderBColorOptions} /> 
        </div>
      </div>}  
      {!borderXLocked && 
      <div className="flex flex-col gap-1">
        <div className="flex gap-2 items-center">
          <StyleRange label="left" options={borderLWidthOptions} />
          <TailwindColorPicker minimal label="color" options={borderLColorOptions} /> 
        </div>
        <div className="flex gap-2 items-center">
          <StyleRange label="right" options={borderRWidthOptions} />
          <TailwindColorPicker minimal label="color" options={borderRColorOptions} /> 
        </div>
      </div>}   
    </div>
  )
}