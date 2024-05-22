'use client';

import { useAppSelector } from "@/lib/redux/hooks"
import { selectProject } from "@/lib/redux/store"
import { findReactComponents, generateComponentCode } from "@/lib/utils"
// import { downloadZip } from "./codeUtils";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { useState } from "react";
import { downloadBlob } from "./codeUtils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { Input } from "@/components/ui/input";
import { dracula, rosePineDawn } from 'thememirror';
import { useTheme } from "next-themes";

export const CodePreview = () => {
  const [selected, setSelected] = useState("App");
  const { tabs } = useAppSelector(selectProject);
  const [zipName, setZipName] = useState("project");
  const {resolvedTheme :theme} = useTheme();
  // console.log({theme})
  const tabNames = Object.keys(tabs);
  const codes = tabNames.map(name => generateComponentCode(tabs[name].root, name));
  const index = tabNames.findIndex(name => name === selected);
  const code = codes[index];

  async function DownloadZip(projectName: string, filenames: string[], codes: string[]) {
    try {
      const shadComponents = Array.from(new Set(tabNames.map(name => findReactComponents(tabs[name].root)).flat()))
      const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/code`, { 
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          codes, filenames, shadComponents, projectName
        })
      })
      const blob = await res.blob();
      downloadBlob(projectName, blob);
    } catch (e) { console.error(e) }
    finally {
      console.log("Done")
    }
  }

  const isNameAvailable = zipName.length > 0 && !zipName.includes(" ");


  return (
    <div style={{
      height: `calc(100vh - 60px)`
    }} className=" flex p-2 gap-4 flex-col">
      <div className="flex gap-4">
        {tabNames.map((name) =>
          <Button variant={"outline"} key={name}
            onClick={() => setSelected(name)}
            className={`${selected === name ? "text-primary bg-foreground/5" : "text-muted-foreground"}`}>{name}.jsx</Button>
        )}
        <Popover>
          <PopoverTrigger asChild><Button>Download as Zip</Button></PopoverTrigger>
          <PopoverContent className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <h4 className="font-medium leading-none">Name Project</h4>
            <p className="text-sm text-muted-foreground">
              Choose a name for your project
            </p>
          </div>
          <form className="flex gap-2">
            <Input value={zipName} onChange={(e) => setZipName(e.target.value)} placeholder="Project Name" />
            <PopoverClose>  
              <Button disabled={!isNameAvailable} onClick={() => {setZipName("project"); DownloadZip(zipName, tabNames, codes)}} >Zip</Button>
            </PopoverClose>
          </form>
        </PopoverContent>
        </Popover>
      </div>
      <div className="  flex-1 flex items-stretch">

        <CodeMirror
          className={`text-lg w-full  overflow-auto`}
          value={code}
          theme={theme == 'light' ? rosePineDawn : vscodeDark}
          height="100%"
          extensions={[javascript({
            jsx: true,
            typescript: true,
          })]}
          readOnly
        />
      </div>
    </div>
  )
}
