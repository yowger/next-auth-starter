import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { userWithIdSchema } from "@/schemas/userSchema"
import { zodCustomError } from "@/lib/zodCustomError"

type Props = {
    params: {
        id: number
    }
}

export async function GET(request: Request, { params: { id } }: Props) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: +id,
            },
            select: {
                id: true,
                email: true,
                name: true,
            },
        })

        if (!user) {
            return NextResponse.json({ user: null }, { status: 404 })
        }

        const parsedUser = userWithIdSchema.parse(user)

        return NextResponse.json({ user: parsedUser })
    } catch (error) {
        const zodErrorResponse = zodCustomError(error, "Registration failed")
        if (zodErrorResponse) {
            return NextResponse.json(zodErrorResponse, { status: 422 })
        }

        console.log("Failed to fetch user: ", error)

        return NextResponse.json(
            { message: "Failed to fetch user:" },
            { status: 500 }
        )
    }
}
