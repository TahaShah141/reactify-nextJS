import { StyleType } from "@/lib/componentType";
import { getAllSizingOptions, sizing } from "./getSpacingStyleType";

export const paddingOptions: StyleType[] = getAllSizingOptions("p", "padding")

export const paddingXOptions: StyleType[] = (() => {
  const toReturn: StyleType[] = []
  for (const key of Object.keys(sizing)) {
    toReturn.push({
      label: `px-${key}`,
      tailwind: `px-${key}`,
      CSSKey: ['paddingLeft', 'paddingRight'],
      CSSValue: [sizing[key], sizing[key]]
    })
  }
  return toReturn
})()

export const paddingYOptions: StyleType[] = (() => {
  const toReturn: StyleType[] = []
  for (const key of Object.keys(sizing)) {
    toReturn.push({
      label: `py-${key}`,
      tailwind: `py-${key}`,
      CSSKey: ['paddingTop', 'paddingBottom'],
      CSSValue: [sizing[key], sizing[key]]
    })
  }
  return toReturn
})()

export const paddingTOptions: StyleType[] = getAllSizingOptions("pt", "paddingTop")

export const paddingROptions: StyleType[] = getAllSizingOptions("pr", "paddingRight")

export const paddingBOptions: StyleType[] = getAllSizingOptions("pb", "paddingBottom")

export const paddingLOptions: StyleType[] = getAllSizingOptions("pl", "paddingLeft")