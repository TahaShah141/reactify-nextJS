"use client"
import { AuthCard } from "@/components/custom/AuthCard";

export default function SignUp() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <AuthCard 
      title="Sign Up" 
      desc="Make a new account and start using Reactify." 
      buttonText="Sign Up"
      altText="Already Have an Account?"
      altLink="/auth/login"
      altLinkText="Sign In."
      credentialsCallback={(credentials) => console.log("Sign Up", credentials)}
      />
    </div>
  )
}

