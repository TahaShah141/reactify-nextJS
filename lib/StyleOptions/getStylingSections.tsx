import { alignItemsOptions } from "@/lib/StyleOptions/Layout/alignItemsOptions"
import { alignSelfOptions } from "@/lib/StyleOptions/Layout/alignSelfOptions"
import { displayOptions } from "@/lib/StyleOptions/Layout/displayOptions"
import { flexDirectionOptions } from "@/lib/StyleOptions/Layout/flexDirectionOptions"
import { justifyContentOptions } from "@/lib/StyleOptions/Layout/justifyContentOptions"
import { heightOptions } from "@/lib/StyleOptions/Sizing/heightOptions"
import { widthOptions } from "@/lib/StyleOptions/Sizing/widthOptions"
import { gapOptions } from "@/lib/StyleOptions/Sizing/gapOptions"
import { StyleRadio } from "@/components/custom/StyleRadio"
import { StyleRange } from "@/components/custom/StyleRange"
import { TailwindGridSize } from "@/components/custom/TailwindGridSize"
import { TailwindColorPicker } from "@/components/custom/TailwindColorPicker"
import { TailwindPadding } from "@/components/custom/TailwindPadding"
import { TailwindBorderWidth } from "@/components/custom/TailwindBorder"
import { getAllColorStyleTypes } from "./Colors/getColorStyleType"
import { borderRadiusOptions } from "./Border/borderRadiusOptions"
import { AddCustomClass } from "@/components/pageComponents/ProjectsPage/WorkPlace/SelectedMenu/AddCustomClass"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { fontSizeOptions } from "./Typography/fontSizeOptions"
import { fontWeightOptions } from "./Typography/fontWeightOptions"
import { fontFamilyOptions } from "./Typography/fontFamilyOptions"
import { TailwindMargin } from "@/components/custom/TailwindMargin"
import { trackingOptions } from "./Typography/trackingOptions"
import { TailwindFlexRatio } from "@/components/custom/TailwindFlexRatio"
import { aspectRatioOptions } from "./Sizing/aspectRatioOptions"
import { getSingularValue } from "../utils"
import { ComponentType, Section } from "@/lib/types"
import { AttributeMenu } from "@/components/pageComponents/ProjectsPage/WorkPlace/SelectedMenu/AttributeMenu"

export const getStylingSections = (component: ComponentType, customClasses: React.ReactNode[]): Section[] => {

  const displayType = getSingularValue(component.styleOptions.find(style => style.CSSKey === "display")?.CSSValue) || "none" 

  return (
    [
      {
        title: "Custom",
        showCards: false,
        items: [
          (customClasses.length !== 0 ? {node: 
          <Card className="flex flex-col gap-2 p-4 rounded-sm">
            <Label className="text-sm">Choose Class</Label>
            {...customClasses}
          </Card> }: undefined),
          {node: <AddCustomClass />},
        ]
      },
      { 
        title: 'Colors',
        showCards: true,
        items: [
          {tags: ["background", "color"], CSSKeys: ["backgroundColor"], node: <TailwindColorPicker label="Background Color" options={getAllColorStyleTypes("bg", "backgroundColor")} />},
          {tags: ["text", "color"], CSSKeys: ["color"], node: <TailwindColorPicker label="Text Color" options={getAllColorStyleTypes("text", "color")} />},
        ] 
      },
      {
        title: 'Layout',
        showCards: true,
        items: [
          {tags: ["display", "layout", "flex", "grid"], CSSKeys: ["display"], node: <StyleRadio rows={1} cols={2} label='Display' options={displayOptions} />},
          (displayType === "flex" ? {tags: ["flex", "direction"], CSSKeys: ["flexDirection"], node: <StyleRadio rows={2} cols={2} label='Flex Direction' options={flexDirectionOptions} />} : undefined),
          {tags: ["flex", "ratio"], CSSKeys: ["flex"], node: <TailwindFlexRatio />},
          (displayType === "grid" ? {tags: ["grid", "size"], CSSKeys: [["gridTemplateRows", "gridTemplateColumns"], 'gridSize'], node: <TailwindGridSize />} : undefined),
          {tags: ["gap", "spacing"], CSSKeys: ["gap"], node: <StyleRange label="Gap" options={gapOptions} />},
          {tags: ["justify", "content"], CSSKeys: ["justifyContent"], node: <StyleRadio rows={2} cols={3} label='Justify Content' options={justifyContentOptions} />},
          {tags: ["align", "items"], CSSKeys: ["alignItems"], node: <StyleRadio rows={1} cols={3} label='Align Items' options={alignItemsOptions} />},
          {tags: ["align", "self"], CSSKeys: ["alignSelf"], node: <StyleRadio rows={1} cols={3} label='Align Self' options={alignSelfOptions} />},
        ]
      },
      {
        title: "Sizing",
        showCards: true,
        items: [
          {tags: ["width", "size"], CSSKeys: ["width"], node: <StyleRange label='Width' options={widthOptions} />},
          {tags: ["height", "size"], CSSKeys: ["height"], node: <StyleRange label='Height' options={heightOptions} />},
          {tags: ["padding", "spacing"], CSSKeys: ["padding", "paddingLeft", "paddingRight", "paddingTop", "paddingBottom", ["paddingLeft", "paddingRight"], ["paddingTop", "paddingBottom"]], 
          node: <TailwindPadding />},
          {tags: ["margin", "spacing"], CSSKeys: ["margin", "marginLeft", "marginRight", "marginTop", "marginBottom", ["marginLeft", "marginRight"], ["marginTop", "marginBottom"]], 
          node: <TailwindMargin />},
          {tags: ["aspect", "ratio"], CSSKeys: ["aspectRatio"], node: <StyleRadio rows={1} cols={3} label='Aspect Ratio' options={aspectRatioOptions} />},
        ]
      },
      {
        title: "Attributes",
        showCards: true,
        items: [
          {tags: ["inner", "text", 'content'], 
          node: <AttributeMenu />},
        ]
      },
      {
        title: 'Font',
        showCards: true,
        items: [
          {tags: ["font", "family"], CSSKeys: ["fontFamily"], node: <StyleRadio rows={1} cols={3} label="Font Family" options={fontFamilyOptions} />},
          {tags: ["letter", "spacing"], CSSKeys: ["letterSpacing"], node: <StyleRadio rows={2} cols={3} label="Tracking" options={trackingOptions} />}, 
          {tags: ["font", "size"], CSSKeys: ["fontSize", "lineHeight"], node: <StyleRange label="Font Size" options={fontSizeOptions} />},
          {tags: ["font", "weight"], CSSKeys: ["fontWeight"], node: <StyleRange label="Font Weight" options={fontWeightOptions} />},
        ]
      },
      {
        title: "Border",
        showCards: true,
        items: [
          {tags: ["border", "width"], CSSKeys: ["borderWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth", ["borderLeftWidth", "borderRightWidth"], ["borderTopWidth", "borderBottomWidth"]], 
          node: <TailwindBorderWidth />},
          {tags: ["border", "radius"], CSSKeys: ["borderRadius"], node: <StyleRange label='Border Radius' placeholder="radius" options={borderRadiusOptions} />}
        ]
      },
      
    ]
  )
}