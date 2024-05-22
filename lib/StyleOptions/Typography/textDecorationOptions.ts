import { StyleType } from "@/lib/types"

export const textDecorations: Record<string, string> = {
  "underline": "underline",
  "overline": "overline",
  "line-through": "line-through",
  "no-underline": "none",
  
}

export const textDecorationOptions: StyleType[] = (() => {
  const toReturn: StyleType[] = []

  for (const key of Object.keys(textDecorations)) {
    toReturn.push({
      label: `${key}`,
      tailwind: `${key}`,
      CSSKey: "textDecorationLine",
      CSSValue: textDecorations[key]
    })
  }

  return toReturn
})()