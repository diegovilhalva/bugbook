import { validateRequest } from "@/auth"
import prisma from "@/lib/prisma"
import { postDataInclude } from "@/lib/types"

export async  function GET(){
    try {
        const {user} = await validateRequest()
        if(!user){
            return Response.json({error:"Não autorizado"},{status:401})
        }

        const posts = await prisma.post.findMany({
            include:postDataInclude,
            orderBy:{createdAt:"desc"}
        })
        return Response.json(posts)
    } catch (error) {
        console.log(error)
        return Response.json({error:"Falha no servidor"},{status:500})
    }
}