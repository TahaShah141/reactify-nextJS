'use client';

import { getParentChild } from "@/lib/componentType"
import { useAppSelector } from "@/lib/redux/hooks"
import { selectComponents } from "@/lib/redux/store"
import { generateCode, generateComponentCode } from "@/lib/utils"

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";


export const CodePreview = () => {
  const [selected, setSelected] = useState("App");
  const { tabs } = useAppSelector(selectComponents);

  const code = generateComponentCode(tabs[selected].root, selected)
  const tabNames = Object.keys(tabs);
  const className = `px-4 min-w-48 w-48 h-9 flex items-center justify-center border rounded-sm hover:bg-foreground/10`
  // const className = `px-4 min-w-48 w-48 h-9 flex items-center justify-center border rounded-sm hover:bg-foreground/10 ${sele === id ? "text-primary bg-foreground/5" : "text-muted-foreground"}`


  return (
    // <>Code Preview</>
    <div style={{
      height: `calc(100vh - 60px)`
    }} className=" flex p-2 gap-4 flex-col">
      <div className="flex gap-4">
        {tabNames.map((name) =>
          <button 
          onClick={() => setSelected(name)}
          className={`${className} ${selected === name ? "text-primary bg-foreground/5" : "text-muted-foreground"}`}  >{name}.jsx</button>
        )}
      </div>
      <div className="  flex-1 flex items-stretch">

        <CodeMirror
          className={`text-lg w-full  overflow-auto`}
          value={code}
          theme={vscodeDark}
          // onChange={(code) =>
          //   // dispatch(updateCode({ code, problemId: problem._id }))
          // }
          height="100%"
          extensions={[javascript({
            jsx: true,
            typescript: true,
          })]}
        />
      </div>
    </div>
    // <p className="">{code}</p>
  )
}
