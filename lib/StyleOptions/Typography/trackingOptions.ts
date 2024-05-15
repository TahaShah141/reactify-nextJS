import { StyleType } from "@/lib/componentType"

 export const trackings: Record<string, string> = {
  "tighter": "-0.5em",
  "tight": "-0.25em",
  "normal": "0em",
  "wide": "0.025em",
  "wider": "0.05em",
  "widest": "0.1em"
 }

 export const trackingOptions: StyleType[] = (() => {
   const toReturn: StyleType[] = []
   for (const key of Object.keys(trackings)) {
     toReturn.push({
       label: key,
       tailwind: `tracking-${key}`,
       CSSKey: 'letterSpacing',
       CSSValue: trackings[key]
     })
   }
   return toReturn
 })()