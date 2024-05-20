import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAppSelector } from "@/lib/redux/hooks"
import { addStyleOptions } from "@/lib/redux/slices/memoSlice"
import { openProject } from "@/lib/redux/slices/projectSlice"
import { selectMemo } from "@/lib/redux/store"
import { FetchedProjectType, ProjectType, TabType } from "@/lib/types"
import { deepCopy, parseRoot } from "@/lib/utils"
import { OpenInNewWindowIcon, Pencil1Icon } from "@radix-ui/react-icons"
import { useState } from "react"
import { useDispatch } from "react-redux"

type ProjectCardProps = {
  project: FetchedProjectType | ProjectType
  isCurrent?: boolean
}

export const ProjectCard: React.FC<ProjectCardProps> = ({project, isCurrent=false}) => {

  const { styleOptionsMemo } = useAppSelector(selectMemo)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  const openInEditor = async () => {

    const parsedTabs = await JSON.parse((project as FetchedProjectType).tabs)

    const tabsToLoad: Record<string, TabType> = {}

    //TODO: change to promise.all for efficiency
    for (const key of Object.keys(parsedTabs)) {
      const {root, newMemos} = await parseRoot(parsedTabs[key].root as string, false, deepCopy(styleOptionsMemo))
      dispatch(addStyleOptions({styleOptions: newMemos}))
      tabsToLoad[key] = {
        ...parsedTabs[key],
        root
      }
    }
    dispatch(openProject({_id: (project as FetchedProjectType)._id, name: (project as FetchedProjectType).name, tabs: tabsToLoad}))
    setLoading(false)
  }

  const isFetched = ('description' in project)

  const name = project.name
  const description = isFetched ? project.description : "This is the default editor for unsaved projects"
  const updatedAt = isFetched ? new Date(project.updatedAt).toLocaleDateString() : new Date().toLocaleDateString()

  return (
    <Card className="flex flex-col rounded-sm gap-3 p-3 w-full max-w-md">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{updatedAt}</p>
      </div>
      <Separator />
      <p className="text-sm text-muted-foreground">{description}</p>
      {isCurrent ?
      <Button variant={"outline"} className="flex items-center gap-2 flex-1">
        <p>Save Project</p>
        <Pencil1Icon />
      </Button>:
      <Button disabled={loading} onClick={() => {setLoading(true); openInEditor()}} variant={"outline"} className="flex items-center gap-2 flex-1">
        <p>Open Project</p>
        <OpenInNewWindowIcon />
      </Button>}
    </Card>
  )
}
