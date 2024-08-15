import { PostData } from "@/lib/types";
import { useDeletePostMutation } from "./mutations";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import LoadingButton from "../LoadingButton";
import { Button } from "../ui/button";

interface DeletePostDialogProps {
    post: PostData
    open: boolean
    onClose: () => void
}

export default function DeletePostDialog({ post, open, onClose }: DeletePostDialogProps) {
    const mutation = useDeletePostMutation()
    function handleOpenChange(open: boolean) {
        if (!open || !mutation.isPending) {
            onClose()
        }
    }
    return <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Deletar Post?
                </DialogTitle>
                <DialogDescription>
                    Tem certeza quer deletar este post?
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <LoadingButton variant={"destructive"} onClick={() => mutation.mutate(post.id,{onSuccess:onClose})}
                   loading={mutation.isPending} >
                    Deletar
                </LoadingButton>
                <Button variant={'outline'} onClick={onClose} disabled={mutation.isPending}>
                    Cancelar
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>


}