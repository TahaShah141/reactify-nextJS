import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ProjectType } from "@/lib/types"
import { OpenInNewWindowIcon } from "@radix-ui/react-icons"
import { useState } from "react"

type ProjectCardProps = {
  project: ProjectType
}

export const ProjectCard: React.FC<ProjectCardProps> = ({project}) => {

  const { name, description, tabs } = project

  const [collapsed, setCollapsed] = useState(true)

  return (
    <Card className="flex flex-col rounded-sm gap-3 p-3 w-full max-w-md ">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <h3 className="text-xl font-semibold">{name}</h3>
        <Button variant={"outline"} className="flex items-center gap-2">
          <p>Open</p>
          <OpenInNewWindowIcon />
        </Button>
      </div>
      <Separator />
      <p className="text-sm text-muted-foreground">{description}</p> 
      {/* {collapsed ? 
      <Button variant={"outline"} onClick={() => setCollapsed(false)}>Show Details</Button> : 
      <div className="flex flex-col gap-2">
        <Button variant={"secondary"} onClick={() => setCollapsed(true)}>Hide Details</Button>
        <div className="flex flex-wrap gap-2">
          {Object.keys(tabs).map(tab => <Card className="flex flex-1 justify-center items-center py-1 px-3 rounded-none min-w-24">{tab}</Card>)}
        </div>
      </div>} */}
    </Card>
  )
}
