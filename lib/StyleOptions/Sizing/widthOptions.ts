import { StyleType } from "@/lib/types";
import { getAllRatioOptions, getAllSizingOptions } from "./getSpacingStyleType";


export const widthOptions: StyleType[] =
[
  {
    label: 'Auto',
    tailwind: 'w-auto',
    CSSKey: 'width',
    CSSValue: 'auto',
  },
  {
    label: 'Full',
    tailwind: 'w-full',
    CSSKey: 'width',
    CSSValue: '100%',
  },
  {
    label: 'min',
    tailwind: 'w-min',
    CSSKey: 'width',
    CSSValue: 'min-content',
  },
  {
    label: 'max',
    tailwind: 'w-max',
    CSSKey: 'width',
    CSSValue: 'max-content',
  },
  {
    label: 'fit',
    tailwind: 'w-fit',
    CSSKey: 'width',
    CSSValue: 'fit-content',
  },
  // {
  //   label: "Screen",
  //   tailwind: 'w-screen',
  //   CSSKey: 'width',
  //   CSSValue: '100vw',
  // },
  ...getAllSizingOptions("w", "width"),
  ...getAllRatioOptions("w", "width"),
]