import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { userWithIdSchema } from "@/schemas/userSchema"
import { decodeJwt, verifyJwt } from "@/lib/jwt"

export async function GET(request: Request) {
    try {
        const userAccessToken = request.headers.get("authorization")

        if (!userAccessToken || !verifyJwt(userAccessToken)) {
            return new Response(
                JSON.stringify({
                    error: "unauthorized",
                }),
                {
                    status: 401,
                }
            )
        }

        const decodedUser = decodeJwt(userAccessToken)

        const userId = decodedUser?.id

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                email: true,
                name: true,
            },
        })

        if (!user) {
            return NextResponse.json(
                { error: "User not Found" },
                { status: 404 }
            )
        }

        const parsedUser = userWithIdSchema.parse(user)

        return NextResponse.json({ user: parsedUser })
    } catch (error) {
        console.log("Failed to get user profile: ", error)

        return NextResponse.json(
            { message: "Failed to get user profile:" },
            { status: 500 }
        )
    }
}
