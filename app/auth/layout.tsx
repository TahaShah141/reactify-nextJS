"use client"

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { SignIn } from "@/lib/redux/slices/userSlice"
import { selectUser } from "@/lib/redux/store"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


const handleProviderUser = async (email: string) => {
  const { user } = await (await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/user/provider", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, secret: process.env.NEXT_PUBLIC_PROVIDER_SECRET }),
  })).json()

  return user
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const { user } = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const { data } = useSession()
  const router = useRouter()

  useEffect(() => {
    const verifyUser = async () => {
      if (!(user?.email) && data?.user?.email) {
        const providedUser = await handleProviderUser(data.user.email)
        dispatch(SignIn({ user: providedUser }))
      }
    }
    verifyUser()
  }, [data])

  useEffect(() => {
    if (user?.email) {
      router.push("/project?tab=Layers")
    }
  }, [user])

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      {children}
    </div>
  )
}
