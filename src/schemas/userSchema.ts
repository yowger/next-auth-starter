import { z } from "zod"

const nameSchema = z
    .string()
    .min(1, "Name is required")
    .max(100, "Name cannot exceed 100 characters")
const emailSchema = z
    .string()
    .min(1, "Email is required")
    .email("Invalid email")
const passwordRequiredSchema = z.string().min(1, "Password is required")
const strongPasswordSchema = z
    .string()
    .min(5, "Password must be at least 5 characters long")
    .max(50, "Password cannot exceed 50 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
const confirmPasswordSchema = z.string()

const hasUserIdSchema = z.object({
    id: z.number().int().positive(),
})

const userSchema = z.object({
    name: nameSchema,
    email: emailSchema,
})

export const userFormLoginSchema = z.object({
    email: emailSchema,
    password: passwordRequiredSchema,
})

export const userRegisterSchema = userSchema.extend({
    password: strongPasswordSchema,
})

export const userFormRegisterSchema = userSchema
    .extend({
        password: strongPasswordSchema,
        confirmPassword: confirmPasswordSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    })

export const userWithIdSchema = userSchema.merge(hasUserIdSchema)

export type userFormLogin = z.infer<typeof userFormLoginSchema>
export type userFormRegister = z.infer<typeof userFormRegisterSchema>
export type userWithId = z.infer<typeof userWithIdSchema>
export type UserRegister = z.infer<typeof userRegisterSchema>
