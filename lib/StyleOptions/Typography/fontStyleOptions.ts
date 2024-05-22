import { StyleType } from "@/lib/types"

export const fontStyleOptions: StyleType[] = [
  {
    label: 'Normal',
    tailwind: 'not-italic',
    CSSKey: "fontStyle",
    CSSValue: 'normal',
  },
  {
    label: 'Italic',
    tailwind: 'italic',
    CSSKey: "fontStyle",
    CSSValue: 'italic',
  },
]