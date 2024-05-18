import { getParentChild } from "@/lib/componentType"
import { useAppSelector } from "@/lib/redux/hooks"
import { selectComponents } from "@/lib/redux/store"
import { generateCode } from "@/lib/utils"

export const CodePreview = () => {

  // const { tabs, currentTab, selectedPath } = useAppSelector(selectComponents)
  

  // const component = getParentChild(tabs[currentTab].root, selectedPath || []).child
  // const code = generateCode(component)

  return (
    <>Code Preview</>
    // <p className="">{code}</p>
  )
}
