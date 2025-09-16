'use client'
import { addProduct } from '@/app/cart/_actions/addProduct.actions'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'react-toastify'

export default function GetProductBtn({id}:{id:string}) {
  const queryClient =useQueryClient();
    const {mutate,isPending}=useMutation({mutationFn:addProduct,
        onSuccess:(data)=>{
            toast.success(data?.message)
            queryClient.invalidateQueries({queryKey:['cart']})
        },
        onError:()=>{
            toast.error('login First')
        }
    })
  return (
    <Button className='cursor-pointer' onClick={()=>mutate(id)}>{isPending?<i className='fa-solid fa-spin fa-spinner'></i>:"Add to cart"}</Button>
  )
}
