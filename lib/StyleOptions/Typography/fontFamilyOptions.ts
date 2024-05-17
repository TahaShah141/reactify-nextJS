import { StyleType } from "@/lib/types"

export const fontFamilies: Record<string, string> = {
  "sans": 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  "serif": 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  "mono": 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
}

export const fontFamilyOptions: StyleType[] = (() => {
  const toReturn: StyleType[] = []
  for (const key of Object.keys(fontFamilies)) {
    toReturn.push({
      label: `${key}`,
      tailwind: `font-${key}`,
      CSSKey: 'fontFamily',
      CSSValue: fontFamilies[key]
    })
  }
  return toReturn
})()