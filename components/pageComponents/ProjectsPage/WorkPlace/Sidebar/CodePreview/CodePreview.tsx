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

import JSzip from "jszip"
import { cardJSX, eslintrcCJS, gitignore, indexHTML, mainJSX, packageJSON, postcssConfigJS, tailwindConfigJS, viteConfigJS, viteSVG } from "./fileConstants";



export const CodePreview = () => {
  const [selected, setSelected] = useState("App");
  const { tabs } = useAppSelector(selectComponents);
  
  const tabNames = Object.keys(tabs);
  const codes = tabNames.map(name => generateComponentCode(tabs[name].root, name));
  const index = tabNames.findIndex(name => name === selected);
  const code = codes[index];


  function downlaodBlob(blob: Blob) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = "hello.zip";
    a.click();
    window.URL.revokeObjectURL(url);
  }

  function downloadZip() {
    const zip = new JSzip();
    const srcZip = zip.folder('src');
    if (!srcZip) throw new Error("Couldn't create 'src' folder");
    codes.forEach((code, i) => {
      srcZip.file(`${tabNames[i]}.jsx`, code);
    })
    zip.file('public/vite.svg', viteSVG);
    zip.file('src/index.css', "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n");
    zip.file('src/main.jsx', mainJSX);
    zip.file('src/card.jsx', cardJSX);
    zip.file('package.json', packageJSON);
    zip.file('index.html', indexHTML);
    zip.file('postcss.config.js', postcssConfigJS);
    zip.file('tailwind.config.js', tailwindConfigJS);
    zip.file('vite.config.js', viteConfigJS);
    zip.file('.gitignore', gitignore);
    zip.file('.eslintrc.cjs', eslintrcCJS);

    zip.generateAsync({ type: 'blob' }).then(blob => {
      downlaodBlob(blob);
      console.log(blob)
    })
  }

  const className = `px-4 min-w-48 w-48 h-9 flex items-center justify-center border rounded-sm hover:bg-foreground/10`


  return (
    <div style={{
      height: `calc(100vh - 60px)`
    }} className=" flex p-2 gap-4 flex-col">
      <div className="flex gap-4">
        {tabNames.map((name) =>
          <button
            onClick={() => setSelected(name)}
            className={`${className} ${selected === name ? "text-primary bg-foreground/5" : "text-muted-foreground"}`}  >{name}.jsx</button>
        )}
        <button
          onClick={downloadZip}
          className={`${className} text-muted-foreground`}  >Download as Zip</button>
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
