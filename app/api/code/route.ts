import { NextRequest, NextResponse } from "next/server";
import JSzip from "jszip";
import { text } from "stream/consumers";
import fs from "fs";

function readPromise(filepath: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, (error, data) => {
      if (error) reject(error);
      resolve(data);
    });
  });
}

export async function POST(request: NextRequest) {
  const { codes, filenames } = await request.json() as unknown as {
    codes: string[];
    filenames: string[];
  };
  console.log({codes, filenames})
  const res = await fetch("http://localhost:3000/base.zip");
  const baseZip = await res.arrayBuffer();
  // const baseZip = await readPromise('./base.zip') as File;
  console.log({ baseZip });
  const zip = await JSzip.loadAsync(baseZip);
  codes.forEach((code, i) =>
    {
        if (filenames[i] == "App") {
            zip.file(`base/src/${filenames[i]}.jsx`, code)
        } else {
            zip.file(`base/src/components/${filenames[i]}.jsx`, code)
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
