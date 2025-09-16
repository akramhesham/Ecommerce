'use client'
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { loginSchema, loginSchemaForm } from '@/schema/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';

export default function Login() {
  const form = useForm<loginSchemaForm>({
    resolver:zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
 
  const firstError=Object.keys(form.formState.errors)[0]; 

  async function onSubmit(data: loginSchemaForm) {
    const res =await signIn('credentials',{
      email:data.email,
      password:data.password,
      redirect:false,
      callbackUrl:'/'
    })

    if(res?.ok){
      window.location.href=res?.url||''
    }else{
      toast.error(res?.error);
    }
  }
  function handleGitHubLogin(){
    signIn('github',{
      callbackUrl:'/'
    })
  }
  return (
    <>
      <h1 className='w-2/3 mx-auto'>Register Now:</h1>
      <Form {...form}>
        <form className='w-2/3 mx-auto' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name='email'
            control={form.control}
            render={({field}) => (
              <FormItem className='my-5'>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='email' {...field} />
                </FormControl>
                {firstError==='email' && <FormMessage />}
              </FormItem>
            )}
          />
          <FormField
            name='password'
            control={form.control}
            render={({field}) => (
              <FormItem className='my-5'>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' autoComplete='off' {...field} />
                </FormControl>
                {firstError==='password' && <FormMessage />}
              </FormItem>
            )}
          />
          <Button className='bg-main cursor-pointer hover:bg-green-500 ml-auto block'>Login</Button>
        </form>
      </Form>
      <div className='w-2/3 mx-auto my-5'>
        <Button onClick={handleGitHubLogin}  className='block ms-auto bg-main cursor-pointer hover:bg-green-500'>Login using github<i className='fa-brands fa-github'></i></Button>
      </div>
      <div className='w-2/3 mx-auto my-5'>
        <Button><Link href={'/auth/forgetPassword'}>Forget password</Link></Button> 
      </div>
    </>
  )
}
