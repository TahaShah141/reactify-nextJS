import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ComponentType, ForeignComponentType } from "@/lib/types";
import mongoose from "mongoose"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const mod = (n: number, d: number): number => {
  while ( n < 0 ) n += d
  return n % d
}

export const sameCSSKey = (a: string | string[], b: string | string[]): boolean => {
  if (typeof a === "string" && typeof b === "string") return a === b
  if (a instanceof Array && b instanceof Array)
    return a.length === b.length && a.every((value, index) => value === b[index])
  else 
    return false
}

export const deepCopy = <T>(obj: T) => JSON.parse(JSON.stringify(obj));

export const getSingularValue = <T>(value: T | T[]): T => {
  return value instanceof Array ? value[0] : value;
};

function getTabs(n: number) {
  return Array(n).fill("\t").join("");
}

export const generateCode = (component: ComponentType | ForeignComponentType, indentCount: number = 0): string => {
  const tabs = getTabs(indentCount);
  if (!("children" in component)) return `${tabs}<${component.data.tabID} />`;
  const classes = component.styleOptions.map((c) => `${c.tailwind}`).join(" ");
  return `${tabs}<${component.tag} className="${classes}">
${component.innerText ? component.innerText + "\n" : ""}${component.children.map((child) => generateCode(child, indentCount + 1)).join("\n")}
${tabs}</${component.tag}>`
};

export const generateRootString = async (root: ComponentType): Promise<string> => {

  const styleOptionPromises = root.styleOptions.map(styleOption => fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/styleoption", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ styleOption })    
  }))

  const newStyleOptionJSONs = await Promise.all(styleOptionPromises)
  const newStyleOptionsObjects = await Promise.all(newStyleOptionJSONs.map(option => option.json()))
  const newStyleOptions = newStyleOptionsObjects.map(obj => obj.style._id as mongoose.Types.ObjectId)

  const newChildrenPromises = root.children.map(child => generateRootString(child as ComponentType))
  const newChildren = await Promise.all(newChildrenPromises)

  const newRoot = {
    ...root,
    children: newChildren,
    styleOptions: newStyleOptions,
  }

  return JSON.stringify(newRoot)
}

export const recursiveParse = async (root: string): Promise<ComponentType> => {

  const parsedRoot = JSON.parse(root)
  parsedRoot.data.tabID = "SNIPPETS"
  const childrenPromises = parsedRoot.children.map((child: string) => recursiveParse(child))
  parsedRoot.children = await Promise.all(childrenPromises)

  const styleOptionPromises = parsedRoot.styleOptions.map((styleOption: string) => fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/styleoption/${styleOption}`))
  const styleOptionResponses = await Promise.all(styleOptionPromises)
  const styleOptionJSONs = await Promise.all(styleOptionResponses.map(option => option.json()))

  parsedRoot.styleOptions = styleOptionJSONs.map(obj => {
    const {_id, ...style} = obj.style;
    if (style.CSSKey.length === 1 && style.CSSValue.length === 1) {
      style.CSSKey = style.CSSKey[0]
      style.CSSValue = style.CSSValue[0]
    }
    return style
  })

  return parsedRoot as ComponentType
}
