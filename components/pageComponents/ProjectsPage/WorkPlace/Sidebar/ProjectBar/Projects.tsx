import { useAppSelector } from "@/lib/redux/hooks"
import { selectProject } from "@/lib/redux/store"
import { ProjectCard } from "./ProjectCard"

export const Projects = () => {

  const project = useAppSelector(selectProject)

  return (
    <div className="flex flex-wrap gap-4">
      {Array(10).fill(0).map((_, index) => <ProjectCard project={project}/>)}
    </div>
  )
}
