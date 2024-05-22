import { ScrollArea } from "@/components/ui/scroll-area"
import { Layers } from "./Layers/Layers"
import { AvatarIcon, ClipboardIcon, CodeIcon, CopyIcon, DashboardIcon, GearIcon, Pencil2Icon, StackIcon } from "@radix-ui/react-icons"
import { SideBarTabType } from "@/lib/types"
import { CodePreview } from "./CodePreview/CodePreview"
import { SaveMenu } from "./SaveMenu/SaveMenu"
import { Snippets } from "./Snippets/Snippets"
import Link from "next/link"
import { Projects } from "./ProjectBar/Projects"
import { Icons } from "./Icons/Icons"
import { Settings } from "./Settings/Settings"
import { Profile } from "./Profile/Profile"

const LogoClassName = "size-8"

const sidebarTabs: Record<string, SideBarTabType> = {
  "projects": {
    name: "Projects",
    icon: <DashboardIcon className={LogoClassName} />,
    toRender: <Projects />
  },
  "snippets": {
    name: "Snippets",
    icon: <CopyIcon className={LogoClassName} />,
    toRender: <Snippets />
  },
  "layers": {
    name: "Layers",
    icon: <StackIcon className={LogoClassName} />,
    toRender: <Layers />
  },
  "icons": {
    name: "Icons",
    icon: <ClipboardIcon className={LogoClassName} />,
    toRender: <Icons />
  },
  "code": {
    name: "Code",
    icon: <CodeIcon className={LogoClassName} />,
    toRender: <CodePreview />
  },
  "save": {
    name: "Save",
    icon: <Pencil2Icon className={LogoClassName} />,
    toRender: <SaveMenu />
  },
  "Gap": {
    name: "Gap",
    icon: <></>,
    toRender: <div className="flex-1"></div>
  },
  "settings": {
    name: "settings",
    icon: <GearIcon className={LogoClassName} />,
    toRender: <Settings />
  },
  "profile": {
    name: "Profile",
    icon: <AvatarIcon className={LogoClassName} />,
    toRender: <Profile />
  },
}

export const Sidebar = ({ tab }: { tab: string }) => {

  return (
    <div className="w-full h-full flex">
      <div className="w-14 py-2 flex flex-col items-center justify-between h-full">
        <div className="flex flex-col items-center h-full">
          {Object.keys(sidebarTabs).map(t =>
            t === "Gap" ? <>{sidebarTabs[t].toRender}</> : 
            <Link key={t} className={` size-14 relative hover:bg-secondary rounded-lg  flex justify-center group items-center ${tab === t ? "text-primary" : "text-muted-foreground"}`} 
              href={{ query: { tab: t } }}>
              {sidebarTabs[t].icon}
              <span className="absolute min-w-max bg-background hidden group-hover:inline-block text-foreground px-3 py-1 text-sm rounded left-[110%] z-[100] border border-foreground font-semibold ">{sidebarTabs[t].name}</span>
            </Link>
          )}
        </div>
      </div>
      <ScrollArea className='flex-1 p-2' style={{ height: 'calc(100vh - 60px)' }}>
        {sidebarTabs[tab]?.toRender || <>Error</>}
      </ScrollArea>
    </div>
  )
}
