import { Request, Response, NextFunction } from "express";
import * as z from "zod";
import User from "../../models/User";

const schema = z.object({
    name: z.string().min(1, "Campo nome é obrigatório"),
    lastname: z.string(),
    date: z.string().optional(),
    email: z.string().min(1, "Campo email é obrigatório"),
    password: z.string().min(8, "Desculpe a senha deve ter no mínimo 8 caracteres."),
    confirmPassword: z.string(),
})
.refine(
    ({ password, confirmPassword }) => password === confirmPassword,
    {
        message: "Desculpe. As senhas não coincidem.",
        path: ["confirmPassword"] 
    }
)
.refine(
    async ({email}) => {
        const { count } = await User.findAndCountAll({ where: { email: email } })
        return !count;
    },
    {
        message: "Desculpe. Email já está em uso.",
        path: ["email"]
    }
);

export const store = async (request: Request, response: Response, next: NextFunction) => {
    const validated = await schema.safeParseAsync(request.body);
    if(!validated.success) {
        return response.status(400).json(validated.error);
    }

    return next();
}