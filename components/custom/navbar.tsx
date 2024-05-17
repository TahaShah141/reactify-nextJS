"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ModeToggle } from "./themeToggle"
import { Button } from "../ui/button"
import { SignOut } from "@/lib/redux/slices/userSlice"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { selectUser } from "@/lib/redux/store"
import { useEffect } from "react"
import { signOut } from "next-auth/react"
import { EnterIcon } from "@radix-ui/react-icons"
import { NavLinksType } from "@/lib/types"

type NavbarProps = {
  name: string
  routes: NavLinksType[]
}

export const Navbar: React.FC<NavbarProps> = ({name, routes}) => {

  const pathname = usePathname()
  const { user } = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    const currentRoute = routes.find((route) => pathname.startsWith(route.href))
    if (!currentRoute) return;
    if (currentRoute.isProtected && !user) {
      router.push("/auth/login")
    }
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="flex gap-8 items-center">
          <Link href="/" className="flex items-center gap-2">
            <svg className="size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" ><rect width="256" height="256" fill="none"></rect><line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line></svg>
            <h1 className="font-bold">{name}</h1>
          </Link>
          <nav className="flex items-center gap-4 text-sm lg:gap-6">
            {user ? 
            <>{routes.map((route) => (
              <Link
                key={route.name}
                href={route.href}
                className={`transition-colors hover:text-foreground/80 ${pathname.startsWith(route.href) ? "text-foreground" : "text-foreground/60"}`}
              >
                {route.name}
              </Link>
            ))}</>
            :
            <>{routes.filter((route) => !route.isProtected).map((route) => (
              <Link
                key={route.name}
                href={route.href}
                className={`transition-colors hover:text-foreground/80 ${pathname.startsWith(route.href) ? "text-foreground" : "text-foreground/60"}`}
              >
                {route.name}
              </Link>
            ))}</>
            }
          </nav>
        </div>
        <div className="flex gap-2 items-center">
          <ModeToggle />
          {user ? <Button variant={"outline"} onClick={() => {signOut(); dispatch(SignOut())}}>
            Logout
          </Button> : !pathname.startsWith("/auth") ?
          <Link href="/auth/login">
            <Button size={"icon"} variant={"outline"}>
              <EnterIcon />
            </Button> 
          </Link> : <></>}
        </div>
      </div>
    </header>
  )
}