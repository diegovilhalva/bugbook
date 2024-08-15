import { validateRequest } from "@/auth"
import prisma from "@/lib/prisma"
import { FollowerInfo } from "@/lib/types"
import { error } from "console"

export async function GET(req: Request, { params: { userId } }: { params: { userId: string } }) {
    try {
        const { user: loggedUser } = await validateRequest()
        if (!loggedUser) {
            return Response.json({ error: 'Não autorizado' }, { status: 401 })
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                followers: {
                    where: {
                        followerId: loggedUser.id
                    },
                    select: {
                        followerId: true
                    }
                },
                _count: {
                    select: {
                        followers: true
                    }
                }
            }
        })
        if (!user) {
            return Response.json({ error: "Usuário não encontrado" }, { status: 404 })
        }
        const data: FollowerInfo = {
            followers: user._count.followers,
            isFollowedByUser: !!user.followers.length
        }

        return Response.json(data)
    } catch (error) {
        console.error(error)
        return Response.json({ error: 'Ocorreu um erro no servidor' }, { status: 500 })

    }
}

export async function POST(req: Request, { params: { userId } }: { params: { userId: string } }) {
    try {
        const { user: loggedUser } = await validateRequest()
        if (!loggedUser) {
            return Response.json({ error: 'Não autorizado' }, { status: 401 })
        }

        await prisma.follow.upsert({
            where: {
                followerId_followingId: {
                    followerId: loggedUser.id,
                    followingId: userId,
                }
            },
            create: {
                followerId: loggedUser.id,
                followingId: userId,
            },
            update: {}
        })
        return new Response()
    } catch (error) {
        console.error(error)
        return Response.json({ error: 'Ocorreu um erro no servidor' }, { status: 500 })
    }
}


export async function DELETE(req: Request, { params: { userId } }: { params: { userId: string } }) {
    try {
        const { user: loggedUser } = await validateRequest()
        if (!loggedUser) {
            return Response.json({ error: 'Não autorizado' }, { status: 401 })
        }

        await  prisma.follow.deleteMany({
            where:{
                followerId: loggedUser.id,
                followingId: userId,
            }
        })
        return new  Response()
    } catch (error) {
        console.error(error)
        return Response.json({ error: 'Ocorreu um erro no servidor' }, { status: 500 })
    }
}