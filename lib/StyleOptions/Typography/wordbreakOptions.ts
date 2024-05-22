import { StyleType } from "@/lib/types"

export const wordBreakOptions: StyleType[] = [
  {
    label: 'Normal',
    tailwind: 'break-normal',
    CSSKey: ['overflowWrap', 'wordBreak'],
    CSSValue: ['normal', 'normal']
  },
  {
    label: "Words",
    tailwind: "break-words",
    CSSKey: "overflowWrap",
    CSSValue: "break-words"
  },
  {
    label: "All",
    tailwind: "break-all",
    CSSKey: "wordBreak",
    CSSValue: "break-all"
  },
  {
    label: "Keep",
    tailwind: "break-keep",
    CSSKey: "wordBreak",
    CSSValue: "keep-all"
  },
]