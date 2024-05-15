import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const componentsToClone: Record<string, JSX.Element> = {
  //HTML
  "div": <div></div>,
  "input": <input placeholder="Type Here..."/>,
  "textarea": <textarea placeholder="Type Here..."/>,
  "button": <button></button>,
  "span": <span></span>,
  "a": <a></a>,
  
  //ShadCN
  "Button": <Button></Button>,
  "Card": <Card></Card>,
  "Input": <Input></Input>,
  "Label": <Label></Label>,
  
  //Typography
  "p": <p></p>,
  "h1": <h1></h1>,
  "h2": <h2></h2>,
  "h3": <h3></h3>,
  "h4": <h4></h4>,
  "h5": <h5></h5>,
  "h6": <h6></h6>,
  "li": <li></li>,
  "ul": <ul></ul>,
}