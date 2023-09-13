import { NextResponse } from "next/server"
import prisma from "@/utils/prisma"
import bcrypt from "bcrypt"

interface RequestBody {
    name: string
    email: string
    password: string
}

/*
    TODO: add zod validation
*/

export async function POST(request: Request) {
    const { name, email, password }: RequestBody = await request.json()

    if (!name || !email || !password) {
        return
    }

    const emailExist = await prisma.user.findUnique({
        where: {
            email,
        },
    })

    if (emailExist) {
        throw new Error("Email already exists")
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

    return NextResponse.json(userWithoutPassword)
}
