import { withAuth } from "next-auth/middleware"
import { NextRequest } from "next/server"

export default withAuth(function middleware(request: NextRequest) {}, {
    callbacks: {
        authorized: ({ req, token }) => {
            const { pathname } = req.nextUrl

            if (pathname.startsWith("/profile")) {
                if (!token) {
                    return false
                }
            }

            return true
        },
    },
    pages: {
        signIn: "/signin",
        error: "/error",
    },
})
