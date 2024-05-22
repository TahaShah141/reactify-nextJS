import { StyleType } from "@/lib/types"

export const textAligns: Record<string, string> = {
  "left": "left",
  "center": "center",
  "right": "right",
  "justify": "justify",
  "start": "start",
  "end": "end",
}

export const textAlignOptions: StyleType[] = (() => {
  const toReturn: StyleType[] = []

  for (const key of Object.keys(textAligns)) {
    toReturn.push({
      label: `${key}`,
      tailwind: `text-${key}`,
      CSSKey: "textAlign",
      CSSValue: textAligns[key]
    })
  }

  return toReturn
})()