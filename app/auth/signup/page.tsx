"use client"
import { AuthCard } from "@/components/custom/AuthCard";
import { UserType } from "@/lib/types";

export default function SignUp() {

  const getUser = async (credentials: {email: string, password: string}): Promise<{user?: UserType, error?: string}> => {
    const {user, error} = await (await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/user/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({credentials})
    })).json()

    return {user, error}
  }

  return (
    <AuthCard 
    title="Sign Up" 
    desc="Make a new account and start using Reactify." 
    buttonText="Sign Up"
    altText="Already Have an Account?"
    altLink="/auth/login"
    altLinkText="Sign In."
    credentialsCallback={getUser}
    />
  )
}

