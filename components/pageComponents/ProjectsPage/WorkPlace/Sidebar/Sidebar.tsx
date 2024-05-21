import { ScrollArea } from "@/components/ui/scroll-area"
import { Layers } from "./Layers/Layers"
import { AvatarIcon, ClipboardIcon, CodeIcon, CopyIcon, DashboardIcon, GearIcon, Pencil2Icon, StackIcon } from "@radix-ui/react-icons"
import { SideBarTabType } from "@/lib/types"
import { CodePreview } from "./CodePreview/CodePreview"
import { SaveMenu } from "./SaveMenu/SaveMenu"
import { Snippets } from "./Snippets/Snippets"
import Link from "next/link"
import { DebugView } from "./DebugView/DebugView"
import { Projects } from "./ProjectBar/Projects"
import { Icons } from "./Icons/Icons"

const LogoClassName = "size-8"

const sidebarTabs: SideBarTabType[] = [
  {
    name: "Projects",
    icon: <DashboardIcon className={LogoClassName} />,
    toRender: <Projects />
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
    name: "Icons",
    icon: <ClipboardIcon className={LogoClassName} />,
    toRender: <Icons />
  },
  {
    name: "Code",
    icon: <CodeIcon className={LogoClassName} />,
    toRender: <CodePreview />
  },
  {
    name: "Save",
    icon: <Pencil2Icon className={LogoClassName} />,
    toRender: <SaveMenu />
  },
  {
    name: "gap", icon: undefined, toRender: <div className="flex-1"></div>
  },
  {
    name: "Settings",
    icon: <GearIcon className={LogoClassName} />,
    toRender: <>Settings</>
  },
  {
    name: "Profile",
    icon: <AvatarIcon className={LogoClassName} />,
    toRender: <DebugView />
  },
]

export const Sidebar = ({ tab }: { tab: string }) => {

  return (
    <div className="w-full h-full flex">
      <div className="w-14 py-2 flex flex-col items-center justify-between h-full">
        <div className="flex flex-col items-center h-full">
          {sidebarTabs.map((t, i) => (
            t.name === "gap" ? t.toRender :
              <Link key={t.name}
                className={` size-14 relative hover:bg-secondary rounded-lg  flex justify-center group items-center ${tab === t.name ? "text-primary" : "text-muted-foreground"}`}
                href={{ query: { tab: t.name } }}>
                {t.icon}
                <span className="absolute min-w-max bg-background hidden group-hover:inline-block text-foreground px-3 py-1 text-sm rounded left-[110%] z-[100] border border-foreground font-semibold ">{t.name}</span>
              </Link>
          ))}
        </div>
      </div>
      <ScrollArea className='flex-1 p-2' style={{ height: 'calc(100vh - 60px)' }}>
        {(sidebarTabs.find(t => t.name === tab) ?? sidebarTabs[2]).toRender}
      </ScrollArea>
    </div>
  )
}
