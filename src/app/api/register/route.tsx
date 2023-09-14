import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"
import { userRegisterSchema } from "@/schemas/userSchema"

interface RequestBody {
    name: string
    email: string
    password: string
}

export async function POST(request: Request) {
    try {
        const body: RequestBody = await request.json()
        const { name, email, password } = userRegisterSchema.parse(body)

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

        const { password: _password, ...userWithoutPassword } = user

        return NextResponse.json({ user: userWithoutPassword }, { status: 201 })
    } catch (error) {
        console.log("Register Error: ", error)

        return NextResponse.json(
            { message: "Registration Error" },
            { status: 500 }
        )
    }
}
