import { StyleType } from "@/lib/types"

const borderSizing: Record<string, string> = {
  "0": "0px",
  "2": "2px",
  "4": "4px",
  "8": "8px",
}

export const borderWidthOptions: StyleType[] = (() => {
  const toReturn: StyleType[] = [{
    label: 'border',
    tailwind: 'border',
    CSSKey: 'borderWidth',
    CSSValue: '1px'
  }]

  for (const key of Object.keys(borderSizing)) {
    toReturn.push({
      label: `border-${key}`,
      tailwind: `border-${key}`,
      CSSKey: 'borderWidth',
      CSSValue: borderSizing[key]
    })
  }
  return toReturn
})()

export const borderXWidthOptions: StyleType[] = (() => {
  const toReturn: StyleType[] = [{
    label: 'border-x',
    tailwind: 'border-x',
    CSSKey: 'borderWidth',
    CSSValue: '1px'
  }]

  for (const key of Object.keys(borderSizing)) {
    toReturn.push({
      label: `border-x-${key}`,
      tailwind: `border-x-${key}`,
      CSSKey: ['borderLeftWidth', 'borderRightWidth'],
      CSSValue: [borderSizing[key], borderSizing[key]]
    })
  }
  return toReturn
})()

export const borderYWidthOptions: StyleType[] = (() => {
  const toReturn: StyleType[] = [{
    label: 'border-y',
    tailwind: 'border-y',
    CSSKey: 'borderWidth',
    CSSValue: '1px'
  }]

  for (const key of Object.keys(borderSizing)) {
    toReturn.push({
      label: `border-y-${key}`,
      tailwind: `border-y-${key}`,
      CSSKey: ['borderTopWidth', 'borderBottomWidth'],
      CSSValue: [borderSizing[key], borderSizing[key]]
    })
  }
  return toReturn
})()

export const borderTWidthOptions: StyleType[] = (() => {
  const toReturn: StyleType[] = [{
    label: 'border-t',
    tailwind: 'border-t',
    CSSKey: 'borderTopWidth',
    CSSValue: '1px'
  }]

  for (const key of Object.keys(borderSizing)) {
    toReturn.push({
      label: `border-t-${key}`,
      tailwind: `border-t-${key}`,
      CSSKey: 'borderTopWidth',
      CSSValue: borderSizing[key]
    })
  }
  return toReturn
})()

export const borderBWidthOptions: StyleType[] = (() => {
  const toReturn: StyleType[] = [{
    label: 'border-b',
    tailwind: 'border-b',
    CSSKey: 'borderBottomWidth',
    CSSValue: '1px'
  }]

  for (const key of Object.keys(borderSizing)) {
    toReturn.push({
      label: `border-b-${key}`,
      tailwind: `border-b-${key}`,
      CSSKey: 'borderBottomWidth',
      CSSValue: borderSizing[key]
    })
  }
  return toReturn
})()

export const borderLWidthOptions: StyleType[] = (() => {
  const toReturn: StyleType[] = [{
    label: 'border-l',
    tailwind: 'border-l',
    CSSKey: 'borderLeftWidth',
    CSSValue: '1px'
  }]

  for (const key of Object.keys(borderSizing)) {
    toReturn.push({
      label: `border-l-${key}`,
      tailwind: `border-l-${key}`,
      CSSKey: 'borderLeftWidth',
      CSSValue: borderSizing[key]
    })
  }
  return toReturn
})()

export const borderRWidthOptions: StyleType[] = (() => {
  const toReturn: StyleType[] = [{
    label: 'border-r',
    tailwind: 'border-r',
    CSSKey: 'borderRightWidth',
    CSSValue: '1px'
  }]

  for (const key of Object.keys(borderSizing)) {
    toReturn.push({
      label: `border-r-${key}`,
      tailwind: `border-r-${key}`,
      CSSKey: 'borderRightWidth',
      CSSValue: borderSizing[key]
    })
  }
  return toReturn
})()