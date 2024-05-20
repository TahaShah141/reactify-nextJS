import { SaveNewProject } from "./SaveNewProject"
import { SaveSnippet } from "./SaveSnippet"

export const SaveMenu = () => {

  return (
    <div className="flex flex-col gap-2">
      <SaveNewProject />
      <SaveSnippet />
    </div>
  )
}
