import * as z from "zod";

export const loginSchema=z.object({
    email:z.string().nonempty('this field is required').email('not valid email'),
    password:z.string().nonempty("this Field is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        'invalid password password must have at least 8 characters and have at least one capital letter and at least one small letter and at least one special character of #?!@$%^&*-')
})


export type loginSchemaForm=z.infer<typeof loginSchema>;