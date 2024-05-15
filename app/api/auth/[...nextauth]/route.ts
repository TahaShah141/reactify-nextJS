import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@ex.com" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

        console.log(credentials)
        return {id: "1234", name: "Taha", email: "example@ex.com"}
        // Add logic here to look up the user from the credentials.
        // Return null if user not found
        // Return user object if user was found
        return null
      }      
    })
  ],
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }