"use client"

import { useState } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { userFormLoginSchema } from "@/schemas/userSchema"
import type { userFormLogin } from "@/schemas/userSchema"

const callbackUrl = "/"

export default function SignInForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const form = useForm<userFormLogin>({
        resolver: zodResolver(userFormLoginSchema),
    })

    const onSubmit = async (data: userFormLogin) => {
        setLoading(true)
        const { email, password } = data

        const signInResult = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        setLoading(false)

        if (!signInResult?.error) {
            router.push(callbackUrl)
        } else {
            form.setError("password", {
                type: "manual",
                message: "Invalid email or password",
            })
        }
    }

    return (
        <Form {...form}>
            <h1 className="mb-5 text-xl">Sign in</h1>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                <Button disabled={loading} type="submit">
                    {loading ? "Loading..." : "Sign in"}
                </Button>
                <p>
                    Already have an account{" "}
                    <Link href="/signin" className="text-blue-800">
                        Sign Up
                    </Link>
                </p>
            </form>
        </Form>
    )
}
