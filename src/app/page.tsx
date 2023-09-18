import { getServerSession } from "next-auth"
import Image from "next/image"
import { authOptions } from "./api/auth/[...nextauth]/route"

export default async function Home() {
    const session = await getServerSession(authOptions)

    console.log("session ", session)
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            main
        </main>
    )
}
