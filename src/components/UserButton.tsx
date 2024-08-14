"use client"

import { useSession } from "@/app/(main)/SessionProvider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/dropdown-menu"
import UserAvatar from "./UserAvatar"
import Link from "next/link"
import { Check, LogOutIcon, Monitor, Moon, Sun, UserIcon } from "lucide-react"
import { logout } from "@/app/(auth)/actions"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { useQueryClient } from "@tanstack/react-query"

interface UserButtonProps {
    className?: string
}


export default function UserButton({ className }: UserButtonProps) {
    const { user } = useSession()

    const {theme,setTheme} = useTheme()
    const queryClient = useQueryClient()
    return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className={cn("flex-none rounded-full", className)}>
                <UserAvatar avatarUrl={user.avatarUrl} size={40} />
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>
                Logado como @{user.username}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={`/users/${user.username}`}>
                <DropdownMenuItem>
                    <UserIcon className="mr-2 size-4 cursor-pointer" />
                    Perfil
                </DropdownMenuItem>
            </Link>
            <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                    <Monitor className="mr-2 size-4" />
                    Tema
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                        <DropdownMenuItem onClick={() => setTheme('system')}>
                            <Monitor className="mr-2 size-4" />
                            Padrão do sistema 
                            {theme === "system" && <Check className="mr-2 size-4" />}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme('light')}>
                            <Sun className="mr-2 size-4" />
                            Claro
                            {theme === "light" && <Check className="mr-2 size-4" />}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme('dark')}>
                            <Moon className="mr-2 size-4" />
                            Escuro
                            {theme === "dark" && <Check className="mr-2 size-4" />}
                        </DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {
                queryClient.clear()
                logout()
            }}>
                <LogOutIcon className="mr-2 size-4 cursor-pointer" />
                Sair
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>)
}