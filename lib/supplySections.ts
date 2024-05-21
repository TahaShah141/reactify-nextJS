import { ComponentType } from "@/lib/types";


export const BasicSection: ComponentType = 
{
  id: "Basic",
  tag: "div",
  innerText:"",
  styleOptions: [],
  data: {
    rootID: "SUPPLY",
    tabID: "SUPPLY",
    path: [0],
    selected: false,
    draggable: false,
    droppable: false,
    canHaveChildren: true
  },
  children: [
    {
      id: "Div",
      tag: "div",
      innerText:"",
      className: ``,
      styleOptions: [
        {
          label: "Padding",
          tailwind: "p-2",
          CSSKey: "padding",
          CSSValue: "0.5rem",
        }
      ],
      children: [],
      data: {
        rootID: "SUPPLY",
        tabID: "SUPPLY",
        path: [0, 0],
        selected: false,
        draggable: true,
        droppable: true,
        canHaveChildren: true
      }
    },
    {
      id: "button",
      tag: "button",
      className: ``,
      innerText: "button",
      styleOptions: [
        {
          label: "Background Color",
          tailwind: "bg-neutral-300",
          CSSKey: "backgroundColor",
          CSSValue: "#d4d4d4",
        },
        {
          label: "Padding",
          tailwind: "p-1",
          CSSKey: "padding",
          CSSValue: "0.25rem",
        },
        {
          label: "Border Radius",
          tailwind: "rounded-md",
          CSSKey: "borderRadius",
          CSSValue: "6px",
        },
        {
          label: "Text Color",
          tailwind: "text-black",
          CSSKey: "color",
          CSSValue: "#000000",
        }
      ],
      children: [],
      data: {
        rootID: "SUPPLY",
        tabID: "SUPPLY",
        path: [0, 1],
        selected: false,
        draggable: true,
        droppable: true,
        canHaveChildren: true
      }
    },
    {
      id: "input",
      tag: "input",
      className: ``,
      innerText: "",
      styleOptions: [],
      children: [],
      data: {
        rootID: "SUPPLY",
        tabID: "SUPPLY",
        path: [0, 2],
        selected: false,
        draggable: true,
        droppable: false,
        canHaveChildren: false
      }
    },
    {
      id: "textarea",
      tag: "textarea",
      className: ``,
      innerText: "",
      styleOptions: [],
        children: [],
      data: {
        rootID: "SUPPLY",
        tabID: "SUPPLY",
        path: [0, 3],
        selected: false,
        draggable: true,
        droppable: false,
        canHaveChildren: false
      }
    },
    {
      id: "anchor",
      tag: "a",
      className: ``,
      innerText: "Link Text Here",
      styleOptions: [],
      children: [],
      data: {
        rootID: "SUPPLY",
        tabID: "SUPPLY",
        path: [0, 4],
        selected: false,
        draggable: true,
        droppable: true,
        canHaveChildren: true
      }
    },
    {
      id: "span",
      tag: "span",
      className: ``,
      innerText: "Span Text Here",
      styleOptions: [],
      children: [],
      data: {
        rootID: "SUPPLY",
        tabID: "SUPPLY",
        path: [0, 5],
        selected: false,
        draggable: true,
        droppable: true,
        canHaveChildren: true
      }
    }
  ]
}

export const TypographySection: ComponentType =
{
  id: "Typography",
  tag: "div",
  innerText:"",
  styleOptions: [],
  data: {
    rootID: "SUPPLY",
    tabID: "SUPPLY",
    path: [1],
    selected: false,
    draggable: false,
    droppable: false,
    canHaveChildren: true
  },
  children: [
    {
      id: "Paragraph",
      tag: "p",
      className: ``,
      innerText: "Paragraph",
      styleOptions: [],
      children: [],
      data: {
        rootID: "SUPPLY",
        tabID: "SUPPLY",
        path: [1, 0],
        selected: false,
        draggable: true,
        droppable: true,
        canHaveChildren: true
      }
    },
    {
      id: "Heading 1",
      tag: "h1",
      className: ``,
      innerText: "Heading 1",
      styleOptions: [],
      children: [],
      data: {
        rootID: "SUPPLY",
        tabID: "SUPPLY",
        path: [1, 1],
        selected: false,
        draggable: true,
        droppable: true,
        canHaveChildren: true
      }
    },
    {
      id: "Heading 2",
      tag: "h2",
      className: ``,
      innerText: "Heading 2",
      styleOptions: [],
      children: [],
      data: {
        rootID: "SUPPLY",
        tabID: "SUPPLY",
        path: [1, 2],
        selected: false,
        draggable: true,
        droppable: true,
        canHaveChildren: true
      }
    },
    {
      id: "Heading 3",
      tag: "h3",
      className: ``,
      innerText: "Heading 3",
      styleOptions: [],
      children: [],
      data: {
        rootID: "SUPPLY",
        tabID: "SUPPLY",
        path: [1, 3],
        selected: false,
        draggable: true,
        droppable: true,
        canHaveChildren: true
      }
    },
    {
      id: "Heading 4",
      tag: "h4",
      className: ``,
      innerText: "Heading 4",
      styleOptions: [],
      children: [],
      data: {
        rootID: "SUPPLY",
        tabID: "SUPPLY",
        path: [1, 4],
        selected: false,
        draggable: true,
        droppable: true,
        canHaveChildren: true
      }
    },
    {
      id: "Heading 5",
      tag: "h5",
      className: ``,
      innerText: "Heading 5",
      styleOptions: [],
      children: [],
      data: {
        rootID: "SUPPLY",
        tabID: "SUPPLY",
        path: [1, 5],
        selected: false,
        draggable: true,
        droppable: true,
        canHaveChildren: true
      }
    },
    {
      id: "Heading 6",
      tag: "h6",
      className: ``,
      innerText: "Heading 6",
      styleOptions: [],
      children: [],
      data: {
        rootID: "SUPPLY",
        tabID: "SUPPLY",
        path: [1, 6],
        selected: false,
        draggable: true,
        droppable: true,
        canHaveChildren: true
      }
    },
  ],
}

export const ShadCnSection: ComponentType =
{
  id: "ShadCN",
  tag: "div",
  innerText:"",
  styleOptions: [],
  data: {
    rootID: "SUPPLY",
    tabID: "SUPPLY",
    path: [2],
    selected: false,
    draggable: false,
    droppable: false,
    canHaveChildren: true
  },
  children: [
    {
      id: "Button",
      tag: "Button",
      className: ``,
      innerText: "Click Me!!",
      styleOptions: [],
      children: [],
      data: {
        rootID: "SUPPLY",
        tabID: "SUPPLY",
        path: [2, 0],
        selected: false,
        draggable: true,
        droppable: true,
        canHaveChildren: true
      }
    },
    {
      id: "Input",
      tag: "Input",
      innerText:"",
      className: ``,
      styleOptions: [],
      children: [],
      data: {
        rootID: "SUPPLY",
        tabID: "SUPPLY",
        path: [2, 1],
        selected: false,
        draggable: true,
        droppable: true,
        canHaveChildren: false
      }
    },
    {
      id: "Card",
      tag: "Card",
      innerText:"",
      className: ``,
      styleOptions: [ 
        {
          label: "Padding",
          tailwind: "p-2",
          CSSKey: "padding",
          CSSValue: "0.5rem",
        }
      ],
      children: [],
      data: {
        rootID: "SUPPLY",
        tabID: "SUPPLY",
        path: [2, 2],
        selected: false,
        draggable: true,
        droppable: true,
        canHaveChildren: true
      }
    },
    {
      id: "Label",
      tag: "Label",
      innerText: "Label Text",
      className: ``,
      styleOptions: [],
      children: [],
      data: {
        rootID: "SUPPLY",
        tabID: "SUPPLY",
        path: [2, 3],
        selected: false,
        draggable: true,
        droppable: true,
        canHaveChildren: true
      }
    },
    {
      id: "Separator",
      tag: "Separator",
      innerText: "",
      className: ``,
      styleOptions: [],
      children: [],
      data: {
        rootID: "SUPPLY",
        tabID: "SUPPLY",
        path: [2, 4],
        selected: false,
        draggable: true,
        droppable: true,
        canHaveChildren: false
      }
    }
  ],
}