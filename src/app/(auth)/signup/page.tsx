import { Metadata } from "next"
import SignUpForm from "./SignupForm"
import signUpImage from "@/assets/signup-image.jpg"
import Image from "next/image"
import Link from "next/link"
export const metadata: Metadata = {
    title: "Criar conta"
}



export default function Page() {
    return <main className="flex h-screen items-center justify-center p-5">
        <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] rounded-2xl overflow-hidden bg-card shadow-2xl">
            <div className="md:w-1/2 w-full sapce-y-10 overflow-y-auto p-10">
                <div className="space-y-1  text-center">
                    <h1 className="text-3xl font-bold">
                        Crie sua conta
                    </h1>
                    <p className="text-muted-foreground">
                        Preencha as informações abaixo para se juntar à nossa comunidade
                    </p>
                </div>
                <div className="space-y-5">
                    <SignUpForm/>
                    <Link href={'/login'} className="block text-center hover:underline" >
                        Já possui uma conta? 
                    </Link>
                </div>
            </div>
            <Image src={signUpImage} alt="" className="w-1/2 hidden md:block object-cover" />
        </div>
    </main>


}