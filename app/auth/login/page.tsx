"use client"
import { AuthCard } from "@/components/custom/AuthCard";

export default function Login() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <AuthCard 
      title="Login" 
      desc="Sign in and get back to your projects." 
      buttonText="Login"
      altText="Don't Have an Account?"
      altLink="/auth/signup"
      altLinkText="Sign Up."
      credentialsCallback={(credentials) => console.log("Login", credentials)}
      />
    </div>
  )
}

