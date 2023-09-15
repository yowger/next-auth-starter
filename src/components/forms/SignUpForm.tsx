"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { userFormRegisterSchema } from "@/schemas/userSchema"
import type { userFormRegister } from "@/schemas/userSchema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

export default function SignUpForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const form = useForm<userFormRegister>({
        resolver: zodResolver(userFormRegisterSchema),
    })

    const onSubmit = async (data: userFormRegister) => {
        setLoading(true)
        const { name, email, password } = data

        const response = await fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        })

        setLoading(false)

        if (response.ok) {
            router.push("/login")
        } else {
            console.log("Registration error")
        }
    }

    return (
        <Form {...form}>
            <h1 className="mb-5 text-xl">Sign Up</h1>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={loading} type="submit">
                    {loading ? "Loading..." : "Sign Up"}
                </Button>
                <p>
                    Already have an account{" "}
                    <Link href="/signin" className="text-blue-800">
                        Sign in
                    </Link>
                </p>
            </form>
        </Form>
    )
}
