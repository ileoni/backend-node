import { Request, Response, NextFunction } from "express";
import * as z from "zod";

const schema = z.object({
    name: z.string().min(3, "Campo nome é obrigatório"),
    lastname: z.string().optional()
})

export const update = (request: Request, response: Response, next: NextFunction) => {
    const validated = schema.safeParse(request.body);
    if(!validated.success) {
        return response.status(400).json(validated.error);
    }

    return next();
}