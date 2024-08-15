"use server"
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getPostDataInclude } from "@/lib/types";

export async function deletePost(id: string) {
    const { user } = await validateRequest()

    if(!user) throw new Error("Não autorizado")
    
    const post = await  prisma.post.findUnique({
        where:{id}
    })

    if(!post) throw new Error("Post não encontrado")
    
    if(post.userId !== user.id) throw new Error("Não autorizado")
    
   const deletedPost = await  prisma.post.delete({
        where:{id},
        include:getPostDataInclude(user.id)
    })
    return deletedPost
}