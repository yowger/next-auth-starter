import { NextResponse } from "next/server"
import { compare } from "bcrypt"
import prisma from "@/lib/prisma"
import { zodCustomError } from "@/lib/zodCustomError"
import { userFormLoginSchema } from "@/schemas/userSchema"
import type { userFormLogin } from "@/schemas/userSchema"
import { signJwtAccessToken } from "@/lib/jwt"

export async function POST(request: Request) {
    try {
        const body: userFormLogin = await request.json()

        const parsedBody = userFormLoginSchema.parse(body)
        const { email, password } = parsedBody

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
            },
        })

        if (user && (await compare(password, user.password))) {
            const { password, ...userWithoutPassword } = user

            const accessToken = signJwtAccessToken(userWithoutPassword)

            const result = {
                ...userWithoutPassword,
                accessToken,
            }

            return NextResponse.json(result)
        } else {
            return NextResponse.json(null)
        }
    } catch (error) {
        const zodErrorResponse = zodCustomError(
            error,
            "Login failed: invalid data"
        )
        if (zodErrorResponse) {
            return NextResponse.json(zodErrorResponse, { status: 422 })
        }

        console.log("Login error: ", error)

        return NextResponse.json(
            { message: "Registration Error" },
            { status: 500 }
        )
    }
}
