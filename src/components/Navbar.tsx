"use client"

import Link from "next/link"
import { signOut, useSession } from "next-auth/react"

export default function Navbar() {
    const { data: session } = useSession()

    console.log(session?.user)

    const handleSignOut = () => {
        signOut({
            callbackUrl: "/signin",
            redirect: true,
        })
    }

    return (
        <div className="bg-gray-100 ">
            <div className="container flex justify-between py-2 items-center">
                <Link href="/">Home</Link>

                <div className="flex gap-3">
                    {session?.user?.name ? (
                        <>
                            <p>{session.user.name}</p>
                            <button onClick={handleSignOut}>Log out</button>
                        </>
                    ) : (
                        <Link href="/signin">Login</Link>
                    )}
                </div>
            </div>
        </div>
    )
}
