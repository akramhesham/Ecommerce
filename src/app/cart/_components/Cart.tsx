'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { CartResp } from '../typescript/cart.interface';
import Image from 'next/image';
import Loading from '@/app/Loading';
import cartImage from '../../../assets/images/green-shopping-cart-isolated-white-30493378.webp'
import { toast } from 'react-toastify';
import { clearItems } from '../_actions/clearProduct.actions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ProductDetails } from './ProductDetails';


export default function Cart() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: clearItems,
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: () => {
      toast.error('Login First')
    }
  })
  const { data, isLoading, isError, error } = useQuery<CartResp>({
    queryKey: ['cart'], queryFn: async () => {
      const res = await fetch(`/api/cart`);
      const payload = await res.json();
      return payload;
    }
  })
  if (isLoading) {
    return <Loading></Loading>
  }
  if (isError) {
    return <h2>{error.message}</h2>
  }
  if (data?.numOfCartItems === 0) {
    return <div className='flex justify-center items-center vh-[80%]'>
      <Image src={cartImage} alt='' width={300} height={300} />
    </div>
  }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div>
        <h2>Total price of products: <span className='text-green-500'> {data?.data.totalCartPrice} EGP</span></h2>
        <h2>Total number of items: <span className='text-green-500'> {data?.numOfCartItems}</span></h2>
      </div>
      <div>
        <table className="my-5 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data.products.map(prod => <ProductDetails key={prod._id} prod={prod}></ProductDetails>)}
          </tbody>
        </table>
        <Button onClick={() => mutate()} className='block ml-auto cursor-pointer'>{isPending ? <i className='fa-solid fa-spin fa-spinner'></i> : 'Clear Cart'}</Button>
        <Button asChild className='block ml-auto cursor-pointer my-2'>
          <Link href={`/checkOut/${data?.cartId}`}>Check Out</Link>
        </Button>
      </div>
    </div>
  )
}
