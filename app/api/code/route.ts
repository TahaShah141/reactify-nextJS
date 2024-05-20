import { NextRequest, NextResponse } from "next/server";
import JSzip from "jszip";
import { text } from "stream/consumers";
import fs from "fs";
import { getPackageJSON } from "@/components/pageComponents/ProjectsPage/WorkPlace/Sidebar/CodePreview/fileConstants";
import { shadComponentsToInstallArg } from "@/components/pageComponents/ProjectsPage/WorkPlace/Sidebar/CodePreview/codeUtils";

export async function POST(request: NextRequest) {
  const { codes, filenames, shadComponents } = await request.json() as unknown as {
    codes: string[];
    filenames: string[];
    shadComponents: string[];
  };
  console.log({codes, filenames, shadComponents})
  const res = await fetch("http://localhost:3000/base-shad.zip");
  const baseZip = await res.arrayBuffer();
  console.log({ baseZip });
  const zip = await JSzip.loadAsync(baseZip);
  const packageJSON = getPackageJSON(shadComponents);
  zip.file(`base-shad-react/package.json`, packageJSON)
  codes.forEach((code, i) =>
    {
        if (filenames[i] == "App") {
            zip.file(`base-shad-react/src/${filenames[i]}.jsx`, code)
        } else {
            zip.file(`base-shad-react/src/components/${filenames[i]}.jsx`, code)
        }
    }
  );
  const file = await zip.generateAsync({
    type: "blob",
  });
  return new Response(file, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
    },
  });
}

// export async function POST(request: NextRequest) {
//   const { codes, filenames } = await request.json() as unknown as {
//     codes: string[];
//     filenames: string[];
//   };
//   console.log({codes, filenames})
//   const res = await fetch("http://localhost:3000/base.zip");
//   const baseZip = await res.arrayBuffer();
//   // const baseZip = await readPromise('./base.zip') as File;
//   console.log({ baseZip });
//   const zip = await JSzip.loadAsync(baseZip);
//   codes.forEach((code, i) =>
//     {
//         if (filenames[i] == "App") {
//             zip.file(`base/src/${filenames[i]}.jsx`, code)
//         } else {
//             zip.file(`base/src/components/${filenames[i]}.jsx`, code)
//         }
//     }
//   );
//   const file = await zip.generateAsync({
//     type: "blob",
//   });
//   return new Response(file, {
//     status: 200,
//     headers: {
//       "Content-Type": "application/zip",
//     },
//   });
// }
