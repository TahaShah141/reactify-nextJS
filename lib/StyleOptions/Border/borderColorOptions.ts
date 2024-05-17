import { StyleType } from "@/lib/types";
import { HexColors, colors, getAllColorStyleTypes, shades } from "../Colors/getColorStyleType";


export const borderColorOptions: StyleType[] = getAllColorStyleTypes("border", "borderColor")

export const borderXColorOptions: StyleType[] = (() => {
  const toReturn: StyleType[] = []

  for (const shade of shades) {
    for (const color of colors) {
      toReturn.push({
        label: `border-x-${color}-${shade}`,
        tailwind: `border-x-${color}-${shade}`,
        CSSKey: ['borderLeftColor', 'borderRightColor'],
        CSSValue: [HexColors[color][shade], HexColors[color][shade]]
      })
    }
  }

  return toReturn
})()

export const borderYColorOptions: StyleType[] = (() => {
  const toReturn: StyleType[] = []

  for (const shade of shades) {
    for (const color of colors) {
      toReturn.push({
        label: `border-y-${color}-${shade}`,
        tailwind: `border-y-${color}-${shade}`,
        CSSKey: ['borderTopColor', 'borderBottomColor'],
        CSSValue: [HexColors[color][shade], HexColors[color][shade]]
      })
    }
  }

  return toReturn
})()

export const borderTColorOptions: StyleType[] = (() => {
  const toReturn: StyleType[] = []

  for (const shade of shades) {
    for (const color of colors) {
      toReturn.push({
        label: `border-t-${color}-${shade}`,
        tailwind: `border-t-${color}-${shade}`,
        CSSKey: 'borderTopColor',
        CSSValue: HexColors[color][shade]
      })
    }
  }

  return toReturn
})()

export const borderRColorOptions: StyleType[] = (() => {
  const toReturn: StyleType[] = []

  for (const shade of shades) {
    for (const color of colors) {
      toReturn.push({
        label: `border-r-${color}-${shade}`,
        tailwind: `border-r-${color}-${shade}`,
        CSSKey: 'borderRightColor',
        CSSValue: HexColors[color][shade]
      })
    }
  }

  return toReturn
})()

export const borderBColorOptions: StyleType[] = (() => {
  const toReturn: StyleType[] = []

  for (const shade of shades) {
    for (const color of colors) {
      toReturn.push({
        label: `border-b-${color}-${shade}`,
        tailwind: `border-b-${color}-${shade}`,
        CSSKey: 'borderBottomColor',
        CSSValue: HexColors[color][shade]
      })
    }
  }

  return toReturn
})()

export const borderLColorOptions: StyleType[] = (() => {
  const toReturn: StyleType[] = []

  for (const shade of shades) {
    for (const color of colors) {
      toReturn.push({
        label: `border-l-${color}-${shade}`,
        tailwind: `border-l-${color}-${shade}`,
        CSSKey: 'borderLeftColor',
        CSSValue: HexColors[color][shade]
      })
    }
  }

  return toReturn
})()