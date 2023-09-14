"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { userFormRegisterSchema } from "@/schemas/userSchema"
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

export default function RegisterForm() {
    const router = useRouter()

    const form = useForm<z.infer<typeof userFormRegisterSchema>>({
        resolver: zodResolver(userFormRegisterSchema),
    })

    const onSubmit = async ({
        name,
        email,
        password,
    }: z.infer<typeof userFormRegisterSchema>) => {
        const response = await fetch("/api/register", {
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

        if (response.ok) {
            console.log("user successfully sign in")
            router.push("/login")
        } else {
            console.log("Registration error")
        }
    }

    return (
        <Form {...form}>
            <h1 className="mb-5 text-xl">Register</h1>

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
                <Button type="submit">Sign up</Button>
                <p>
                    Already have an account{" "}
                    <Link href="/login" className="text-blue-800">
                        Login
                    </Link>
                </p>
            </form>
        </Form>
    )
}
