import { ComponentType } from "@/lib/types"
import { BasicSection, ShadCnSection, TypographySection } from "./supplySections"

//hard coded place to get the components from
export const supplyComponent: ComponentType = {
  id: "SUPPLY",
  tag: "div",
  className: "",
  innerText:"",
  styleOptions: [],
  data: {
    rootID: "SUPPLY",
    tabID: "SUPPLY",
    path: [],
    selected: false,
    draggable: false,
    droppable: false,
    canHaveChildren: true
  },
  children: [
    BasicSection,
    TypographySection,
    ShadCnSection
  ],
}

//hard coded place to get the snippets from
export const snippetComponent: ComponentType = {
  id: "SNIPPETS",
  tag: "div",
  className: "",
  innerText:"",
  styleOptions: [],
  data: {
    rootID: "SNIPPETS",
    tabID: "SNIPPETS",
    path: [],
    selected: false,
    draggable: false,
    droppable: false,
    canHaveChildren: true
  },
  children: [],
}

//The default workplace for DnD
export const getRootComponent = (rootID: string): ComponentType => ({
  id: rootID,
    tag: "Card",
    innerText:"",
    className: "",
    styleOptions: [
      {
        label: "Aspect Ratio",
        tailwind: "aspect-video",
        CSSKey: 'aspectRatio',
        CSSValue: '16 / 9'
      },
      {
        label: "rounded",
        tailwind: "rounded-sm",
        CSSKey: 'borderRadius',
        CSSValue: '2px'
      },
      {
        label: "Padding",
        tailwind: "p-8",
        CSSKey: "padding",
        CSSValue: "2rem",
      },
      {
        label: "Height",
        tailwind: "h-full",
        CSSKey: "height",
        CSSValue: "100%",
      },
      {
        label: "Width",
        tailwind: "w-full",
        CSSKey: "width",
        CSSValue: "100%",
      },
    ],
    data: {
      rootID: rootID,
      tabID: rootID,
      path: [],
      selected: false,
      droppable: true,
      draggable: false,
      canHaveChildren: true
    },
  children: [],
})

