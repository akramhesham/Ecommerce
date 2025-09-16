'use client'
import { forgotPassword } from '@/apis/forgotPassword.api';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { forgetPasswordSchema, forgetPasswordSchemaForm } from '@/schema/forgetPassword.schemaForm';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


export default function ForgetPassword() {
    const form = useForm<forgetPasswordSchemaForm>({
        resolver: zodResolver(forgetPasswordSchema),
        defaultValues: {
            email: ''
        }
    });
    async function onSubmit(data: forgetPasswordSchemaForm) {
        const res = await forgotPassword(data.email);
        if (res.statusMsg === 'success') {
            toast.success(res.message);
            window.location.href = '/auth/resetCodePassword'
        }
        }
    return (
        <>
            <h1 className='w-2/3 mx-auto'>Forget Password:</h1>
            <Form {...form}>
                <form className='w-2/3 mx-auto' onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        name='email'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className='my-5'>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type='email' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />                        
                    <Button className='bg-main cursor-pointer hover:bg-green-500 ml-auto block'>Submit</Button>
                </form>
            </Form>
        </>
    )}
