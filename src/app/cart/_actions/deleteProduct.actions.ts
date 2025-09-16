'use server'
import { productsToken } from "@/Utilities/productsToken";

export async function deleteProduct(productId:string){
    const token =await productsToken();
    if(!token){
        throw new Error('Unauthorized!,Login first');
    }else{
        const res=await fetch(`${process.env.API}/cart/${productId}`,{
            cache: 'no-store',
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json',
                token 
            }
        })
        const payload=await res.json();
        return payload;
    }
}