'use server'
import { productsToken } from "@/Utilities/productsToken"

type shippingAddressType={
    details:string,
    phone:string,
    city:string
}
export async function checkOutOnline(cartId:string,url=process.env.NEXT_URL,shippingAddress:shippingAddressType){
    const token=await productsToken();
    if(!token){
        throw new Error('Unauthorized, Login First')
    }else{
    const res=await fetch(`${process.env.API}/orders/checkout-session/${cartId}?url=${url}`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            token
        },
        body:JSON.stringify(shippingAddress)
    })
    const payload=await res.json();
    return payload;
}}