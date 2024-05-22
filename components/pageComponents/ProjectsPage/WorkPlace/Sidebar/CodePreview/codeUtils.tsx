
import JSzip from "jszip"
import { cardJSX, eslintrcCJS, gitignore, getIndexHTML, mainJSX, packageJSON, postcssConfigJS, tailwindConfigJS, viteConfigJS, viteSVG } from "./fileConstants";

export function downloadBlob(projectName: string, blob: Blob) {
  var a = document.createElement("a");
  document.body.appendChild(a);
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = projectName+".zip";
  a.target = '_blank';
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
}

export function shadComponentsToInstallArg(shadComponents: string[]) {
  const map: Record<string, string> = {
    "Card": 'card',
    "Input": 'input',
    "Label": 'label',
    "Button": 'button',
    "Separator": 'separator'
  }
  return shadComponents.reduce((arg, component) => arg + ' ' + map[component], '');
}

export function shadComponentsFileName(shadComponent: string) {
  const map: Record<string, string> = {
    "Card": 'card',
    "Input": 'input',
    "Label": 'label',
    "Button": 'button',
    "Separator": 'separator'
  }
  return map[shadComponent];
}

// Deprecated
// export function downloadZip(tabNames: string[], codes: string[]) {
//   const zip = new JSzip();
//   const srcZip = zip.folder('src');
//   if (!srcZip) throw new Error("Couldn't create 'src' folder");
//   codes.forEach((code, i) => {
//     srcZip.file(`${tabNames[i]}.jsx`, code);
//   })
//   zip.file('public/vite.svg', viteSVG);
//   zip.file('src/index.css', "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n");
//   zip.file('src/main.jsx', mainJSX);
//   zip.file('src/card.jsx', cardJSX);
//   zip.file('package.json', packageJSON);
//   zip.file('index.html', indexHTML);
//   zip.file('postcss.config.js', postcssConfigJS);
//   zip.file('tailwind.config.js', tailwindConfigJS);
//   zip.file('vite.config.js', viteConfigJS);
//   zip.file('.gitignore', gitignore);
//   zip.file('.eslintrc.cjs', eslintrcCJS);

//   zip.generateAsync({ type: 'blob' }).then(blob => {
//     downloadBlob(, blob);
//   })
// }

