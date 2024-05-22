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
import { sizeOptions } from "./Sizing/sizeOptions"
import { textAlignOptions } from "./Typography/textAlignOptions"
import { textDecorationOptions } from "./Typography/textDecorationOptions"
import { whiteSpaceOptions } from "./Typography/whitespaceOptions"
import { wordBreakOptions } from "./Typography/wordbreakOptions"
import { fontStyleOptions } from "./Typography/fontStyleOptions"
import { textTransformOptions } from "./Typography/textTransfromOptions"
import { flexWrapOptions } from "./Layout/flexWrapOptions"
import { placeContentOptions } from "./Layout/placeContentOptions"

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
          (displayType === "flex" ? {tags: ["flex", "wrap"], CSSKeys: ["flexWrap"], node: <StyleRadio rows={1} cols={3} label='Flex Wrap' options={flexWrapOptions} />} : undefined),
          {tags: ["flex", "ratio"], CSSKeys: ["flex"], node: <TailwindFlexRatio />},
          (displayType === "grid" ? {tags: ["grid", "size"], CSSKeys: [["gridTemplateRows", "gridTemplateColumns"], 'gridSize'], node: <TailwindGridSize />} : undefined),
          (displayType === "grid" ? {tags: ["justify", "content"], CSSKeys: ["justifyContent"], node: <StyleRadio rows={2} cols={3} label='Justify Content' options={justifyContentOptions} />} : undefined),
          {tags: ["gap", "spacing"], CSSKeys: ["gap"], node: <StyleRange label="Gap" options={gapOptions} />},
          {tags: ["place", "content"], CSSKeys: ["placeContent"], node: <StyleRadio rows={2} cols={3} label='Place Content' options={placeContentOptions} />},
          {tags: ["align", "items"], CSSKeys: ["alignItems"], node: <StyleRadio rows={1} cols={3} label='Align Items' options={alignItemsOptions} />},
          {tags: ["align", "self"], CSSKeys: ["alignSelf"], node: <StyleRadio rows={1} cols={3} label='Align Self' options={alignSelfOptions} />},
        ]
      },
      {
        title: "Sizing",
        showCards: true,
        items: [
          {tags: ["size"], CSSKeys: [["width", "height"]], node: <StyleRange label='Size' options={sizeOptions} />},
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
        title: 'Typography',
        showCards: true,
        items: [
          {tags: ["font", "text", "size"], CSSKeys: ["fontSize", "lineHeight"], node: <StyleRange label="Font Size" options={fontSizeOptions} />},
          {tags: ["font", "text", "weight"], CSSKeys: ["fontWeight"], node: <StyleRange label="Font Weight" options={fontWeightOptions} />},
          {tags: ["font", "text", "align"], CSSKeys: ["textAlign"], node: <StyleRadio rows={2} cols={3} label="Text Align" options={textAlignOptions} />},
          {tags: ["font", "text", "family"], CSSKeys: ["fontFamily"], node: <StyleRadio rows={1} cols={3} label="Font Family" options={fontFamilyOptions} />},
          {tags: ["font", "text", "style"], CSSKeys: ["fontStyle"], node: <StyleRadio rows={1} cols={2} label="Font Style" options={fontStyleOptions} />},
          {tags: ["font", "text", "transform"], CSSKeys: ["textTransform"], node: <StyleRadio rows={2} cols={2} label="Text Transform" options={textTransformOptions} />},
          {tags: ["letter", "spacing"], CSSKeys: ["letterSpacing"], node: <StyleRadio rows={2} cols={3} label="Tracking" options={trackingOptions} />}, 
          {tags: ["font", "text", "decoration"], CSSKeys: ["textDecorationLine"], node: <StyleRadio rows={2} cols={2} label="Text Decoration" options={textDecorationOptions} />},
          {tags: ["font", "text", "white", "space"], CSSKeys: ["whiteSpace"], node: <StyleRadio rows={3} cols={2} label="WhiteSpace" options={whiteSpaceOptions} />},
          {tags: ["font", "text", "word", "break"], CSSKeys: ["wordBreak", "overflowWrap", ["wordBreak", "overflowWrap"]], node: <StyleRadio rows={2} cols={2} label="Word Break" options={wordBreakOptions} />},
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