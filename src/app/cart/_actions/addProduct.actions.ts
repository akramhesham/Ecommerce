'use server'
import { productsToken } from "@/Utilities/productsToken";

export async function addProduct(productId: string) {
    const token = await productsToken();
    if(!token){
       throw new Error('Unauthorized!,Login first');
    }else{
    const res = await fetch(`${process.env.API}/cart`, {
        cache: 'no-store',
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            token
        },
        body: JSON.stringify({ productId })
    })
    const data = await res.json();
    return data;
    }}