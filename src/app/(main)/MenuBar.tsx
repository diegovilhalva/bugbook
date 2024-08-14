import { Button } from "@/components/ui/button"
import { Bell, Bookmark, Home, Mail } from "lucide-react"
import Link from "next/link"

interface MenuBarProps {
    className?: string

}


export default function MenuBar({ className }: MenuBarProps) {
    return <div className={className}>
        <Button variant="ghost" className="flex items-center justify-start gap-3"
            title="Home"
            asChild>
            <Link href="/">
                <Home />
                <span className="hidden lg:inline">Home</span>
            </Link>
        </Button>
        <Button variant="ghost" className="flex items-center justify-start gap-3"
            title="Notificações"
            asChild>
            <Link href="/notifications">
                <Bell />
                <span className="hidden lg:inline">Notificações</span>
            </Link>
        </Button>
        <Button variant="ghost" className="flex items-center justify-start gap-3"
            title="Mensagens"
            asChild>
            <Link href="/messages">
                <Mail />
                <span className="hidden lg:inline">Mensagens</span>
            </Link>
        </Button>
        <Button variant="ghost" className="flex items-center justify-start gap-3"
            title="Favoritos"
            asChild>
            <Link href="/bookmarks">
                <Bookmark />
                <span className="hidden lg:inline">Favoritos</span>
            </Link>
        </Button>
    </div>
}