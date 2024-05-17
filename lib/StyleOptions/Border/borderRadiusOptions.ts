import { StyleType } from "@/lib/types"

const borderRadiusOptionsList: Record<string, string> = {
  "none": "0px",
  "sm": "2px",
  "md": "6px",
  "lg": "8px",
  "xl": "12px",
  "2xl": "16px",
  "3xl": "24px",
  "full": "9999px",
}

export const borderRadiusOptions: StyleType[] = (() => {
  const toReturn: StyleType[] = [{
    label: "rounded",
    tailwind: "rounded",
    CSSKey: 'borderRadius',
    CSSValue: '4px'
  }]

  for (const key of Object.keys(borderRadiusOptionsList)) {
    toReturn.push({
      label: `rounded-${key}`,
      tailwind: `rounded-${key}`,
      CSSKey: 'borderRadius',
      CSSValue: borderRadiusOptionsList[key]
    })
  }
  return toReturn
})()
