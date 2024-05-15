import { useState } from "react"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { LockClosedIcon, LockOpen1Icon } from "@radix-ui/react-icons"
import { StyleRange } from "./StyleRange"
import { 
  marginOptions, 
  marginXOptions, 
  marginYOptions,
  marginBOptions, 
  marginLOptions, 
  marginROptions, 
  marginTOptions, 
} from "@/lib/StyleOptions/Sizing/marginOptions"

export const TailwindMargin = () => {

  const [mxLocked, setMXLocked] = useState(true)
  const [myLocked, setMYLocked] = useState(true)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <Label className="text-sm">Margin</Label>
        <div className="flex gap-2">
          <Button variant={"outline"} size={"sm"} onClick={() => setMXLocked(!mxLocked)} className="flex items-center">
            <div className="flex gap-1">
              {mxLocked ? <LockClosedIcon /> : <LockOpen1Icon />}
              <p>X</p>
            </div>
          </Button>
          <Button variant={"outline"} size={"sm"} onClick={() => setMYLocked(!myLocked)} className="flex items-center">
            <div className="flex gap-1">
              {myLocked ? <LockClosedIcon /> : <LockOpen1Icon />}
              <p>Y</p>
            </div>
          </Button>
        </div>
      </div>
      {mxLocked && myLocked && <StyleRange label="" placeholder="margin" options={marginOptions} />}
      {mxLocked && !myLocked && <StyleRange label="marginX" options={marginXOptions} />}
      {myLocked && !mxLocked && <StyleRange label="marginY" options={marginYOptions} />}
      {!myLocked && 
      <div className="flex flex-col gap-1">
        <StyleRange label="top" options={marginTOptions}/>
        <StyleRange label="bottom" options={marginBOptions}/>
      </div>}  
      {!mxLocked && 
      <div className="flex flex-col gap-1">
        <StyleRange label="left" options={marginLOptions}/>
        <StyleRange label="right" options={marginROptions}/>
      </div>}  
    </div>
  )
}