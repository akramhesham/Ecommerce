export async function forgotPassword(email:string){
    const res=await fetch(`${process.env.NEXT_PUBLIC_API}/auth/forgotPasswords`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
         body:JSON.stringify({email})
    });
    const payload=await res.json();
    return payload;
}