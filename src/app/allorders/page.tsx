'use client'
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import Loading from '../Loading';
import { Daum } from '@/interface/orders.interface';
import Image from 'next/image';

export default function Page() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['allorders'], queryFn: async () => {
            const res = await fetch(`/api/allorder`);
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
    return (
        <div className="flex flex-wrap">
            {data?.data.map((order: Daum) => <OrdersDetails key={order._id} order={order}></OrdersDetails>)}
        </div>
    )
}
function OrdersDetails({ order }: { order: Daum }) {
    return (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <div className="p-2">
            {order.cartItems.map(item=>(
              <div key={item._id}>
                <Image src={item.product.imageCover} alt='' width={150} height={150}/>
                <div>Product Name:{item.product.title}</div>
                <div>Quantity of product:{item.count}</div>
                <div>Product price:{item.price}EGP</div>
                <br/>
              </div>
             ))}                
            <div>User Name: {order.user.name}</div>
            <div>User phone:{order.user.phone}</div>
            <div>Way of pay:{order.paymentMethodType}</div>
            <div>Price of the order:{order.totalOrderPrice}EGP</div>
            </div>
        </div>
    )
}