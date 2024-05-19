import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AllSnippets } from "./AllSnippets"
import { FavoriteSnippets } from "./FavoriteSnippets"

export const Snippets = () => {
  return (
    // <Tabs defaultValue='favorites' className='w-full'>
    //   <TabsList className="grid w-full grid-cols-2">
    //     <TabsTrigger value='all'>All</TabsTrigger>
    //     <TabsTrigger value='favorites'>Favorites</TabsTrigger>
    //   </TabsList>
    //   <TabsContent value='favorites'>
    //     <FavoriteSnippets />
    //   </TabsContent>
    //   <TabsContent value='all'>
    //     <AllSnippets />
    //   </TabsContent>
    // </Tabs>
    <>
        <FavoriteSnippets />
        <AllSnippets />
    </>
      )
}
