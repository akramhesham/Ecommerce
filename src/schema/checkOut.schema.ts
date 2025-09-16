import * as z from "zod";

export const checkOutSchema=z.object({
    details:z.string(),
    phone:z.string(),
    city:z.string()
})


export type CheckOutSchemaForm=z.infer<typeof checkOutSchema>;