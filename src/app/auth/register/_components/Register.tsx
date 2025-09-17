'use client'
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { registerSchema, registerSchemaForm } from '@/schema/register.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';

export default function Register() {
  const form = useForm<registerSchemaForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    }
  });

  const firstError = Object.keys(form.formState.errors)[0];

  async function onSubmit(data: registerSchemaForm) {
    console.log('data is', data);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        rePassword: data.rePassword,
        phone: data.phone
      })
    });
    const result = await res.json();
    console.log("Response result", result);
    form.reset();
    toast.success(result.message);
    window.location.href='/auth/login';
  }
  return (
    <>
      <h1 className='w-2/3 mx-auto'>Register Now:</h1>
      <Form {...form}>
        <form className='w-2/3 mx-auto' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name='name'
            control={form.control}
            render={({ field }) => (
              <FormItem className='my-5'>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                {firstError === 'name' && <FormMessage />}
              </FormItem>
            )}
          />
          <FormField
            name='email'
            control={form.control}
            render={({ field }) => (
              <FormItem className='my-5'>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='email' {...field} />
                </FormControl>
                {firstError === 'email' && <FormMessage />}
              </FormItem>
            )}
          />
          <FormField
            name='password'
            control={form.control}
            render={({ field }) => (
              <FormItem className='my-5'>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' autoComplete='off' {...field} />
                </FormControl>
                {firstError === 'password' && <FormMessage />}
              </FormItem>
            )}
          />
          <FormField
            name='rePassword'
            control={form.control}
            render={({ field }) => (
              <FormItem className='my-5'>
                <FormLabel>Repassword</FormLabel>
                <FormControl>
                  <Input type='password' autoComplete='off' {...field} />
                </FormControl>
                {firstError === 'rePassword' && <FormMessage />}
              </FormItem>
            )}
          />
          <FormField
            name='phone'
            control={form.control}
            render={({ field }) => (
              <FormItem className='my-5'>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type='number' {...field} />
                </FormControl>
                {firstError === 'phone' && <FormMessage />}
              </FormItem>
            )}
          />
          <Button className='bg-main cursor-pointer hover:bg-green-500 ml-auto block'>Submit</Button>
        </form>
      </Form>
    </>
  )
}
