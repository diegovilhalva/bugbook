import { Metadata } from "next";
import Chat from "./Chat";

export const metadata: Metadata = {
    title: "Mensagens"
}

export default function Page() {
    return <Chat/>
}