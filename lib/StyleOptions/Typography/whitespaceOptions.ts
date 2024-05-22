import { StyleType } from "@/lib/types"

export const whiteSpaces: Record<string, string> = {
  "normal": "normal",
  "nowrap": "nowrap",
  "pre": "pre",
  "pre-line": "pre-line",
  "pre-wrap": "pre-wrap",
  "break-spaces": "break-spaces"
}

export const whiteSpaceOptions: StyleType[] = (() => {
  const toReturn: StyleType[] = []

  for (const key of Object.keys(whiteSpaces)) {
    toReturn.push({
      label: `${key}`,
      tailwind: `whitespace-${key}`,
      CSSKey: "whiteSpace",
      CSSValue: whiteSpaces[key]
    })
  }

  return toReturn
})()