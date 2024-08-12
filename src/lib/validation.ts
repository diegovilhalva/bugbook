import { z } from "zod"

const requiredString = z.string().trim().min(1, "Campo obrigatório")
export const signUpSchema = z.object({
    email: requiredString.email("E-mail inválido"),
    username: requiredString.regex(
        /^[a-zA-Z0-9_-]+$/,
        "Por favor, insira apenas letras, números, hífen (-) e sublinhado (_)"
    ),
    password:requiredString.min(8,"Senha deve possuir no mínino 8 caracteres")


})

export type SignUpValues = z.infer<typeof signUpSchema>

export const loginSchema = z.object({
    username:requiredString,
    password:requiredString,
})

export type LoginValues = z.infer<typeof loginSchema>