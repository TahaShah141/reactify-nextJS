import { StyleType } from "@/lib/types"


export const aspectRatios: Record<string, string> = {
  "auto": "auto",
  "square": "1 / 1",
  "video": "16 / 9",
}

export const aspectRatioOptions: StyleType[] = Object.keys(aspectRatios).map((key) => ({
  label: key,
  tailwind: `aspect-${key}`,
  CSSKey: 'aspectRatio',
  CSSValue: aspectRatios[key]
}))
