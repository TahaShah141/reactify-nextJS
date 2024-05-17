import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ComponentType, ForeignComponentType } from "@/lib/types";

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
${component.innerText}
${component.children.map((child) => generateCode(child, indentCount + 1)).join("\n")}
${tabs}</${component.tag}>`
};
