import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {signInWithEmailAndPassword} from 'firebase/auth';
import { FirebaseAuth } from "../../../src/settings/firebase/firebase";
import {getSession} from "next-auth/react";
export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {

            },
            async authorize(credentials, req): Promise<any> {
                return await signInWithEmailAndPassword(FirebaseAuth, (credentials as any).email, (credentials as any).password || '')
                    .then(userCredential => {
                        if (userCredential.user) {
                            getSession({req})
                            return {
                                ...userCredential.user,
                                name: userCredential.user.displayName,
                                id: userCredential.user.uid
                            }
                        }
                        return null
                    })
                    .catch(error => (console.log(error)))
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(error)
                    })
            }
        })
    ],
    secret: process.env.NEXT_PUBLIC_SECRET,
    callbacks: {
        session: async ({session, token}) => ({
            ...session,
            user: {
                ...session.user,
                id: token.sub
            }
        })

    }
}
export default NextAuth(authOptions as any)