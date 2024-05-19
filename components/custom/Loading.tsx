import { Card } from "../ui/card"

export const Loading = () => {
  return (
    <Card className='flex w-full h-12 space-x-2 justify-center items-center rounded-sm'>
      <span className='sr-only'>Loading...</span>
      <div className='size-2 bg-foreground rounded-full animate-bounce [animation-delay:-0.3s]'></div>
      <div className='size-2 bg-foreground rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div className='size-2 bg-foreground rounded-full animate-bounce'></div>
    </Card>
  )
}
