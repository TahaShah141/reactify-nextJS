import { StyleType } from "@/lib/types"

export const fontWeights: Record<string, string> = {
  "thin": "100",
  "extralight": "200",
  "light": "300",
  "normal": "400",
  "medium": "500",
  "semibold": "600",
  "bold": "700",
  "extrabold": "800",
  "black": "900"
}


export const fontWeightOptions: StyleType[] = (() => {
  const toReturn: StyleType[] = []

  for (const key of Object.keys(fontWeights)) {
    toReturn.push({
      label: `font-${key}`,
      tailwind: `font-${key}`,
      CSSKey: 'fontWeight',
      CSSValue: fontWeights[key]
    })
  }

  return toReturn
})()