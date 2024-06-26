import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { pricingCards } from '@/lib/constants'
import clsx from 'clsx'
import { Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { SnippetCard } from '@/components/custom/SnippetCard'
import { SnippetType } from '@/lib/types'
import { CarouselWithIndicators } from '@/components/custom/CarouselWithIndicators'
import { Button } from '@/components/ui/button'


export default async function Home() {

  const { snippets } = await(await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/snippet/top")).json()

  return (
    <main className='flex flex-col gap-6 p-8'>
      <section className="h-full w-full md:pt-44 mt-[-70px] relative flex items-center justify-center flex-col ">

        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ef4444_1px,transparent_1px),linear-gradient(to_bottom,#ef4444_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />

        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
          <h1 className="text-5xl font-bold text-center md:text-[300px]">
            Reactify
          </h1>
        </div>
        <div className="flex justify-center items-center relative md:mt-[-60px]">
          <Image
            src="/assets/hero.png"
            alt="banner image"
            height={1200}
            width={1200}
            className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted"
          />
          <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10"></div>
        </div>
      </section>

      <section className='flex flex-col gap-6 justify-center items-center w-full'>
        <h1 className='text-7xl font-bold'>Featured Snippets</h1>
        <div className='max-w-7xl'>
          <CarouselWithIndicators
          itemClassName='basis-1/3 flex justify-center'
          contentClassName=''
          indicatorClassName=''
          items={snippets.map((snippet: SnippetType) => 
            <SnippetCard key={snippet._id} snippet={snippet} />
          )} />
        </div>
      </section>

      <section className="flex justify-center items-center flex-col gap-4 md:!mt-20 mt-[-60px]">
        <h2 className="text-4xl text-center"> Choose what fits you right</h2>
        <p className="text-muted-foreground text-center">
          Our straightforward pricing plans are tailored to meet your needs. If
          {" you're"} not <br />
          ready to commit you can get started for free.
        </p>
        <div className="flex  justify-center gap-4 flex-wrap mt-6">
          {
            pricingCards.map((card) => (
              <Card key={card.title} className={clsx('w-[300px] flex flex-col justify-between')}>
                <CardHeader>
                  <CardTitle
                    className={clsx({
                      'text-muted-foreground': true,
                    })}
                  >
                    {card.title}
                  </CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-4xl font-bold">{card.price}</span>
                  <span>/ {card.duration}</span>
                </CardContent>
                <CardFooter className="flex flex-col  items-start gap-4 ">
                  <div>
                    {card.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex gap-2"
                      >
                        <Check />
                        <p>{feature}</p>
                      </div>
                    ))}
                  </div>
                  <Button className='w-full'> Get Started </Button>
                </CardFooter>
              </Card>
            )) 
          }
          
        </div>
      </section>
    </main>
  )
}

