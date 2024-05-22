import { NextRequest, NextResponse } from "next/server";
import JSzip from "jszip";
import { text } from "stream/consumers";
import fs from "fs";
import { getIndexHTML, getPackageJSON } from "@/components/pageComponents/ProjectsPage/WorkPlace/Sidebar/CodePreview/fileConstants";
import { shadComponentsToInstallArg } from "@/components/pageComponents/ProjectsPage/WorkPlace/Sidebar/CodePreview/codeUtils";

export async function POST(request: NextRequest) {
  const { codes, filenames, shadComponents, projectName } = await request.json() as unknown as {
    codes: string[];
    filenames: string[];
    shadComponents: string[];
    projectName: string;
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/base-shad.zip`);
  const baseZip = await res.arrayBuffer();

  const zip = await JSzip.loadAsync(baseZip);
  const packageJSON = getPackageJSON(shadComponents, projectName);
  const indexHTML = getIndexHTML(projectName);
  zip.file(`project/package.json`, packageJSON);
  zip.file(`project/index.html`, indexHTML);
  codes.forEach((code, i) =>
    {
        if (filenames[i] == "App") {
            zip.file(`project/src/${filenames[i]}.jsx`, code)
        } else {
            zip.file(`project/src/components/${filenames[i]}.jsx`, code)
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
