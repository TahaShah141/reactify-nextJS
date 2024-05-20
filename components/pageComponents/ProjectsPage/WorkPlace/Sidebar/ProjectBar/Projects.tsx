import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { selectProject, selectUser } from "@/lib/redux/store"
import { ProjectCard } from "./ProjectCard"
import { useEffect, useState } from "react"
import { FetchedProjectType } from "@/lib/types"
import { Loading } from "@/components/custom/Loading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { reset } from "@/lib/redux/slices/projectSlice"

export const Projects = () => {

  const project = useAppSelector(selectProject)
  const dispatch = useAppDispatch()
  const isEditor = project._id === undefined

  const { user } = useAppSelector(selectUser)

  const [projects, setProjects] = useState<FetchedProjectType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) return;
      const {projects} = await (await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/project/${user._id}`, {
        method: "GET",
        // next: {revalidate: 10}        
      })).json()
      setProjects(projects)
      setLoading(false)
    }
    fetchProjects()
  }, [user])

  return (
    <div className="flex flex-wrap gap-4">
      <ProjectCard project={project} isCurrent />
      {!isEditor && <Button onClick={() => dispatch(reset())} className="w-full">Open New Project</Button>}
      <Separator />
      {(!loading && projects) && 
      <>
      {projects.filter(proj => proj._id !== project._id).map(project => <ProjectCard key={project._id} project={project} />)}
      </>}
      {loading && <Loading />}
    </div>
  )
}
