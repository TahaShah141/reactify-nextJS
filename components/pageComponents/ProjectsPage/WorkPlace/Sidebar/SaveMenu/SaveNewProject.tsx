'use client';

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/lib/redux/hooks"
import { selectProject, selectUser } from "@/lib/redux/store"
import { TabType } from "@/lib/types"
import { generateRootString } from "@/lib/utils";
import { useState } from "react"

export const SaveNewProject = () => {

  const {tabs} = useAppSelector(selectProject)
  const { toast } = useToast()

  const [loading, setLoading] = useState(false)
  const [state, setState] = useState({
    name: "",
    description: "",
    error: ""
  })

  const { user } = useAppSelector(selectUser)

  const saveProject = async (name: string, description: string, tabs: Record<string, TabType>, _id: string) => {

    const newTabs: Record<string, {imports: string[], root: string}> = {}

    toast({
      description: "Compiling Code..."
    })

    //TODO: change to promise.all for performance
    for (const key of Object.keys(tabs)) {
      newTabs[key] = {
        ...tabs[key],
        root: await generateRootString(tabs[key].root)
      }
    }

    const finalTabs = JSON.stringify(newTabs)

    const { project, error } = await (await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/project/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({name, description, tabs: finalTabs, _id})
    })).json()

    
    if (error) {
      setState({...state, error})
      setLoading(false)
      return;
    } 
    
    setLoading(false)
    toast({
      description: "Project saved",
    })
    setState({name: "", description: "", error: ""})
  }

  return (
    <Card className="p-4 rounded-sm flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg">Save New Project</h3>
        <p className="text-sm text-muted-foreground">Save current project as a New Project to come back to later...</p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <Label className="text-md">Name</Label>
          <Input value={state.name} onChange={(e) => setState({...state, name: e.target.value, error: ""})} placeholder="Project Name" />
        </div>
        <div className="flex flex-col gap-1">
          <Label className="text-md">Description</Label>
          <Textarea value={state.description} onChange={(e) => setState({...state, description: e.target.value, error: ""})} placeholder="Project Description" />
        </div>
        {state.error && <p className="text-xs text-red-500">{state.error}</p>}
      </div>
      <Button onClick={() => {
        setLoading(true)
        saveProject(
          state.name, 
          state.description, 
          tabs,
          user?._id as string
        )}} 
        disabled={loading || state.error !== "" ||
        state.name === "" || 
        state.description === ""}>
        
        Upload Project
        
      </Button>
    </Card>
  )
}
