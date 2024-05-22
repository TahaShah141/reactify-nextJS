import { StyleType } from "@/lib/types"

export const textTransforms: Record<string, string> = {
  "uppercase": "uppercase",
  "lowercase": "lowercase",
  "capitalize": "capitalize",
  "normal-case": "none",
}

export const textTransformOptions: StyleType[] = (() => {
  const toReturn: StyleType[] = []

  for (const key of Object.keys(textTransforms)) {
    toReturn.push({
      label: `${key.split('-')[0]}`,
      tailwind: `${key}`,
      CSSKey: "textTransform",
      CSSValue: textTransforms[key]
    })
  }

  return toReturn
})()