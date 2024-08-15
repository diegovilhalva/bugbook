"use server"

import { validateRequest } from "@/auth"
import prisma from "@/lib/prisma"
import { postDataInclude } from "@/lib/types"
import { createPostSchema } from "@/lib/validation"
import { revalidatePath } from "next/cache"

export async function submitPost(input: string) {
    const { user } = await validateRequest()
    if (!user) throw Error('Não autorizado')

    const { content } = createPostSchema.parse({ content: input })

   const newPost = await prisma.post.create({
        data:{
            content,
            userId:user.id
        },
        include:postDataInclude
    })

  return newPost
}