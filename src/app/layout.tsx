import NextAuthProvider from "@/components/providers/NextAuthProvider"
import Navbar from "@/components/Navbar"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../styles/globals.css"

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
                <NextAuthProvider>
                    <div className="flex flex-col min-h-screen">
                        <Navbar />
                        {children}
                    </div>
                </NextAuthProvider>
            </body>
        </html>
    )
}
