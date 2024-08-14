"use server"

import { validateRequest } from "@/auth"
import prisma from "@/lib/prisma"
import { createPostSchema } from "@/lib/validation"
import { revalidatePath } from "next/cache"

export async function submitPost(input: string) {
    const { user } = await validateRequest()
    if (!user) throw Error('Não autorizado')

    const { content } = createPostSchema.parse({ content: input })

    await prisma.post.create({
        data:{
            content,
            userId:user.id
        }
    })

    revalidatePath("")
}