'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { checkOutSchema, CheckOutSchemaForm } from '@/schema/checkOut.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkOutOnline } from '../_actions/checkOut.actions'
import { useForm } from 'react-hook-form'

export default function CheckOut({ cartId }: { cartId: string }) {
    const form = useForm<CheckOutSchemaForm>({
        resolver: zodResolver(checkOutSchema),
        defaultValues: {
            details: '',
            phone: '',
            city: ''
        },
    })
    async function onSubmit(data: CheckOutSchemaForm) {
         const shippingAddress=data;
         const res=await checkOutOnline(cartId,'',shippingAddress);
         if(res?.status==='success'){
            window.location.href=res?.session?.url;
         }
    }
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 mx-auto">
                    <FormField
                        control={form.control}
                        name="details"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>details</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='mt-5'>phone</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='mt-5'>city</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />                                        
                    <Button className='mt-5 cursor-pointer' type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}
