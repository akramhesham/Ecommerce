'use server'
import { productsToken } from "@/Utilities/productsToken";

export async function updateCount({productId,count}:{productId:string,count:number}){
    const token=await productsToken();
    if(!token){
        return new Error('Unauthorized,Login First')
    }else{
        const res=await fetch(`${process.env.API}/cart/${productId}`,{
            cache: 'no-store',
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                token
            },
            body: JSON.stringify({count})
        }
        )
        const payload=await res.json();
        return payload;
    }
}