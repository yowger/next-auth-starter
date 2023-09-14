import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"
import { z } from "zod"
import { UserRegister, userRegisterSchema } from "@/schemas/userSchema"

export async function POST(request: Request) {
    try {
        const body: UserRegister = await request.json()

        const result = userRegisterSchema.parse(body)
        const { name, email, password } = result

        const emailExist = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        if (emailExist) {
            return NextResponse.json(
                { user: null, message: "This email is already taken" },
                { status: 409 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        })

        const { password: createdPassword, ...userWithoutPassword } = user

        return NextResponse.json({ user: userWithoutPassword }, { status: 201 })
    } catch (error) {
        let errorInstance = error

        if (errorInstance instanceof z.ZodError) {
            errorInstance = errorInstance.issues.map((error) => ({
                path: error.path[0],
                message: error.message,
            }))

            return NextResponse.json(
                { message: "Failed to register", error: errorInstance },
                { status: 422 }
            )
        }

        console.log("Registration error: ", errorInstance)

        return NextResponse.json(
            { message: "Registration Error" },
            { status: 500 }
        )
    }
}
