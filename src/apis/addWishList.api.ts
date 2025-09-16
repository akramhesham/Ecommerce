'use server'
import { productsToken } from "@/Utilities/productsToken"

export async function addWishList(productId:string){
    const token=await productsToken();
    if(!token){
        throw new Error('Unauthorized, Login First')
    }else{
    const res=await fetch(`${process.env.API}/wishlist`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            token,
        },
        body:JSON.stringify({productId})
    })
    const payload=await res.json();
    console.log("response",payload)
    return payload;
}}