import { StyleType } from "@/lib/types";
import { getAllRatioOptions, getAllSizingOptions, ratios, sizing } from "./getSpacingStyleType";


export const sizeOptions: StyleType[] =
[
  {
    label: 'Auto',
    tailwind: 'size-auto',
    CSSKey: ['width', 'height'],
    CSSValue: ['auto', 'auto'],
  },
  {
    label: 'Full',
    tailwind: 'size-full',
    CSSKey: ['width', 'height'],
    CSSValue: ['100%', '100%'],
  },
  {
    label: 'min',
    tailwind: 'size-min',
    CSSKey: ['width', 'height'],
    CSSValue: ['min-content', 'min-content'],
  },
  {
    label: 'max',
    tailwind: 'size-max',
    CSSKey: ['width', 'height'],
    CSSValue: ['max-content', 'max-content'],
  },
  {
    label: 'fit',
    tailwind: 'size-fit',
    CSSKey: ['width', 'height'],
    CSSValue: ['fit-content', 'fit-content'],
  },
  // {
  //   label: "Screen",
  //   tailwind: 'w-screen',
  //   CSSKey: 'width',
  //   CSSValue: '100vw',
  // },
  ...(Object.keys(sizing).map((size) => ({
    label: size,
    tailwind: `size-${size}`,
    CSSKey: ['width', 'height'],
    CSSValue: [sizing[size], sizing[size]],
  }))),
  ...(Object.keys(ratios).map((ratio) => ({
    label: ratio,
    tailwind: `size-${ratio}`,
    CSSKey: ['width', 'height'],
    CSSValue: [ratios[ratio], ratios[ratio]],
  })))
]