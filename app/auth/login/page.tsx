"use client"
import { AuthCard } from "@/components/custom/AuthCard";
import { UserType } from "@/models/UserModel";

export default function Login() {

  const getUser = async (credentials: {email: string, password: string}): Promise<{user?: UserType, error?: string}> => {
    const {user, error} = await (await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({credentials})
    })).json()

    return {user, error}
  }

  return (
    <AuthCard 
    title="Login" 
    desc="Sign in and get back to your projects." 
    buttonText="Login"
    altText="Don't Have an Account?"
    altLink="/auth/signup"
    altLinkText="Sign Up."
    credentialsCallback={getUser}
    />
  )
}

