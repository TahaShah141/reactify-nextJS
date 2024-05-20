import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ComponentType, ForeignComponentType, StyleType } from "@/lib/types";
import mongoose from "mongoose";
import { shadComponentsFileName } from "@/components/pageComponents/ProjectsPage/WorkPlace/Sidebar/CodePreview/codeUtils";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const mod = (n: number, d: number): number => {
  while (n < 0) n += d;
  return n % d;
};

export const sameCSSKey = (
  a: string | string[],
  b: string | string[]
): boolean => {
  if (typeof a === "string" && typeof b === "string") return a === b;
  if (a instanceof Array && b instanceof Array)
    return (
      a.length === b.length && a.every((value, index) => value === b[index])
    );
  else return false;
};

export const deepCopy = <T>(obj: T) => JSON.parse(JSON.stringify(obj));

export const getSingularValue = <T>(value: T | T[]): T => {
  return value instanceof Array ? value[0] : value;
};

function getTabs(n: number) {
  return Array(n).fill("  ").join("");
  // return Array(n).fill("\t").join("");
}

export const generateCode = (
  component: ComponentType | ForeignComponentType,
  indentCount: number = 0
): string => {
  const tabs = getTabs(indentCount);

  if (!("children" in component))
    return `${tabs}<${capitalizeFirstLetter(component.data.tabID)} />`;

  const childrenCode =
    component.children
      .map((child) => generateCode(child, indentCount + 1))
      .join("\n") + (component.children.length ? "\n" : "");

  const innerTextCode = component.innerText
    ? getTabs(indentCount + 1) + component.innerText + "\n"
    : "";

  // if (component.children)
  const classes = component.styleOptions.map((c) => `${c.tailwind}`).join(" ");

  if (!innerTextCode && !childrenCode) {
    return `${tabs}<${component.tag} className="${classes}" />`;
    // ${innerTextCode}${childrenCode}${tabs}</${component.tag}>`;
  }

  return `${tabs}<${component.tag} className="${classes}">
${innerTextCode}${childrenCode}${tabs}</${component.tag}>`;
};

function capitalizeFirstLetter(x: string) {
  if (x.length == 0) return x;
  return x[0].toUpperCase() + x.substring(1);
}

export function findReactComponents(component: ComponentType | ForeignComponentType) {
  if (!("children" in component)) return []; // return if foreign component
  
  let list = new Set<string>();
  const reactTagRegex = /[A-Z][a-zA-Z0-9]*/;
  if (reactTagRegex.test(component.tag)) {
    // console.log(component)
    list.add(component.tag);
  }
  component.children.map(findReactComponents).flat().forEach(x => list.add(x));
  return Array.from(list);
}

function findForeignComponents(component: ComponentType | ForeignComponentType) {
  let list = new Set<string>();
  if ("children" in component) {
    component.children.map(findForeignComponents).flat().forEach(x => list.add(x));
  } else {
    list.add(component.data.tabID);
  }
  return Array.from(list);
}

export const generateComponentCode = (
  component: ComponentType,
  name: string
): string => {
  const upperCaseName = capitalizeFirstLetter(name);

  console.log(findReactComponents(component))
    const foreignImports = findForeignComponents(component).map(tag => 
      `import ${capitalizeFirstLetter(tag)} from "@/components/${tag}";`
    ).join('\n');
    const shadImports = findReactComponents(component).map(tag => 
      `import { ${tag} } from "@/components/ui/${shadComponentsFileName(tag)}";`
    ).join('\n');

    const imports = [foreignImports, shadImports].filter(x => !!x).join("\n\n");

  return `${imports}


function ${upperCaseName}() {
  return (
${generateCode(component, 2)}
  );
}

export default ${upperCaseName};`;
};

export const generateRootString = async (
  root: ComponentType | ForeignComponentType
): Promise<string> => {
  if (!("styleOptions" in root)) return JSON.stringify(root);

  const styleOptionPromises = root.styleOptions.map((styleOption) =>
    fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/styleoption", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ styleOption }),
    })
  );

  const newStyleOptionJSONs = await Promise.all(styleOptionPromises);
  const newStyleOptionsObjects = await Promise.all(
    newStyleOptionJSONs.map((option) => option.json())
  );
  const newStyleOptions = newStyleOptionsObjects.map(
    (obj) => obj.style._id as mongoose.Types.ObjectId
  );

  const newChildrenPromises = root.children.map((child) =>
    generateRootString(child)
  );
  const newChildren = await Promise.all(newChildrenPromises);

  const newRoot = {
    ...root,
    children: newChildren,
    styleOptions: newStyleOptions,
  };

  return JSON.stringify(newRoot);
};

export const parseRoot = async (
  root: string,
  isSnippet: boolean,
  memo: Record<string, StyleType> = {}
): Promise<{
  root: ComponentType | ForeignComponentType;
  newMemos: Record<string, StyleType>;
}> => {
  const parsedRoot = JSON.parse(root);

  if (!("styleOptions" in parsedRoot))
    return { root: parsedRoot, newMemos: {} };

  const { memoizedStyles, stylesToFetch } = (
    parsedRoot.styleOptions as Array<string>
  ).reduce(
    ({ memoizedStyles, stylesToFetch }, styleOption) => {
      const style = memo[styleOption];
      if (!style) stylesToFetch.push(styleOption);
      else memoizedStyles.push(style);
      return { memoizedStyles, stylesToFetch };
    },
    { memoizedStyles: [] as StyleType[], stylesToFetch: [] as string[] }
  );

  let newMemos: Record<string, StyleType> = {};

  const styleOptionPromises = stylesToFetch.map((styleOption: string) =>
    fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/styleoption/${styleOption}`)
  );
  const styleOptionResponses = await Promise.all(styleOptionPromises);
  const styleOptionJSONs = await Promise.all(
    styleOptionResponses.map((option) => option.json())
  );

  parsedRoot.styleOptions = [
    ...styleOptionJSONs.map((obj) => {
      const { _id, ...style } = obj.style;
      newMemos[_id] = style;
      memo[_id] = style;
      if (style.CSSKey.length === 1 && style.CSSValue.length === 1) {
        style.CSSKey = style.CSSKey[0];
        style.CSSValue = style.CSSValue[0];
      }
      return style;
    }),
    ...memoizedStyles,
  ];

  if (isSnippet) {
    parsedRoot.data.tabID = "SNIPPETS";
    parsedRoot.data.rootID = "SNIPPETS";
  }

  const childrenPromises = parsedRoot.children.map((child: string) =>
    parseRoot(child, isSnippet, memo)
  );
  parsedRoot.children = (await Promise.all(childrenPromises)).map(
    ({ root, newMemos: newerMemos }) => {
      newMemos = {
        ...newMemos,
        ...newerMemos,
      };
      return root;
    }
  );

  return { root: parsedRoot, newMemos };
};
