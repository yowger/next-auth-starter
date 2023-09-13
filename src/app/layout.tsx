import NextAuthProvider from "@/components/providers/NextAuthProvider"
import "../styles/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Next Auth Starter",
    description: "Next Auth Starter code by Roger Pantil",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <NextAuthProvider>{children}</NextAuthProvider>
            </body>
        </html>
    )
}
