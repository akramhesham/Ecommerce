import * as z from "zod";

export const resetPasswordSchema=z.object({
    email:z.string(),
    newPassword:z.string()
})


export type resetPasswordSchemaForm=z.infer<typeof resetPasswordSchema>;