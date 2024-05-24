import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-2">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ef4444_1px,transparent_1px),linear-gradient(to_bottom,#ef4444_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />
      <div className="h-full w-full md:pt-44 mt-[-70px] relative flex items-center justify-center flex-col ">
        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
          <h1 className="text-5xl font-bold text-center md:text-[300px]">
            About
          </h1>
        </div>
        <div className="flex flex-col gap-10 justify-center items-center pb-20">
          <Card className="flex flex-col gap-10 justify-center items-center w-11/12 p-10">
            <div className="w-full flex gap-4 justify-center">
              <div className="flex flex-col gap-4 flex-1">
                <Label className="text-5xl font-semibold">Authentication</Label>
                <div className="flex flex-col gap-2">
                  <p className="text-xl">As per industry standards, Authentication is a crucial part of every website with a user base. We use user authentication to ensure the security and privacy of each individual user and to make sure they are properly credited and appreciated for their contributions.</p>
                  <p className="text-xl">Alongside the standard authentication process using user credentials, we have also implemented OAuth, which lets a user login directly using their Google or Github Accounts. Thus making the website easier to get started with and provide a seamless experience across devices.</p>
                  <p className="text-xl">The Snippets and About pages are a public pages that even unauthenticated users can access. But to access the editor and projects, you need to Login or Signup. This is to ensure that only serious users can contribute to the public snippets and create their own projects.</p>
                </div>
              </div>
              <Image
              src="/assets/login.png"
              alt="login page"
              width={600}
              height={340}
              className="rounded-md border-2 border-muted"
              />
            </div>
          </Card>
          <Card className="flex flex-col gap-4 justify-center items-center w-11/12 p-10">
            <div className="w-full flex flex-row-reverse gap-10 justify-center">
              <div className="flex flex-col gap-4 flex-1">
                <Label className="text-5xl font-semibold">Snippets</Label>
                <div className="flex flex-col gap-2">
                  <p className="text-xl">This page contains all the snippets made by the community for the use of others. Contribution to this page is crucial to the growth of the reactify community. It is made to be an open-source source of codes and building blocks to make intricate UIs.</p>
                  <p className="text-xl">The page has all the snippet cards listed, alongside information about when they were last updated, who created the snippet and how many users favorited the snippet. Upload yours and be a part of the collective growth to the website !!</p>
                  <p className="text-xl">Copy Code Button copies the code to the clipboard to the user and allows them to paste it as a component in their react page.</p>
                  <p className="text-xl">Open in Editor Button allows logged in users to start off a new project with that snippet already present in the project for use. This way you can build on top of the works of others and dont have to start anew each time.</p>
                </div>
              </div>
              <Image
              src="/assets/snippetsPage.png"
              alt="login page"
              width={600}
              height={340}
              className="rounded-md border-2 border-muted"
              />
            </div>
          </Card>
          <Card className="flex flex-col gap-4 justify-center items-center w-11/12 p-10">
            <div className="w-full flex gap-10 justify-center">
              <div className="flex flex-col gap-6 flex-1">
                <Label className="text-5xl font-semibold">Projects</Label>
                <div className="flex flex-col gap-4">
                  <p className="text-xl">This page is the heart of the website. It has Three main components, separated horizontally but working in synergy to enhance the user experience and make it a smooth process to make whole new project</p>
                  <p className="text-xl">On The left we have the sidebar. This single component has a lot of functionality that gets put to use in different stages of the creation process. More on it later.</p>
                  <p className="text-xl">In the middle we have the workplace, here we have all the tabs used for the project in the top. Each tab is like a separate reusable React Component.</p>
                  <p className="text-xl">Then we have the main root component of each tab. This gets updated live to show changes. This is where all the drag and drop takes place and your project grows over time. </p>
                  <p className="text-xl">In the bottom we have the component tray that has categorized draggable components to be used inside the main root. This provides basic building blocks like HTML tags, shadCN components, custom components made in other tabs and even favorited snippets of the user.</p>
                  <p className="text-xl">On the right we have the Selected Menu. When you click on a component, we select it and have different options to edit it. Primarily changing the CSS of the selected component or its inner text. You can find all types of CSS Attributes here ranging from the basics of flexbox, padding etc to specific things like word-break or text decoration.</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Image
                src="/assets/hero.png"
                alt="login page"
                width={600}
                height={340}
                className="rounded-md border-2 border-muted"
                />
                <Image
                src="/assets/projectPage.png"
                alt="login page"
                width={600}
                height={340}
                className="rounded-md border-2 border-muted"
                />
              </div>
            </div>
          </Card>
          <Card className="flex flex-col gap-4 justify-center items-center w-11/12 p-10">
            <div className="w-full flex flex-row-reverse gap-10 justify-center">
              <div className="flex flex-col gap-6 flex-1">
                <Label className="text-5xl font-semibold">Project: Sidebar</Label>
                <div className="flex flex-col gap-4">
                  <p className="text-xl">The <strong>projects tab</strong> that shows the current project open on the very top. Then loads all the users projects that they have created below it. The user can easily switch between projects, start a new one or save the one to the DB with just a click of a button.</p>
                  <p className="text-xl">The <strong>snippets tab</strong>, this has two sections, all and favorites. This tab loads the public snippets made by the community. A user can use the snippet by either favoriting it or copying the component from the button and pasting it into the selected component using Ctrl+V</p>
                  <p className="text-xl">The <strong>layers tab</strong> is a second view of how the current tab is structured. press control and click on a layer to select that corresponding component, or use drag and drop directly on the layers to update the structure of the project.</p>
                  <p className="text-xl">The <strong>icons tab</strong> has a collection of radixUI icons that can be copied into the project by clicking on the icon of your choosing and pasting it into the selected component in your project. Icons help add character and depth to your project so be sure to try it out.</p>
                  <p className="text-xl">The <strong>code tab</strong> shows the user a read-only view of how the code of each tab would look in their react project. The code is generated from the main root component of each tab and updates as the root changes. We also have the option to zip up the current state of the project and run it as react code with just two simple commands<br />"npm i" and "npm run dev"</p>
                  <p className="text-xl">Finally we have the <strong>save menu</strong>. Here you can save your selected component as a snippet and upload it publicly or save your project as a new project for later use.</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Image
                src="/assets/sideBarLayers.png"
                alt="login page"
                width={600}
                height={340}
                className="rounded-md border-2 border-muted"
                />
                <Image
                src="/assets/sideBarCode.png"
                alt="login page"
                width={600}
                height={340}
                className="rounded-md border-2 border-muted"
                />
              </div>
            </div>
          </Card>
          <Card className="flex flex-col gap-4 justify-center items-center w-11/12 p-10">
            <div className="w-full flex flex-row-reverse gap-10 justify-center">
              <div className="flex flex-col gap-4 flex-1">
                <Label className="text-5xl font-semibold">Usage Tips</Label>
                <div className="flex flex-col gap-2">
                  <p className="text-xl">You can directly copy code of snippets from the snippets page into your project without having to go through the whole zip and unzip process</p>
                  <p className="text-xl">Copy a selected component by pressing ctrl+C and paste it anywhere inside your project by selecting the intended parent and pressing ctrl+V</p>
                  <p className="text-xl">Delete any selected component by pressing del button. Delete un-needed tabs by right clicking and clicking Delete</p>
                  <p className="text-xl">Make reusable components inside another tab so you dont have to make the same edits multiple times</p>
                  <p className="text-xl">You can make a temporary custom class that lives inside your editor for the session to quickly apply multiple styles at once. Make a custom class by selecting the component whose style you want to copy and then just name your class</p>
                  <p className="text-xl">Make sure to use the layers tab for quickly moving around components since it has more standard hitboxes and is easier to navigate.</p>
                  <p className="text-xl">While dragging a component or layer, hold ctrl when releasing it to place it ABOVE the dropped component instead of inside it. This allows for fast reordering of components.</p>                  
                  <p className="text-xl">Press Ctrl+I when a component is selected to quickly jump to editing its inner text. Typography classes are also close by in the CSS Menu</p>
                  <p className="text-xl">If the style menu looks overwhelming at first sight, use the search bar to filter out the desired styles you want to change.</p>                  
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
