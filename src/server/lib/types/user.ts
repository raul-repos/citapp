import {z} from "zod"

export const User = z.object({
    id: z.string(),
    username: z.string(),
    name: z.string().optional(),
    email: z.string().optional(),
    emailVerified: z.string().optional(),
    image: z.string().optional(),
    password: z.string()
})

export type User = z.infer<typeof User>