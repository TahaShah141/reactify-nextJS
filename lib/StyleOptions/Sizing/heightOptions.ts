import { StyleType } from "@/lib/types";
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
  {
    label: 'min',
    tailwind: 'h-min',
    CSSKey: 'height',
    CSSValue: 'min-content',
  },
  {
    label: 'max',
    tailwind: 'h-max',
    CSSKey: 'height',
    CSSValue: 'max-content',
  },
  {
    label: 'fit',
    tailwind: 'h-fit',
    CSSKey: 'height',
    CSSValue: 'fit-content',
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