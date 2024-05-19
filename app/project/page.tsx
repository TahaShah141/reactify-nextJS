'use client';

import { Main } from "@/components/pageComponents/ProjectsPage/WorkPlace/Main/Main";
import { SelectedMenu } from "@/components/pageComponents/ProjectsPage/WorkPlace/SelectedMenu/SelectedMenu";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Sidebar } from "@/components/pageComponents/ProjectsPage/WorkPlace/Sidebar/Sidebar";
import { useResize } from "@/lib/hooks/useResize";


export default function WorkPlace({ searchParams }: { searchParams: { tab: string } }) {
  const { tab } = searchParams;
  const {sidebarRef, mainRef, selectMenuRef} = useResize(tab);
  

  return (
    <ResizablePanelGroup direction={"horizontal"}>
      {/* @ts-ignore */}
      <ResizablePanel id="sidebar" order={1} defaultSize={20} ref={sidebarRef} >
        <Sidebar tab={tab} />
      </ResizablePanel>

      <ResizableHandle />

      {/* @ts-ignore */}
      <ResizablePanel id="main" order={2} defaultSize={60} ref={mainRef} collapsedSize={0}>
        <Main />
      </ResizablePanel>

      <ResizableHandle />

      {/* @ts-ignore */}
      <ResizablePanel id="selected-menu" order={3} defaultSize={20} ref={selectMenuRef} collapsedSize={0}>
        <SelectedMenu />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}