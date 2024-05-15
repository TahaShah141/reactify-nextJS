import { Layers } from "@/components/pageComponents/ProjectsPage/WorkPlace/Layers/Layers";
import { Main } from "@/components/pageComponents/ProjectsPage/WorkPlace/Main/Main";
import { SelectedMenu } from "@/components/pageComponents/ProjectsPage/WorkPlace/SelectedMenu/SelectedMenu";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export default function WorkPlace() {
  return (
    <ResizablePanelGroup direction={"horizontal"}>
      <ResizablePanel defaultSize={20} >
        <Layers />  
      </ResizablePanel>

      <ResizableHandle/>
      
      <ResizablePanel defaultSize={60}>
        <Main />
      </ResizablePanel>

      <ResizableHandle/>
      
      <ResizablePanel defaultSize={20}>
        <SelectedMenu />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}