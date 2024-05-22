import { StyleType } from "@/lib/types"

export const flexWrapOptions: StyleType[] = [
  {
    label: 'Wrap',
    tailwind: 'flex-wrap',
    CSSKey: 'flexWrap',
    CSSValue: 'wrap',
  },
  {
    label: 'No Wrap',
    tailwind: 'flex-nowrap',
    CSSKey: 'flexWrap',
    CSSValue: 'nowrap',
  },
  {
    label: 'Wrap Reverse',
    tailwind: 'flex-wrap-reverse',
    CSSKey: 'flexWrap',
    CSSValue: 'wrap-reverse',
  },
]