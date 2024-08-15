import {  PostsPage } from "@/lib/types";
import { useToast } from "../ui/use-toast";
import { InfiniteData,  QueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { deletePost } from "./actions";

export function useDeletePostMutation() {
    const { toast } = useToast()

    const queryClient = useQueryClient()
    const router = useRouter()
    const pathName = usePathname()
    const mutation = useMutation({
        mutationFn: deletePost,
        onSuccess: async (deletedPost) => {
            const queryFilter: QueryFilters = { queryKey: ["post-feed"] }
            await queryClient.cancelQueries(queryFilter)

            queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
                queryFilter,
                (oldData) => {
                    if (!oldData) return;
                    return {
                        pageParams: oldData.pageParams,
                        pages: oldData.pages.map(page => ({
                            nextCursor: page.nextCursor,
                            posts: page.posts.filter(p => p.id !== deletedPost.id)
                        }))
                    }
                }
            )
            toast({
                description: "Post deletado com sucesso!"
            })
            if (pathName === `/posts/${deletedPost.id}`) {
                router.push(`/users/${deletedPost.user?.username}`)
            }
        },
        onError(error) {
            console.log(error)
            toast({
                variant: "destructive",
                description: "Erro ao deletar post"
            })
        }

    })
    return mutation
}