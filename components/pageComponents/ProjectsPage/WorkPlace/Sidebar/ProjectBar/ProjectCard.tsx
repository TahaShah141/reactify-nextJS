import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { useAppSelector } from "@/lib/redux/hooks"
import { addStyleOptions } from "@/lib/redux/slices/memoSlice"
import { openProject } from "@/lib/redux/slices/projectSlice"
import { deleteProject } from "@/lib/redux/slices/userSlice"
import { selectMemo, selectUser } from "@/lib/redux/store"
import { FetchedProjectType, ProjectType, TabType } from "@/lib/types"
import { deepCopy, generateRootString, parseRoot } from "@/lib/utils"
import { DotsVerticalIcon, OpenInNewWindowIcon, Pencil1Icon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

type ProjectCardProps = {
  project: FetchedProjectType | ProjectType
  isCurrent?: boolean
}

export const ProjectCard: React.FC<ProjectCardProps> = ({project, isCurrent=false}) => {

  const { styleOptionsMemo } = useAppSelector(selectMemo)
  const { user } = useAppSelector(selectUser)
  const dispatch = useDispatch()
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

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

  const saveProject = async () => {
    const {tabs, _id} = project as ProjectType

    const newTabs: Record<string, {imports: string[], root: string}> = {}

    //TODO: change to promise.all for performance
    for (const key of Object.keys(tabs)) {
      newTabs[key] = {
        ...tabs[key],
        root: await generateRootString(tabs[key].root)
      }
    }

    const finalTabs = JSON.stringify(newTabs)

    const { project: proj, error } = await (await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/project/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({tabs: finalTabs, _id})
    })).json()

    if (error) {
      setError(error)
      setLoading(false)
      return
    }
    setLoading(false)
    dispatch(deleteProject({projectID: project._id as string}))
  }

  const deleteProj = async () => {
    if (!user) return;
    const { error } = await (await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/project/delete/${user._id}/${project._id}`)).json()

    if (error) {
      setError(error)
    }
    setLoading(false)
  }

  useEffect(()=> {
    if (error !== "") setTimeout(() => setError(""), 2000)
  }, [error])

  const isFetched = ('description' in project)

  const name = project.name
  const description = isFetched ? project.description : "This project is currently open in the Editor"
  const updatedAt = isFetched ? new Date(project.updatedAt).toLocaleDateString() : new Date().toLocaleDateString()

  return (
    <Card className="flex flex-col rounded-sm gap-3 p-3 w-full max-w-md">
      <div className="flex flex-wrap justify-between items-center gap-2">
          <h3 className="text-xl font-semibold">{name}</h3>
        <div className="flex gap-1 items-center">
          <p className="text-sm text-muted-foreground">{updatedAt}</p>
          {isCurrent && 
          <Popover>
            <PopoverTrigger asChild>
              <Button size={"icon"} className="p-px" variant={"ghost"}><DotsVerticalIcon /></Button>
            </PopoverTrigger>
            <PopoverContent className="p-1 flex flex-col w-32">
              <Button disabled={loading} onClick={() => {setLoading(true); deleteProj();}} variant={"destructive"} className="">Delete Project</Button>
            </PopoverContent>
          </Popover>
          }
        </div>
      </div>
      <Separator />
      <p className="text-sm text-muted-foreground">{description}</p>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {isCurrent ?
      <Button disabled={error !== "" || loading} onClick={() => {if (project._id) {setLoading(true); saveProject()} else router.push("/project?tab=save")}} variant={"outline"} className="flex items-center gap-2 flex-1">
        <p>Save Project</p>
        <Pencil1Icon />
      </Button>:
      <Button disabled={error !== "" || loading} onClick={() => {setLoading(true); openInEditor()}} variant={"outline"} className="flex items-center gap-2 flex-1">
        <p>Open Project</p>
        <OpenInNewWindowIcon />
      </Button>}
    </Card>
  )
}
