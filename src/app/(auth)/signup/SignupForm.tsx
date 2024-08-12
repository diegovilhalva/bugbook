"use client";

import { signUpSchema, SignUpValues } from "@/lib/validation";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { signUp } from "./actions";
import { PasswordInput } from "@/components/PasswordInput";

export default function SignUpForm() {
    const [error,setError] = useState<string>()
    const [isPending,startTransition] = useTransition()


    const form = useForm<SignUpValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues:{
            email:"",
            username:"",
            password:""
        }
    })

    async function onSubmit(values: SignUpValues) {
        setError(undefined)
        startTransition(async () => {
           const {error} = await signUp(values)
           if (error) setError(error)
        })
    }
    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                {error && <p className="text-center text-destructive">{error}</p>}
                <FormField control={form.control} name="username" render={({field}) => (
                    <FormItem>
                        <FormLabel>Usuário</FormLabel>
                        <FormControl>
                            <Input placeholder="Usuário" {...field} /> 
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )} />
                   <FormField control={form.control} name="email" render={({field}) => (
                    <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                            <Input placeholder="E-mail" {...field} type="email" /> 
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )} />
                 <FormField control={form.control} name="password" render={({field}) => (
                    <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                            <PasswordInput placeholder="Senha" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )} />
                <Button type="submit" className="w-full">
                    Criar conta
                </Button>
        </form>
    </Form>
}