'use client';

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getParentChild, populateComponent } from "@/lib/componentType"
import { useAppSelector } from "@/lib/redux/hooks"
import { selectProject, selectUser } from "@/lib/redux/store"
import { ComponentType } from "@/lib/types"
import { useState } from "react"

export const SaveSnippet = () => {

  const {tabs, currentTab, selectedPath} = useAppSelector(selectProject)
  const component = selectedPath ? getParentChild(tabs[currentTab].root, selectedPath).child : undefined

  const [loading, setLoading] = useState(false)
  const [state, setState] = useState({
    name: "",
    description: "",
    error: ""
  })

  const { user } = useAppSelector(selectUser)

  const saveSnippet = async (email: string, name: string, description: string, root: ComponentType) => {

    const { snippet, error } = await (await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/snippet/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email, name, description, root})
    })).json()

    
    if (error) {
      setState({...state, error})
      setLoading(false)
      return;
    } 
    
    setLoading(false)
    setState({name: "", description: "", error: ""})
  }

  return (
    <>
    {component && 
      <Card className="p-4 rounded-sm flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg">Save Snippet</h3>
          <p className="text-sm text-muted-foreground">Upload Selected Component as a Snippet for the world to use!!</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <Label className="text-md">Name</Label>
            <Input value={state.name} onChange={(e) => setState({...state, name: e.target.value, error: ""})} placeholder="Snippet Name" />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-md">Description</Label>
            <Textarea value={state.description} onChange={(e) => setState({...state, description: e.target.value, error: ""})} placeholder="Snippet Description" />
          </div>
          {state.error && <p className="text-xs text-red-500">{state.error}</p>}
        </div>
        <Button onClick={() => {
          setLoading(true)
          saveSnippet(
            user?.email.split("@")[0]!, 
            state.name, 
            state.description, 
            populateComponent(tabs, component)
          )}} 
          disabled={loading || state.error !== "" ||
          state.name === "" || 
          state.description === ""}>
          
          Upload
          
        </Button>
      </Card>}
    </>
  )
}
