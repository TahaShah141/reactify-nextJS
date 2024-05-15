import { useState } from "react"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { LockClosedIcon, LockOpen1Icon } from "@radix-ui/react-icons"
import { StyleRange } from "./StyleRange"
import { 
  paddingOptions, 
  paddingXOptions, 
  paddingYOptions,
  paddingBOptions, 
  paddingLOptions, 
  paddingROptions, 
  paddingTOptions, 
} from "@/lib/StyleOptions/Sizing/paddingOptions"

export const TailwindPadding = () => {

  const [pxLocked, setPXLocked] = useState(true)
  const [pyLocked, setPYLocked] = useState(true)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <Label className="text-sm">Padding</Label>
        <div className="flex gap-2">
          <Button variant={"outline"} size={"sm"} onClick={() => setPXLocked(!pxLocked)} className="flex items-center">
            <div className="flex gap-1">
              {pxLocked ? <LockClosedIcon /> : <LockOpen1Icon />}
              <p>X</p>
            </div>
          </Button>
          <Button variant={"outline"} size={"sm"} onClick={() => setPYLocked(!pyLocked)} className="flex items-center">
            <div className="flex gap-1">
              {pyLocked ? <LockClosedIcon /> : <LockOpen1Icon />}
              <p>Y</p>
            </div>
          </Button>
        </div>
      </div>
      {pxLocked && pyLocked && <StyleRange label="" placeholder="padding" options={paddingOptions} />}
      {pxLocked && !pyLocked && <StyleRange label="paddingX" options={paddingXOptions} />}
      {pyLocked && !pxLocked && <StyleRange label="paddingY" options={paddingYOptions} />}
      {!pyLocked && 
      <div className="flex flex-col gap-1">
        <StyleRange label="top" options={paddingTOptions}/>
        <StyleRange label="bottom" options={paddingBOptions}/>
      </div>}  
      {!pxLocked && 
      <div className="flex flex-col gap-1">
        <StyleRange label="left" options={paddingLOptions}/>
        <StyleRange label="right" options={paddingROptions}/>
      </div>}  
    </div>
  )
}