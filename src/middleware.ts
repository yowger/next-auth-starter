import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    if (pathname.startsWith("/api/user/profile")) {
        const token = await getToken({ req: request })
        console.log("token: ", token)

        
        // return NextResponse.json({ message: "Auth required" }, { status: 401 })
    }
}

// export const config = { matcher: ["/api/user/profile"] }

/*
comment for now

// import { getToken } from "next-auth/jwt"
import { NextRequestWithAuth, withAuth } from "next-auth/middleware"


export default withAuth(
    async function middleware(request: NextRequestWithAuth) {
        // const { pathname } = request.nextUrl
        // const token = await getToken({ req: request })
        // const isAuthenticated = !!token
        // console.log("pathname: ", pathname)
        // if (
        //     (pathname.startsWith("/signup") ||
        //         pathname.startsWith("/signin")) &&
        //     isAuthenticated
        // ) {
        //     return NextResponse.redirect(new URL("/", request.url))
        // }
    },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                const { pathname } = req.nextUrl

                if (pathname.startsWith("/profile") && token === null) {
                    return false
                }

                return true
            },
        },
        pages: {
            signIn: "/signin",
            error: "/error",
        },
    }
)
*/
