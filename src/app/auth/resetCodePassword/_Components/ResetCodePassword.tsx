'use client'
import { resetCode } from '@/apis/resetCode.api';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { resetCodeSchema, resetCodeSchemaForm } from '@/schema/resetCode.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function ResetCodePassword() {
      const form = useForm<resetCodeSchemaForm>({
        resolver:zodResolver(resetCodeSchema),
        defaultValues: {
          resetCode: '',
        }
      });    
        async function onSubmit(data: resetCodeSchemaForm){
         const res=await resetCode(data.resetCode);
         if(res.status=== 'Success'){
            toast.success(res.message);
            window.location.href='/auth/resetPassword'
         }
        }
  return (
        <>
            <h1 className='w-2/3 mx-auto'>Reset code:</h1>
            <Form {...form}>
                <form className='w-2/3 mx-auto' onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        name='resetCode'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className='my-5'>
                                <FormLabel>Reset Code</FormLabel>
                                <FormControl>
                                    <Input type='resetCode' {...field} />
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
