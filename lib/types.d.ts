export type NavLinksType = {
  name: string
  href: string
  isProtected: boolean
}

export type CustomStyleType = {
  name: string
  styles: StyleType[]
}

export type StyleType = {
  label: string | React.ReactNode
  tailwind: string,
  CSSKey: string | string[],
  CSSValue: string | string[]
}

export type ComponentChildren = (ComponentType | ForeignComponentType)[]

export type ForeignComponentType = {
  id: UniqueIdentifier
  data: {
    path: number[]
    rootID: string
    tabID: string
    selected: boolean
    droppable: boolean
    draggable: boolean
  }
}

export type TabType = {
  root: ComponentType
  imports: string[]
}

// Define a type for a component, which has the following fields
export type ComponentType = {
  // Unique identifier for the component
  id: UniqueIdentifier
  // The tag name of the component
  tag: string
  // Optional class name for styling
  className?: string
  styleOptions: StyleType[]
  innerText: string
  // style: Record<string, string>
  // Data associated with the component
  data: {
    //where to start the path
    rootID: string
    //where the actual component lives
    tabID: string
    // Path of the component relative to the root
    path: number[]
    // Indicates if the component is selected
    selected: boolean
    // Indicates if the component is droppable
    droppable: boolean
    // Indicates if the component is draggable
    draggable: boolean
    // Indicates if the component can have children
    canHaveChildren: boolean
  }
  // Array of child components
  children: ComponentChildren
}

export type Section = {
  title: string
  items: ({
    CSSKeys?: string[] | (string | string[])[], 
    node: React.ReactNode
  } | undefined)[]
  showCards: boolean
} 

export type UserType = {
  _id: string
  email: string
  customClasses: CustomStyleType[] 
}