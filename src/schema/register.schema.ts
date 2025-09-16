import * as z from "zod";

export const registerSchema=z.object({
    name:z.string().nonempty("this Field is required").min(2,'minimum 2 characters').max(10,'maximum 10 characters'),
    email:z.string().nonempty("this Field is required").email('Not valid email'),
    password:z.string().nonempty("this Field is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        'invalid password password must have at least 8 characters and have at least one capital letter and at least one small letter and at least one special character of #?!@$%^&*-'),
    rePassword:z.string().nonempty("this Field is required"),
    phone:z.string().nonempty("this Field is required").regex(/(002)?^(01)([0-25]\d{8})$/)    
}).refine((data)=>data.password===data.rePassword,{
    path:['rePassword'],
    message:'not match'
});

export type registerSchemaForm=z.infer<typeof registerSchema>;