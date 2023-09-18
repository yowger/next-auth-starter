import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// todo add remember me
export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {
                    label: "email",
                    type: "text",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const fetchUserResults = await fetch(
                    "http://localhost:3000/api/signin",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "Application/json",
                        },
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password,
                        }),
                    }
                )

                const user = await fetchUserResults.json()

                if (user) {
                    return user
                } else {
                    return null
                }
            },
        }),
    ],
    pages: {
        signIn: "/signin",
        // todo make signout page
        // signOut: "/signout"
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    callbacks: {
        async jwt({ user, token, trigger, session }) {
            // if(trigger === "update") {
            //     return {...token, session.user}
            // }

            return { ...user, ...token }
        },
        async session({ session, token }) {
            const { iat, exp, jti, sub, ...userWithoutClaims } = token as any
            session.user = userWithoutClaims

            return session
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
