import * as z from "zod";

export const resetCodeSchema=z.object({
    resetCode:z.string()
})


export type resetCodeSchemaForm=z.infer<typeof resetCodeSchema>;