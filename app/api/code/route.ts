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

  const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/base-shad.zip`);
  const baseZip = await res.arrayBuffer();

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
