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
        label: "Display",
        tailwind: "flex",
        CSSKey: "display",
        CSSValue: "flex",
      },
      {
        label: "Flex Direction",
        tailwind: "flex-col",
        CSSKey: "flexDirection",
        CSSValue: "column",
      },
      {
        label: "Justify Content",
        tailwind: "justify-center",
        CSSKey: "justifyContent",
        CSSValue: "center",
      },
      {
        label: "Align Items",
        tailwind: "items-center",
        CSSKey: "alignItems",
        CSSValue: "center",
      },
      {
        label: "Gap",
        tailwind: "gap-2",
        CSSKey: "gap",
        CSSValue: "0.5rem",
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

