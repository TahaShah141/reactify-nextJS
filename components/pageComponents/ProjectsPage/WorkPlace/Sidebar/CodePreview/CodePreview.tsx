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

export const CodePreview = () => {
  const [selected, setSelected] = useState("App");
  const { tabs } = useAppSelector(selectProject);

  const tabNames = Object.keys(tabs);
  const codes = tabNames.map(name => generateComponentCode(tabs[name].root, name));
  const index = tabNames.findIndex(name => name === selected);
  const code = codes[index];
  const className = `px-4 min-w-48 w-48 h-9 flex items-center justify-center border rounded-sm hover:bg-foreground/10`
  
  async function DownloadZip(filenames: string[], codes: string[]) {
    const shadComponents = Array.from(new Set(tabNames.map(name => findReactComponents(tabs[name].root)).flat()))
    const res = await fetch('http://localhost:3000/api/code', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        codes, filenames, shadComponents
      })
    })
    const blob = await res.blob();
    console.log(blob)
    downloadBlob(blob);
  }


  return (
    <div style={{
      height: `calc(100vh - 60px)`
    }} className=" flex p-2 gap-4 flex-col">
      <div className="flex gap-4">
        {tabNames.map((name) =>
          <button
            onClick={() => setSelected(name)}
            className={`${className} ${selected === name ? "text-primary bg-foreground/5" : "text-muted-foreground"}`}>{name}.jsx</button>
        )}
        <button
          onClick={() => DownloadZip(tabNames, codes)}
          className={`${className} text-muted-foreground`}>Download as Zip</button>
      </div>
      <div className="  flex-1 flex items-stretch">

        <CodeMirror
          className={`text-lg w-full  overflow-auto`}
          value={code}
          theme={vscodeDark}
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
