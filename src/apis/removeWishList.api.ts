'use server'
import { productsToken } from "@/Utilities/productsToken"

export async function removeWishList(productId:string){
    const token=await productsToken();
    if(!token){
        throw new Error('Unauthorized, Login First')
    }else{
    const res=await fetch(`${process.env.API}/wishlist/${productId}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            token,
        }
    })
    const payload=await res.json();
    return payload;
}}