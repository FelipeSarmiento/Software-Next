import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            email: string
            name: string
            picture: string
            address: string
        } & DefaultSession["user"]
    }
}