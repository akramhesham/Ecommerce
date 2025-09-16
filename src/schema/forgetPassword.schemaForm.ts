import * as z from "zod";

export const forgetPasswordSchema=z.object({
    email:z.string()
})


export type forgetPasswordSchemaForm=z.infer<typeof forgetPasswordSchema>;