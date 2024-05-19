import { Layers } from "@/components/pageComponents/ProjectsPage/WorkPlace/Sidebar/Layers/Layers";
import { Main } from "@/components/pageComponents/ProjectsPage/WorkPlace/Main/Main";
import { SelectedMenu } from "@/components/pageComponents/ProjectsPage/WorkPlace/SelectedMenu/SelectedMenu";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Sidebar } from "@/components/pageComponents/ProjectsPage/WorkPlace/Sidebar/Sidebar";

export default function WorkPlace({ searchParams }: { searchParams: { tab: string } }) {
  const { tab } = searchParams;
  console.log({ tab })

  const fullWidthTabs = ["Code Preview", "Settings"];

  // if (fullWidthTabs.includes(tab)) {
  //   console.log("full width")
  //   return (
  //     <ResizablePanelGroup direction={"horizontal"}>
  //       <ResizablePanel id="sidebar" order={1}  defaultSize={100} >
  //         {/* <Layers />   */}
  //         <Sidebar />
  //       </ResizablePanel>
  //     </ResizablePanelGroup>
  //   );
  // }

  return (
    <ResizablePanelGroup direction={"horizontal"}>
      <ResizablePanel id="sidebar" order={1} defaultSize={20} >
        {/* <Layers />   */}
        <Sidebar tab={tab} />
      </ResizablePanel>

      <ResizableHandle />

      <ResizablePanel id="main" order={2} defaultSize={60}>
        <Main />
      </ResizablePanel>

      <ResizableHandle />

      <ResizablePanel id="selected-menu" order={3} defaultSize={20}>
        <SelectedMenu />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}