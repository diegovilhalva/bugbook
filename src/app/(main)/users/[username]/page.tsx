import { validateRequest } from "@/auth";
import FollowButton from "@/components/FollowButton";
import FollowerCount from "@/components/FollowerCount";
import TrendsSidebar from "@/components/TrendsSidebar";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/UserAvatar";
import prisma from "@/lib/prisma";
import { FollowerInfo, getUserDataSelect, UserData } from "@/lib/types";
import { formaNumber } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import UserPosts from "./UserPosts";

interface PageProps {
    params: { username: string }
}


const getUser = cache(async (username: string, loggedInUserId: string) => {
    const user = await prisma.user.findFirst({
        where: {
            username: {
                equals: username,
                mode: "insensitive",
            },
        },
        select: getUserDataSelect(loggedInUserId),
    });

    if (!user) notFound();

    return user;
});

export async function generateMetadata({ params: { username } }: PageProps): Promise<Metadata> {
    const { user: loggedInUser } = await validateRequest()
    if (!loggedInUser) return {}

    const user = await getUser(username, loggedInUser.id)
    return {
        title: `${user.displayName} @(${user.username})`
    }
}

export default async function Page({ params: { username } }: PageProps) {
    const { user: loggedInUser } = await validateRequest()
    if (!loggedInUser) {
        return <p className="text-destructive">
            Você não está autorizado para acessar esta página
        </p>
    }
    const user = await getUser(username, loggedInUser.id)

    return <main className="flex w-full min-w-0 gap-5">
        <div className="w-full min-w-0 space-y-5">
            <UserProfile user={user} loggedInUserId={loggedInUser.id} />
            <div className="rounded-2xl bg-card p-5 shadow-sm">
                <h2 className="text-center text-2xl font-bold">
                    Postagens de {user.displayName}
                </h2>
            </div>
                <UserPosts userId={user.id}/>
        </div>
        <TrendsSidebar />
    </main>
}

interface UserProfileProps {
    user: UserData;
    loggedInUserId: string;
}

async function UserProfile({ user, loggedInUserId }: UserProfileProps) {
    const followerInfo: FollowerInfo = {
        followers: user._count.followers,
        isFollowedByUser: user.followers.some(
            ({ followerId }) => followerId === loggedInUserId,
        ),
    };

    return <div className="h-fit w-full space-y-5 rounded-2xl bg-card p-5 shadow-sm">
        <UserAvatar avatarUrl={user.avatarUrl} size={250} className="mx-auto size-full max-h-60 max-w-60 rounded-full" />
        <div className="flex flex-wrap gap-3 sm:flex-nowrap">
            <div className="me-auto space-y-3">
                <div>
                    <h1 className="text-3xl font-bold">{user.displayName}</h1>
                    <div className="text-muted-foreground">@{user.username}</div>
                </div>
                <div className="">Membro desde: {format(new Date(user.createdAt), "d MMM yyyy", { locale: ptBR })}</div>
                <div className="flex items-center gap-3">
                    <span>
                        Postagens:{" "}
                        <span className="font-semibold">
                            {formaNumber(user._count.posts)}
                        </span>
                    </span>
                    <FollowerCount userId={user.id} initialState={followerInfo}/>
                </div>
            </div>
            {user.id === loggedInUserId ? (
                <Button>Editar Perfil</Button>

            ): <FollowButton userId={user.id} initialState={followerInfo}/>}
        </div>
        {user.bio && (<>
            <hr />
            <div className="overflow-hidden whitespace-pre-line break-words">
                {user.bio}
            </div>
        </>)}
    </div>
}