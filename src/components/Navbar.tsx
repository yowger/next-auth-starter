import Link from "next/link"

export default function Navbar() {
    return (
        <div className="bg-gray-100 ">
            <div className="container flex justify-between py-2 items-center">
                <Link href="/">Home</Link>

                <div className="flex gap-3">
                    <Link href="/register">Register</Link>
                    <Link href="/login">Login</Link>
                </div>
            </div>
        </div>
    )
}
