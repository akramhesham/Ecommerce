'use client'
import { resetPassword } from '@/apis/resetPassword.api';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { resetPasswordSchema, resetPasswordSchemaForm } from '@/schema/resetPassword.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function ResetPassword() {
    const form = useForm<resetPasswordSchemaForm>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            email: '',
            newPassword: ''
        }
    });
    async function onSubmit(data: resetPasswordSchemaForm) {
        const res = await resetPassword({ email:data.email, newPassword:data.newPassword });
        if (res.token) {
            toast.success('Password has been successfully reset');
            window.location.href = '/auth/login'
        }
    }
    return (
        <>
            <h1 className='w-2/3 mx-auto'>Reset Password:</h1>
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
                    <FormField
                        name='newPassword'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className='my-5'>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input type='password' autoComplete='off' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button className='bg-main cursor-pointer hover:bg-green-500 ml-auto block'>Submit</Button>
                </form>
            </Form>
        </>
    )
}
