import { StyleType } from "@/lib/componentType";
import { getAllRatioOptions, getAllSizingOptions } from "./getSpacingStyleType";


export const heightOptions: StyleType[] =
[
  {
    label: 'Auto',
    tailwind: 'h-auto',
    CSSKey: 'height',
    CSSValue: 'auto',
  },
  {
    label: 'Full',
    tailwind: 'h-full',
    CSSKey: 'height',
    CSSValue: '100%',
  },
  // {
  //   label: "Screen",
  //   tailwind: 'h-screen',
  //   CSSKey: 'height',
  //   CSSValue: '100vw',
  // },
  ...getAllSizingOptions("h", "height"),
  ...getAllRatioOptions("h", "height"),
]