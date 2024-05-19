"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Layers } from "./Layers/Layers"
import { AvatarIcon, CodeIcon, CopyIcon, DashboardIcon, GearIcon, Pencil2Icon, StackIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { SideBarTabType } from "@/lib/types"
import { useState } from "react"
import { CodePreview } from "./CodePreview/CodePreview"
import { SaveMenu } from "./SaveMenu/SaveMenu"
import { Snippets } from "./Snippets/Snippets"

const LogoClassName = "size-8"

const sidebarTabs: SideBarTabType[] = [
  {
    name: "Projects",
    icon: <DashboardIcon className={LogoClassName} />,
    toRender: <>Projects</>
  },
  {
    name: "Snippets",
    icon: <CopyIcon className={LogoClassName} />,
    toRender: <Snippets />
  },
  {
    name: "Layers",
    icon: <StackIcon className={LogoClassName} />,
    toRender: <Layers />
  },
  {
    name: "Code Preview",
    icon: <CodeIcon className={LogoClassName} />,
    toRender: <CodePreview />
  },
  {
    name: "Save",
    icon: <Pencil2Icon className={LogoClassName} />,
    toRender: <SaveMenu />
  },
  
  
  {
    name: "Settings",
    icon: <GearIcon className={LogoClassName} />,
    toRender: <>Settings</>
  },
  {
    name: "Profile",
    icon: <AvatarIcon className={LogoClassName} />,
    toRender: <>Profile</>
  },
]

export const Sidebar = () => {

  const [currSidebarTab, setCurrSidebarTab] = useState(1)

  return (
    <div className="w-full h-full flex">
      <div className="w-14 py-2 flex flex-col items-center justify-between h-full">
        <div className="flex flex-col items-center">
          {sidebarTabs.slice(0, 5).map((tab, i) => (
            <Button onClick={() => setCurrSidebarTab(i)} variant={"ghost"} size={"icon"} 
            className={`size-14 relative flex justify-center group items-center ${currSidebarTab === i ? "text-primary" : "text-muted-foreground"}`}>
              {tab.icon}
              <span className="absolute bg-[#262626] opacity-0  group-hover:opacity-100 transition-opacity text-white px-3 py-1 text-sm rounded-md left-[110%] z-[100] border-2 border-white font-semibold ">{tab.name}</span>
            </Button>
          ))}
        </div>
        <div className="flex flex-col items-center">
          {sidebarTabs.slice(-2).map((tab, i) => (
            <Button onClick={() => setCurrSidebarTab(i+5)} variant={"ghost"} size={"icon"} 
            className={`size-14 flex justify-center items-center ${currSidebarTab === (i + 5) ? "text-primary" : "text-muted-foreground"}`}>
              {tab.icon}
            </Button>
          ))}
        </div>
      </div>
      <ScrollArea className='flex-1 p-2' style={{ height: 'calc(100vh - 60px)' }}>
        {sidebarTabs[currSidebarTab].toRender}
      </ScrollArea>
    </div>
  )
}
