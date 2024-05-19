// "use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Layers } from "./Layers/Layers"
import { AvatarIcon, CodeIcon, CopyIcon, DashboardIcon, GearIcon, Pencil2Icon, StackIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { SideBarTabType } from "@/lib/types"
// import { useState } from "react"
import { CodePreview } from "./CodePreview/CodePreview"
import { SaveMenu } from "./SaveMenu/SaveMenu"
<<<<<<< HEAD
import { Snippets } from "./Snippets/Snippets"
=======
// import { Query } from "mongoose"
import Link from "next/link"
>>>>>>> fixing-tabs

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

<<<<<<< HEAD
export const Sidebar = () => {

  const [currSidebarTab, setCurrSidebarTab] = useState(1)
=======
export const Sidebar = ({ tab }: { tab: string }) => {
>>>>>>> fixing-tabs

  return (
    <div className="w-full h-full flex">
      <div className="w-14 py-2 flex flex-col items-center justify-between h-full">
        <div className="flex flex-col items-center">
          {sidebarTabs.slice(0, 5).map((t, i) => (
            <Link
              className={` size-14 relative hover:bg-secondary rounded-lg  flex justify-center group items-center ${tab === t.name ? "text-primary" : "text-muted-foreground"}`}
              href={{ query: { tab: t.name } }}>
              {t.icon}
              <span className="absolute min-w-max bg-[#262626] opacity-0  group-hover:opacity-100 transition-opacity text-white px-3 py-1 text-sm rounded-md left-[110%] z-[100] border-2 border-white font-semibold ">{t.name}</span>
            </Link>
          ))}
        </div>
        {/* <div className="flex flex-col items-center">
          {sidebarTabs.slice(-2).map((tab, i) => (
            <Button onClick={() => setCurrSidebarTab(i + 5)} variant={"ghost"} size={"icon"}
              className={`size-14 flex justify-center items-center ${currSidebarTab === (i + 5) ? "text-primary" : "text-muted-foreground"}`}>
              {tab.icon}
            </Button>
          ))}
        </div> */}
      </div>
      <ScrollArea className='flex-1 p-2' style={{ height: 'calc(100vh - 60px)' }}>
        {(sidebarTabs.find(t => t.name === tab) ?? sidebarTabs[3]).toRender}
      </ScrollArea>
    </div>
  )
}
