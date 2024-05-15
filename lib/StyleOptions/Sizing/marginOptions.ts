import { StyleType } from "@/lib/componentType";
import { getAllSizingOptions, sizing } from "./getSpacingStyleType";

export const marginOptions: StyleType[] = getAllSizingOptions("m", "margin")

export const marginXOptions: StyleType[] = (() => {
  const toReturn: StyleType[] = []
  for (const key of Object.keys(sizing)) {
    toReturn.push({
      label: `mx-${key}`,
      tailwind: `mx-${key}`,
      CSSKey: ['marginLeft', 'marginRight'],
      CSSValue: [sizing[key], sizing[key]]
    })
  }
  return toReturn
})()

export const marginYOptions: StyleType[] = (() => {
  const toReturn: StyleType[] = []
  for (const key of Object.keys(sizing)) {
    toReturn.push({
      label: `my-${key}`,
      tailwind: `my-${key}`,
      CSSKey: ['marginTop', 'marginBottom'],
      CSSValue: [sizing[key], sizing[key]]
    })
  }
  return toReturn
})()

export const marginTOptions: StyleType[] = getAllSizingOptions("mt", "marginTop")

export const marginROptions: StyleType[] = getAllSizingOptions("mr", "marginRight")

export const marginBOptions: StyleType[] = getAllSizingOptions("mb", "marginBottom")

export const marginLOptions: StyleType[] = getAllSizingOptions("ml", "marginLeft")